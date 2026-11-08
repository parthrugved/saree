
import mongoose, { Types } from "mongoose";
import connectToDatabase from "@/lib/db";
import Product from "@/models/Product";
import Order, {
    IOrderItem,
    IShippingDetails,
    ReservationStatus,
} from "@/models/Order";

const RESERVATION_DURATION_MS = 15 * 60 * 1000;
const GST_RATE = 0.05;

type RequestedItem = {
    id: string;
    quantity: number;
};

type ReserveInventoryInput = {
    items: RequestedItem[];
    shippingDetails: IShippingDetails;
};

type ReservationResult = {
    orderId: string;
    amountPaise: number;
    expiresAt: Date;
    items: IOrderItem[];
};

export async function reserveInventory(
    input: ReserveInventoryInput
): Promise<ReservationResult> {
    if (!Array.isArray(input.items) || input.items.length === 0) {
        throw new Error("Your cart is empty.");
    }

    if (input.items.length > 20) {
        throw new Error("Too many different products in your cart.");
    }

    // Combine duplicate product IDs.
    const quantities = new Map<string, number>();

    for (const item of input.items) {
        if (
            !item ||
            typeof item.id !== "string" ||
            !/^[a-f\d]{24}$/i.test(item.id) ||
            !Number.isInteger(item.quantity) ||
            item.quantity < 1 ||
            item.quantity > 99
        ) {
            throw new Error("Invalid cart item.");
        }

        const id = item.id.toLowerCase();
        const total = (quantities.get(id) ?? 0) + item.quantity;

        if (total > 99) {
            throw new Error("Maximum quantity per product is 99.");
        }

        quantities.set(id, total);
    }

    await connectToDatabase();

    const session = await mongoose.startSession();

    try {
        let result: ReservationResult | null = null;

        await session.withTransaction(async () => {
            const productIds = [...quantities.keys()].map(
                (id) => new Types.ObjectId(id)
            );

            const products = await Product.find({
                _id: { $in: productIds },
            }).session(session);

            if (products.length !== quantities.size) {
                throw new Error("One or more products are no longer available.");
            }

            const orderItems: IOrderItem[] = [];
            let subtotalPaise = 0;

            for (const product of products) {
                const id = product._id.toString();
                const quantity = quantities.get(id);

                if (!quantity) {
                    throw new Error("Invalid product quantity.");
                }

                if (
                    !Number.isFinite(product.price) ||
                    product.price <= 0 ||
                    !Number.isInteger(product.price * 100)
                ) {
                    throw new Error(`Invalid price for ${product.title}.`);
                }

                if (
                    !Number.isInteger(product.stock) ||
                    product.stock < quantity
                ) {
                    throw new Error(
                        `Insufficient stock for ${product.title}.`
                    );
                }

                const pricePaise = Math.round(product.price * 100);
                subtotalPaise += pricePaise * quantity;

                // Conditional update prevents stock from becoming negative.
                const stockUpdate = await Product.updateOne(
                    {
                        _id: product._id,
                        stock: { $gte: quantity },
                    },
                    {
                        $inc: { stock: -quantity },
                    },
                    { session }
                );

                if (stockUpdate.modifiedCount !== 1) {
                    throw new Error(
                        `Insufficient stock for ${product.title}.`
                    );
                }

                orderItems.push({
                    id,
                    title: product.title,
                    price: product.price,
                    image: product.images[0] ?? "",
                    quantity,
                });
            }

            const gstPaise = Math.round(subtotalPaise * GST_RATE);
            const totalPaise = subtotalPaise + gstPaise;

            if (!Number.isSafeInteger(totalPaise) || totalPaise <= 0) {
                throw new Error("Invalid order total.");
            }

            const reservedAt = new Date();
            const expiresAt = new Date(
                reservedAt.getTime() + RESERVATION_DURATION_MS
            );

            const order = new Order({
                amount: totalPaise / 100,
                amountPaise: totalPaise,
                items: orderItems,
                shippingDetails: input.shippingDetails,
                status: "created",
                reservationStatus: "reserved" satisfies ReservationStatus,
                reservedAt,
                expiresAt,
            });

            await order.save({ session });

            result = {
                orderId: order._id.toString(),
                amountPaise: totalPaise,
                expiresAt,
                items: orderItems,
            };
        });

        if (!result) {
            throw new Error("Could not create inventory reservation.");
        }

        return result;
    } finally {
        await session.endSession();
    }
}

export async function releaseInventory(
    orderId: string,
    reason: "expired" | "released" = "expired"
): Promise<boolean> {
    if (!/^[a-f\d]{24}$/i.test(orderId)) {
        throw new Error("Invalid order ID.");
    }

    await connectToDatabase();

    const session = await mongoose.startSession();

    try {
        let released = false;

        await session.withTransaction(async () => {
            const now = new Date();

            const filter: Record<string, unknown> = {
                _id: new Types.ObjectId(orderId),
                reservationStatus: "reserved",
                stockReleasedAt: { $exists: false },
            };

            if (reason === "expired") {
                filter.expiresAt = { $lte: now };
            }

            // Claim the reservation before restoring stock.
            // The transaction rolls back if any stock update fails.
            const order = await Order.findOneAndUpdate(
                filter,
                {
                    $set: {
                        reservationStatus: reason,
                        stockReleasedAt: now,
                        status: "failed",
                    },
                },
                {
                    new: true,
                    session,
                }
            );

            if (!order) {
                released = false;
                return;
            }

            for (const item of order.items) {
                if (
                    !item.id ||
                    !/^[a-f\d]{24}$/i.test(item.id) ||
                    !Number.isInteger(item.quantity) ||
                    item.quantity < 1
                ) {
                    throw new Error("Invalid product data in reserved order.");
                }

                const stockUpdate = await Product.updateOne(
                    { _id: new Types.ObjectId(item.id) },
                    { $inc: { stock: item.quantity } },
                    { session }
                );

                if (stockUpdate.modifiedCount !== 1) {
                    throw new Error(
                        `Could not restore stock for product ${item.id}.`
                    );
                }
            }

            released = true;
        });

        return released;
    } finally {
        await session.endSession();
    }
}
