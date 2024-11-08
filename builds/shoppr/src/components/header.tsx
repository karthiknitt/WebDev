"use client";
import ModeToggle from "./ui/ModeToggle";
import {
  ClerkLoaded,
  SignedIn,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import Link from "next/link";
import Form from "next/form";
import { TrolleyIcon } from "@sanity/icons";
import { PackageIcon } from "lucide-react";

function Header() {
  const { user } = useUser();
  const createClerkPasskey = async () => {
    try {
      const response = await user?.createPasskey();
      console.log(response);
    } catch (err) {
      console.log("Error:", JSON.stringify(err, null, 2));
    }
  };

  return (
    <header className="flex flex-wrap justify-between items-center px-4 py-2">
      <div className="flex flex-wrap  w-full justify-between items-center">
        <Link
          href="/"
          className="
          text-4xl
          font-bold
          text-blue-500
          hover:opacity-50
          mx-auto sm:mx-0
          cursor-pointer
          "
        >
          Shoppr
        </Link>
        <Form action="/search">
          <input
            type="text"
            name="query"
            placeholder="Search for Products"
            className="w-full sm:mx-4 sm:mt-0 sm:w-auto sm:flex-1 mt-2 bg-gray-100 text-gray-100 rounded focus:ring-2 focus:outline-none focus:ring-blue-500 focus:ring-opacity-50 h-10"
          />
        </Form>
        <div className="flex space-x-4 items-center mt-4 flex-1 sm:mt-0 sm:flex-none">
          <Link
            href="/basket"
            className=" flex-1 relative flex sm:justify-start justify-center sm:flex-none items-center space-x-2 bg-blue-500 hover:bg-blue:700 text-white font-bold py-2 px-4 rounded"
          >
            <TrolleyIcon className="w-6 h-6"></TrolleyIcon>
            <span> My Basket</span>
          </Link>
          {/* User Area */}
          {/* <SignedIn> */}
          <ClerkLoaded>
            <SignedIn>
              <Link
                href="/orders"
                className=" flex-1 relative flex sm:justify-start justify-center sm:flex-none items-center space-x-2 bg-blue-500 hover:bg-blue:700 text-white font-bold py-2 px-4 rounded"
              >
                <PackageIcon className="w-6 h-6"></PackageIcon>
                <span> My Orders</span>
              </Link>
            </SignedIn>
            {user ? (
              <div className="flex items-center space-x-2">
                <UserButton />
                <div className="hidden sm:block text-xs ">
                  <p className="text-gray-400">Welcome Back</p>
                  <p className="font-bold">{user.fullName}!</p>
                </div>
              </div>
            ) : (
              <SignInButton mode="modal" />
            )}

            {user?.passkeys.length === 0 && (
              <button
                onClick={createClerkPasskey}
                className="
                bg-white hover:bg-blue-700 hover:text-white animate-pulse text-blue-500 font-bold py-2 px-4 rounded
                border-blue-300 border
                "
              >
                Create a Passkey Now
              </button>
            )}
          </ClerkLoaded>
        </div>
        <ModeToggle />
      </div>
    </header>
  );
}
export default Header;
