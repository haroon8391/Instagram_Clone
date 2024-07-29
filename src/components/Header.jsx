"use client";

import Link from "next/link";
import Image from "next/image";
import app from "../firebase";
import { signIn, signOut, useSession } from "next-auth/react";
import Modal from "react-modal";
import { useEffect, useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FaCamera } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { useRef } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import {
  addDoc,
  collection,
  getFirestore,
  serverTimestamp,
} from "firebase/firestore";

export default function Header() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [postUploading, setPostUploading] = useState(false);
  const [caption, setCaption] = useState("");
  const filePickerRef = useRef(null);
  const db = getFirestore(app);

  const addImageToPost = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  const uploadImagetoStorage = async () => {
    setImageFileUploading(true);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + "-" + selectedFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, selectedFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        console.log(error);
        setImageFileUploading(false);
        setSelectedFile(null);
        setImageFileUrl(null);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setImageFileUploading(false);
        });
      }
    );
  };
  useEffect(() => {
    if (selectedFile) {
      uploadImagetoStorage();
    }
  }, [selectedFile]);

  const handleSubmit = async () => {
    setPostUploading(true);
    const docRef = await addDoc(collection(db, "posts"), {
      username: session.user.username,
      caption: caption,
      profileImg: session.user.image,
      image: imageFileUrl,
      timestamp: serverTimestamp(),
    });

    setPostUploading(false);
    setIsOpen(false);
  };

  return (
    <div className="shadow-sm border-b sticky top-0 z-10 p-2 bg-white">
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
          <div className="flex flex-col justify-center items-center">
            {selectedFile ? (
              <img
                onClick={() => setSelectedFile(null)}
                src={imageFileUrl}
                alt="Selected Image"
                className={`w-full max-h-[250px] object-cover cursor-pointer ${
                  imageFileUploading ? "animate-pulse" : ""
                }`}
              />
            ) : (
              <FaCamera
                onClick={() => filePickerRef.current.click()}
                className="h-8 w-8 text-gray-400 cursor-pointer"
              />
            )}
            <input
              type="file"
              hidden
              accept="image/*"
              ref={filePickerRef}
              onChange={addImageToPost}
            />
            <input
              type="text"
              maxLength={150}
              placeholder="Please Enter Your Caption..."
              className="p-2 rounded-md w-full border-none outline-none text-center mt-2 mb-2"
              onChange={(e) => {
                e.target.value.length <= 150 && setCaption(e.target.value);
              }}
            />
            <button
              disabled={
                !selectedFile ||
                caption.trim() === "" ||
                postUploading ||
                imageFileUploading
              }
              className="bg-red-600 w-full p-2 rounded-lg text-white shadow-md hover:brightness-125 disabled:brightness-100 disabled:cursor-not-allowed disabled:bg-gray-200"
              onClick={() => {
                handleSubmit();
              }}
            >
              Upload Post
            </button>
            <AiOutlineClose
              className="cursor-pointer absolute top-0 right-0 m-2 hover:h-5 hover:w-5 hover:text-red-800 transition duration-300"
              onClick={() => {
                setIsOpen(false);
              }}
            />
          </div>
        </Modal>
      )}
    </div>
  );
}
