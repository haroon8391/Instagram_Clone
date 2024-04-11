import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <div>
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
          className="bg-gray-50 border border-gray-200 rounded text-sm w-full py-2 px-1 max-w-[210px]"
        />

        <button className="text-blue-500 font-semibold text-sm">Login</button>
      </div>
    </div>
  );
}
