"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import Loader from "../components/loader";
import Image from "next/image";

const PasteContentArea = ({
  paste,
  error
}: {
  paste: PasteType | undefined;
  error: any
}) => {
  if (paste && paste.pasteContent) {
    return (
      <>
        <div className="mt-2 p-5 border rounded-sm bg-neutral-100 text-neutral-700">
          <p>{paste.pasteContent}</p>
        </div>
        <p className="text-sm text-dark mt-2">Created {new Date(paste.createdAt).getDate() + "-" + (new Date(paste.createdAt).getMonth() + 1) + "-" + new Date(paste.createdAt).getFullYear()}</p>
      </>
    )
  }

  if (error && error.message === "Paste does not exist") {
    return (
      <div className="w-full mt-2 py-5 rounded-sm">
        <Image className="mx-auto" src={"/images/icons/close.svg"} height={50} width={50} alt="Paste does not exist" />
        <h3 className="mt-2 text-center">That paste does not exist</h3>
      </div>
    )
  } else {
    return (
      <div>Error :{"("}</div>
    )
  }
}

interface PasteType {
  pasteContent: string;
  createdAt: number;
  deletedAt: number;
  sourceIpP: string;
  id: string;
}

export default function Page() {
  const params = useSearchParams();
  const router = useRouter();

  const [paste, setPaste] = useState<PasteType>();
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const getPaste = async (id: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_API_GATEWAY_STAGE + "/" + id, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const res = await response.text();
      const jsonRes = JSON.parse(res);
      if (response.status === 200 && jsonRes.data) {
        setPaste(jsonRes.data);
      } else if (response.status === 200 && !jsonRes.data) {
        console.log(jsonRes)
        setError({ type: "apicall", message: jsonRes.message });
      }
    } catch (error) {
      setError({ type: "apicall", message: "Unexpected error occurred" });
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const pasteId = params.get("id");
    if (!pasteId) {
      router.replace("/");
      return;
    }
    getPaste(pasteId);
  }, []);

  return (
    <div className="min-h-screen w-3/4 mx-auto my-8">
      <Navbar />
      {
        isLoading ? <Loader isFull /> : <PasteContentArea paste={paste} error={error} />
      }
    </div>
  )
}