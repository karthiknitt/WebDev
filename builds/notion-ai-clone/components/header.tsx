"use client";

import {
  SignedOut,
  SignInButton,
  SignedIn,
  UserButton,
} from "@clerk/clerk-react";
import { useUser } from "@clerk/nextjs";

function Header() {
  const { user } = useUser();
  return (
    <div className="flex items-center justify-between p-5">
      {user && (
        <h1 className="text-2xl">
          {user?.firstName}
          {`'s`} Space
        </h1>
      )}
      {/*Breadcrumbs here*/}
      <SignedOut>
        <SignInButton></SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton></UserButton>
      </SignedIn>
    </div>
  );
}

export default Header;
