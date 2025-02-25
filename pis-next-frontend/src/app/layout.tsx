import "@mantine/core/styles.css";
import type { Metadata } from "next";
import "./globals.css";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import Navbar from "./components/nav";
import Footer from "./components/footer";
import Providers from "./redux/provider";

export const metadata: Metadata = {
  title: "Organizational hierarchy.",
  description: "This is a simple organizational hierarchy webapp.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <Providers>
          <MantineProvider>
            <Navbar />
            {children}
            <Footer />
          </MantineProvider>
        </Providers>
      </body>
    </html>
  );
}
