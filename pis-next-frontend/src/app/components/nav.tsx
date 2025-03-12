"use client";
import { Burger, Drawer, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";
import checkAdmin from "../utils/checkAdmin";

const Navbar = () => {
  const [opened, { toggle, close }] = useDisclosure(false);
  const admin = checkAdmin();

  const handleLogOut = () => {
    localStorage.removeItem("accessToken");
    window.location.reload();
  };

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
          {admin && (
            <Link href="/positions/view" className="hover:text-gray-400">
              View
            </Link>
          )}
          {admin && (
            <Link href="/positions/list" className="hover:text-gray-400">
              List
            </Link>
          )}

          <Link href="/about" className="hover:text-gray-400">
            About
          </Link>
          {admin ? (
            <Button
              component={Link}
              href="/positions/create"
              className="bg-customBlue text-white hover:bg-gray-400 p-2 rounded-lg"
            >
              Create Position
            </Button>
          ) : (
            <Button
              component={Link}
              href="/admin/signup"
              className="bg-customBlue text-white hover:bg-gray-400 px-4 rounded-lg"
            >
              Get started
            </Button>
          )}
          {admin && (
            <Button
              component={Link}
              onClick={handleLogOut}
              href="/"
              className="bg-customBlue text-white hover:bg-gray-400 px-4 rounded-lg"
            >
              Logout
            </Button>
          )}
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

            {admin && (
              <Link
                href="/positions/view"
                className="hover:text-gray-400"
                onClick={close}
              >
                View
              </Link>
            )}

            <Link href="/about" onClick={close} className="hover:text-blue-600">
              About
            </Link>

            {admin ? (
              <Button
                component={Link}
                onClick={close}
                href="/positions/create"
                className="bg-customBlue text-white hover:bg-gray-400 hover:text-customBlue p-2 rounded-lg"
              >
                Create Position
              </Button>
            ) : (
              <Button
                component={Link}
                onClick={close}
                href="/admin/login"
                className="bg-customBlue text-white hover:bg-gray-400 px-4 rounded-lg"
              >
                Get started
              </Button>
            )}
          </nav>
        </Drawer>
      </div>
    </header>
  );
};

export default Navbar;
