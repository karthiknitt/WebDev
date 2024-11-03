"use client";
import React from "react";
import NewDocumentButton from "./NewDocumentButton";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { collectionGroup, query, where } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";

import { db } from "@/firebase";

function Sidebar() {
  const User = useUser();
  const [data, loading, error] = useCollection(
    User &&
      query(
        collectionGroup(db, "rooms"),
        where("userId", "==", User.emailAddresses[0].toString())
      )
  );

  const menuOptions = (
    <>
      <NewDocumentButton />
      {/* My Documents */}
      {/* List... */}

      {/* Shared with Me */}
      {/* List... */}
    </>
  );
  return (
    <div className="p-2 md:p-5 bg-gray-200 relative">
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger>
            <MenuIcon className="p-2 hover:opacity-30 rounded-lg" size={40} />
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
              <div>{menuOptions}</div>
              {/* <SheetDescription>This</SheetDescription> */}
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
      <div className="hidden md:inline">{menuOptions}</div>
    </div>
  );
}

export default Sidebar;
