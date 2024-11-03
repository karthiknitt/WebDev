"use server";

import { adminDb } from "@/firebase-admin";
import { auth } from "@clerk/nextjs/server";

export async function CreateNewDocument() {
  const session = await auth();
  if (!session) {
    throw new Error("Unauthorized");
  }
  const { sessionClaims } = session;

  const email = sessionClaims?.email;
  if (!email) {
    throw new Error("Email is undefined");
  }

  const docCollectionRef = adminDb.collection("documents");

  const docRef = await docCollectionRef.add({
    title: "New Doc",
  });

  await adminDb
    .collection("users")
    .doc(email)
    .collection("rooms")
    .doc(docRef.id)
    .set({
      userid: email,
      role: "owner",
      createdAt: new Date(),
      roomId: docRef.id,
    });

  return { docId: docRef.id };
}
