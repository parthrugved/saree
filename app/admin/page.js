import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import AdminClient from "./AdminClient";

export default async function AdminPage() {
  const user = await currentUser();
  const adminEmail = "ketkipankajshastri@gmail.com"; // your mom’s email

  if (
    !user ||
    user.emailAddresses[0].emailAddress !== adminEmail
  ) {
    redirect("/");
  }

  return <AdminClient />;
}
