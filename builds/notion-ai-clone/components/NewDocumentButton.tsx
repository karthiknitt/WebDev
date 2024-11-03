"use client";
import { CreateNewDocument } from "@/app/actions/actions";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

function NewDocumentButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleCreateNewDocument = () => {
    startTransition(async () => {
      const { docId } = await CreateNewDocument();
      router.push(`/doc/${docId}`);
    });
  };
  return (
    <div>
      <Button onClick={handleCreateNewDocument} disabled={isPending}>
        {isPending ? "Creating..." : "New Document"}
      </Button>
    </div>
  );
}

export default NewDocumentButton;
