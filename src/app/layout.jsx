import { Poppins } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata = {
  title: "Naruto Characters | Explore the Hidden Leaf Village",
  description:
    "Discover detailed information about your favorite Naruto characters from the legendary anime and manga series.",
  keywords: "Naruto, characters, anime, manga, hidden leaf village, ninja",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} font-sans antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
