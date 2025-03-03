import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import type { Metadata } from "next";
import "./globals.css";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
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
      <body className="flex flex-col min-h-screen">
        <Providers>
          <MantineProvider>
            <Notifications />
            <Navbar />
            <div className="flex-grow">
              <Notifications limit={1} />
              {children}
            </div>
            <Footer />
          </MantineProvider>
        </Providers>
      </body>
    </html>
  );
}
