"use client";
import { Burger, Drawer, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";

const Navbar = () => {
  const [opened, { toggle, close }] = useDisclosure(false);

  return (
    <header className="bg-white text-customBlue px-6 py-4 shadow-md fixed w-full top-0 z-50 ">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold cursor-pointer">
          <Link href="/">PIS</Link>
        </h1>

        <nav className="hidden md:flex space-x-6 md:items-center">
          <Link href="/" className="hover:text-gray-400">
            Home
          </Link>
          <Link href="/positions" className="hover:text-gray-400">
            Positions
          </Link>
          <Link href="/about" className="hover:text-gray-400">
            About
          </Link>
          <Button
            component={Link}
            href="/create"
            className="bg-customBlue text-white hover:bg-gray-400 hover:text-customBlue p-2 rounded-lg"
          >
            Create Position
          </Button>
        </nav>

        <Burger opened={opened} onClick={toggle} className="md:hidden" />

        <Drawer
          opened={opened}
          onClose={close}
          title="Menu"
          padding="md"
          className="md:hidden bg-customBlue"
        >
          <nav className="flex flex-col space-y-4">
            <Link href="/" onClick={close} className="hover:text-blue-600">
              Home
            </Link>
            <Link
              href="/positions"
              onClick={close}
              className="hover:text-blue-600"
            >
              Positions
            </Link>
            <Link href="/about" onClick={close} className="hover:text-blue-600">
              About
            </Link>
            <Button
              component={Link}
              href="/create"
              onClick={close}
              className="bg-blue-600 text-white hover:bg-blue-500"
            >
              Create Position
            </Button>
          </nav>
        </Drawer>
      </div>
    </header>
  );
};

export default Navbar;
