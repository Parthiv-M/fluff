'use client';

import { useState } from "react";
import Navbar from "./components/navbar";
import Alert from "./components/alert";
import Loader from "./components/loader";

export default function Home() {
  const [pasteContent, setPasteContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [pasteId, setPasteId] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [error, setError] = useState({
    type: "",
    message: ""
  });

  const isValidPasteText = () => {
    if (pasteContent && pasteContent !== "") {
      return true;
    }
    return false;
  }

  const createPaste = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    if (!isValidPasteText()) {
      setError({ type: "validation", message: "Paste content cannot be empty" });
      setIsLoading(false);
      return;
    }
    try {
      if (!process.env.NEXT_PUBLIC_API_GATEWAY_STAGE) { return; };
      const response = await fetch(process.env.NEXT_PUBLIC_API_GATEWAY_STAGE + "/create", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          pasteContent: pasteContent
        })
      });
      if (response.status === 200) {
        setShowAlert(true);
        const resText = await response.text();
        setPasteId(resText);
      } else {
        setError({ type: "apicall", message: "Could not create paste. Please try again later" });
      }
    } catch (error) {
      setError({ type: "apicall", message: "Unexpected error ocurred" });
    } finally {
      setIsLoading(false);
    }
  }

  const handleTextChange = (e: any) => {
    setPasteContent(e.target.value)
    if (error && error.type === "validation") {
      setTimeout(() => {
        setError({
          type: "",
          message: ""
        })
      }, 3000);
    }
  }

  const copyLink = async () => {
    await navigator.clipboard.writeText("https://fluff.paste/paste?id=" + pasteId);
  }

  return (
    <div className="min-h-screen w-3/4 mx-auto my-8">
      <Navbar />
      <div className="relative overflow-none">
        <textarea
          className="bg-transparent mt-1 border border-neutral-300 rounded w-full outline-none p-3 text-sm min-h-96 max-h-[70vh]"
          placeholder="Start typing..."
          onChange={handleTextChange}
          readOnly={isLoading}
        ></textarea>
        {
          error
          && error.type === "validation"
          &&
          <p className="text-sm absolute bottom-4 left-3 bg-light px-2 py-1 rounded-sm slide-up-absolute">
            {error.message}
          </p>
        }
        {
          isLoading && <div className="absolute top-0 pt-12 mt-1 rounded h-full w-full"><Loader isFull /></div>
        }
      </div>
      <button className="ml-auto block bg-dark text-light text-sm mt-2 px-4 py-2 rounded-sm" onClick={createPaste}>Create paste</button>
      <Alert
        width="3/4"
        backgroundColor="light"
        message="Your paste was created successfully"
        trailingChildren={
          <>
            <a href={"/paste?id=" + pasteId}>View</a>
            <p className="inline ml-3 border border-b-black border-t-0 border-l-0 border-r-0 cursor-pointer" onClick={copyLink}>Copy link</p>
          </>
        }
        trailingIconAltText="Close icon"
        trailingIconPath="/images/icons/close.svg"
        show={showAlert}
        setParentShowAlert={setShowAlert}
        trailingAction="dismiss"
      />
    </div>
  );
}
