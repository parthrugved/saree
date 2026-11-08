
import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Order from "@/models/Order";
import { releaseInventory } from "@/lib/inventory";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

const BATCH_SIZE = 25;

export async function GET(req: Request) {
  try {
    const cronSecret = process.env.CRON_SECRET;

    if (!cronSecret) {
      console.error("CRON_SECRET is not configured.");

      return NextResponse.json(
        { error: "Cron service is not configured" },
        { status: 503 }
      );
    }

    const authorization = req.headers.get("authorization");

    if (authorization !== `Bearer ${cronSecret}`) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectToDatabase();

    const now = new Date();

    // Find a limited batch of reservations whose deadlines passed.
    const expiredOrders = await Order.find({
      reservationStatus: "reserved",
      expiresAt: { $lte: now },
      stockReleasedAt: { $exists: false },
    })
      .select("_id")
      .sort({ expiresAt: 1 })
      .limit(BATCH_SIZE)
      .lean();

    let released = 0;
    let skipped = 0;
    let failed = 0;

    for (const order of expiredOrders) {
      try {
        const wasReleased = await releaseInventory(
          order._id.toString(),
          "expired"
        );

        if (wasReleased) {
          released++;
        } else {
          skipped++;
        }
      } catch (error) {
        failed++;

        console.error(
          `Failed to release reservation ${order._id}:`,
          error
        );
      }
    }

    return NextResponse.json({
      success: failed === 0,
      checked: expiredOrders.length,
      released,
      skipped,
      failed,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Reservation expiry cron error:", error);

    return NextResponse.json(
      { error: "Unable to process expired reservations" },
      { status: 500 }
    );
  }
}
