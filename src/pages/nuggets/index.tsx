import { Inter } from "@next/font/google";
import NuggetsLanding from "@/components/NuggetsLanding/NuggetsLanding";
import NuggetProvider from "../../context/NuggetsContext";

const inter = Inter({ subsets: ["latin"] });

export default function NuggetHome({ nuggetId }: any) {
  return (
    <>
      <NuggetProvider>
        <NuggetsLanding nuggetId={nuggetId} />
      </NuggetProvider>
    </>
  );
}
