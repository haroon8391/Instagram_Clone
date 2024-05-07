"use client";

import Link from "next/link";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();

  return (
    <div className="shadow-sm border-b sticky top-0 z-0 p-2">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <Link href="/" className="hidden lg:inline-flex">
          <Image
            src="/Instagram_logo_black.webp"
            width={96}
            height={96}
            alt="Instagram logo"
          ></Image>
        </Link>

        <Link href="/" className="lg:hidden">
          <Image
            src="/Instagram_logo.webp"
            width={40}
            height={40}
            alt="Instagram logo"
          ></Image>
        </Link>

        <input
          type="text"
          placeholder="Search"
          className="bg-gray-50 border border-gray-200 rounded-md text-sm w-full py-2 px-1 max-w-[210px] border-"
        />

        {session ? (
          <img
            src={session.user.image}
            alt={session.user.name}
            className="h-10 w-10 rounded-full cursor-pointer"
            onClick={signOut}
          />
        ) : (
          <button
            onClick={signIn}
            className="text-blue-500 font-semibold text-sm"
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
}
