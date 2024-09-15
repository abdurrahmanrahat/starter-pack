"use client";

import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Navbar,
  NavbarBrand,
  NavbarContent,
} from "@nextui-org/react";
import { Menu, SearchIcon, X } from "lucide-react";
import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";
import { adminSidebarItems, userSidebarItems } from "../Sidebar/item-lists";
import SidebarItem from "../Sidebar/SidebarItem";

export default function DashboardNavbar({
  role,
  children,
}: {
  role: string;
  children: ReactNode;
}) {
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  // Toggle function to handle the navbar's display
  const handleNavToggle = () => {
    setIsOpenMenu(!isOpenMenu);
  };

  // Function to handle clicks outside of the navbar
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const navbar = document.getElementById("navbar");
      if (isOpenMenu && navbar && !navbar.contains(event.target as Node)) {
        setIsOpenMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpenMenu]);

  return (
    <div>
      <Navbar
        isBordered
        className="w-full"
        classNames={{ wrapper: "w-full max-w-full" }}
      >
        <NavbarContent className="md:hidden">
          <NavbarBrand className="mr-4">
            <div onClick={handleNavToggle} className="block md:hidden ">
              {isOpenMenu ? <X /> : <Menu />}
            </div>
          </NavbarBrand>
        </NavbarContent>

        {/* Mobile menu */}
        <div
          id="navbar"
          className={`fixed md:hidden top-0 left-0 w-[70%] h-screen bg-primary text-white ease-in-out duration-700 z-[999] p-[20px] ${
            isOpenMenu ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* logo */}
          <div className="my-[12px] flex justify-center items-center">
            <Link href="/">
              {/* <Image src={IMAGES.shared.Logo} alt="Logo" /> */}
              <h2>LOGO</h2>
            </Link>
          </div>

          {/* mobile nav items */}
          <nav className="mt-8">
            <div className="space-y-[6px]">
              {role === "user" &&
                userSidebarItems.map((item, index) => (
                  <SidebarItem key={index} item={item} />
                ))}

              {role === "admin" &&
                adminSidebarItems.map((item, index) => (
                  <SidebarItem key={index} item={item} />
                ))}
            </div>
          </nav>
        </div>

        <NavbarContent as="div" className="w-full">
          <Input
            className="w-full"
            classNames={{
              mainWrapper: "h-full",
              input: "w-full",
            }}
            placeholder="Type to search..."
            startContent={<SearchIcon size={18} />}
            type="search"
          />
        </NavbarContent>
        <NavbarContent
          justify="end"
          className="w-fit data-[justify=end]:flex-grow-0"
        >
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                name="Jason Hughes"
                size="sm"
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">zoey@example.com</p>
              </DropdownItem>
              <DropdownItem key="settings">My Settings</DropdownItem>
              <DropdownItem key="team_settings">Team Settings</DropdownItem>
              <DropdownItem key="analytics">Analytics</DropdownItem>
              <DropdownItem key="system">System</DropdownItem>
              <DropdownItem key="configurations">Configurations</DropdownItem>
              <DropdownItem key="help_and_feedback">
                Help & Feedback
              </DropdownItem>
              <DropdownItem key="logout" color="danger">
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      </Navbar>
      <div>{children}</div>
    </div>
  );
}
