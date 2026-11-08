
"use server";

import connectToDatabase from "@/lib/db";
import Feedback from "@/models/Feedback";
import { revalidatePath } from "next/cache";

export async function submitFeedback(formData: FormData) {
  try {
    const nameValue = formData.get("name");
    const emailValue = formData.get("email");
    const messageValue = formData.get("message");
    const ratingValue = formData.get("rating");

    if (
      typeof nameValue !== "string" ||
      typeof emailValue !== "string" ||
      typeof messageValue !== "string" ||
      typeof ratingValue !== "string"
    ) {
      return { error: "Invalid feedback submission" };
    }

    const name = nameValue.trim();
    const email = emailValue.trim().toLowerCase();
    const message = messageValue.trim();
    const rating = Number(ratingValue);

    if (!name || !email || !message || !ratingValue.trim()) {
      return { error: "All fields are required" };
    }

    if (name.length > 100) {
      return { error: "Name must be 100 characters or fewer" };
    }

    if (
      email.length > 254 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      return { error: "Please enter a valid email address" };
    }

    if (message.length > 2000) {
      return { error: "Feedback must be 2000 characters or fewer" };
    }

    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      return { error: "Rating must be between 1 and 5" };
    }

    await connectToDatabase();

    const newFeedback = new Feedback({
      name,
      email,
      message,
      rating,
    });

    await newFeedback.save();

    revalidatePath("/admin/feedback");

    return { success: true };
  } catch (error: unknown) {
    console.error("Feedback submission error:", error);

    return { error: "Unable to submit feedback. Please try again." };
  }
}
