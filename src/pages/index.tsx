import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import NuggetsLanding from "@/components/NuggetsLanding/NuggetsLanding";
import NuggetProvider from "../context/NuggetsContext";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <NuggetProvider>
        <NuggetsLanding />
      </NuggetProvider>
    </>
  );
}
