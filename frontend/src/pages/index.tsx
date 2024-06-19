import Image from "next/image";
import { Inter } from "next/font/google";
import { LoginOptions } from "@/components/LoginOptions";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return <>
    <LoginOptions />
  </>
}
