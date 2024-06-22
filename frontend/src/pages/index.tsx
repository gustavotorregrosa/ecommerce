import Image from "next/image";
import { Inter } from "next/font/google";
import { LoginOptions } from "@/components/LoginOptions";
import { useSelector } from "react-redux";
import { IState } from "@/store";
import { IUser } from "@/store/user/user.interface";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {

  const user = useSelector<IState, IUser>(state => state.user)
  
  return <>
    {!user.name && <LoginOptions />}
  </>
}
