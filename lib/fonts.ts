import { Poppins, Lora } from "next/font/google";

export const poppins = Poppins({
  variable: "--font-poppins",
  display: "swap",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const lora = Lora({
  variable: "--font-lora",
  display: "swap",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
