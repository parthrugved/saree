
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectToDatabase from "@/lib/db";
import Order from "@/models/Order";
import mongoose from "mongoose";

export async function POST(req: Request) {
  try {
    // Verify the user's session
    const session = await getServerSession(authOptions);

    // Only administrators can mark orders as delivered
    if (!session?.user || session.user.role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 403 }
      );
    }

    const { orderId } = await req.json();

    if (
      typeof orderId !== "string" ||
      !mongoose.Types.ObjectId.isValid(orderId)
    ) {
      return NextResponse.json(
        { error: "Invalid order ID" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const order = await Order.findByIdAndUpdate(
      orderId,
      { status: "delivered" },
      { new: true }
    );

    if (!order) {
      return NextResponse.json(
        { error: "Order not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Order marked as delivered" },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Error marking order as delivered:", error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
