"use client";

import Link from "next/link";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";
import Modal from "react-modal";
import { useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";

export default function Header() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

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
          <div className="flex items-center gap-5">
            <IoMdAddCircleOutline
              className="text-2xl cursor-pointer transform hover:scale-125 transition duration-300 hover:text-red-500"
              onClick={() => setIsOpen(true)}
            />
            <img
              src={session.user.image}
              alt={session.user.name}
              className="h-10 w-10 rounded-full cursor-pointer"
              onClick={signOut}
            />
          </div>
        ) : (
          <button
            onClick={signIn}
            className="text-blue-500 font-semibold text-sm"
          >
            Login
          </button>
        )}
      </div>
      {isOpen && (
        <Modal
          isOpen={isOpen}
          onRequestClose={() => setIsOpen(false)}
          className="max-w-lg w-[90%] absolute top-56 left-[50%] translate-x-[-50%] border-2 rounded-md shadow-md p-6"
          ariaHideApp={false}
        >
          <div>
            <h1>Modal</h1>
            <button onClick={() => setIsOpen(false)}>Close</button>
          </div>
        </Modal>
      )}
    </div>
  );
}
