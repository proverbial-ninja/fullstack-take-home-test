import { Mulish } from "next/font/google";
import "./globals.css";
import { Container } from "@mui/material";

const inter = Mulish({ subsets: ["latin"] });

export const metadata = {
  title: "Books List",
  description: "Recommended books.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={inter.className}>
        {" "}
        <Container maxWidth="fluid">{children}</Container>
      </body>
    </html>
  );
}
