"use client";
import Link from "next/link";
import { Button } from "@mantine/core";
import { IconArrowRight } from "@tabler/icons-react";
import checkAdmin from "./utils/checkAdmin";

export default function Home() {
  const admin = checkAdmin();
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-customBlue text-white mb-10">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30 z-0"
        style={{
          backgroundImage: "url('/images/hierarchy.png')",
        }}
      ></div>

      <main className="text-center px-6 md:px-12 py-12 space-y-8 max-w-3xl mx-auto relative z-10">
        <h1 className="text-5xl font-extrabold leading-tight">
          Welcome to <span className="text-customAccent">PIS</span>
        </h1>
        <p className="text-lg text-gray-200 mt-4">
          Manage your organization’s hierarchy effortlessly, streamline employee
          positions, and create a seamless workflow for your team.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-6">
          {admin ? (
            <Link href="/positions/view" passHref>
              <Button
                rightSection={<IconArrowRight size={18} />}
                className="bg-white text-customBlue hover:bg-gray-400
                 text-lg px-6 py-1 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
              >
                Get Started
              </Button>
            </Link>
          ) : (
            <Link href="/admin/signup" passHref>
              <Button
                rightSection={<IconArrowRight size={18} />}
                className="bg-white text-customBlue hover:bg-gray-400
                 text-lg px-6 py-1 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
              >
                Get Started
              </Button>
            </Link>
          )}
        </div>
      </main>
    </div>
  );
}
