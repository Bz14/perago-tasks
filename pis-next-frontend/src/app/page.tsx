import Link from "next/link";
import { Button } from "@mantine/core";

export default function Home() {
  return (
    <div className="bg-gradient-to-r from-customBlue via-blue-950 to-customBlue  text-white min-h-screen">
      <main className="flex flex-col items-center justify-center min-h-screen text-center px-4">
        <h1 className="text-4xl font-bold">Welcome to PIS</h1>
        <p className="text-gray-100 mt-4 max-w-lg">
          Easily manage your organization&apos;s hierarchy and employee
          positions with our simple interface.
        </p>

        <div className="mt-6 space-x-4">
          <Link href="/positions" passHref>
            <Button className="bg-gray-400 text-customBlue hover:bg-gray-500 p-2 rounded-lg">
              View Positions
            </Button>
          </Link>
          <Link href="/create" passHref>
            <Button className="bg-white text-blue-600 border p-2 rounded-lg hover:bg-gray-200">
              Create Position
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
