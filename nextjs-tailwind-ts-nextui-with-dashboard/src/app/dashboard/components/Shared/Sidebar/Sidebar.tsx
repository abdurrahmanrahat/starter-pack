"use client";

import Container from "@/components/Ui/Container";
import Link from "next/link";
import { adminSidebarItems, userSidebarItems } from "./item-lists";
import SidebarItem from "./SidebarItem";

const Sidebar = ({ role }: { role: string }) => {
  return (
    <div className="bg-primary text-white h-screen px-4 md:px-0 py-4 md:py-0">
      <Container>
        <div className="p-10">
          {/* logo section */}
          <div className="flex justify-start items-center">
            <Link href="/">
              {/* <Image src={IMAGES.shared.Logo} alt="Logo" /> */}
              <h2>LOGO</h2>
            </Link>
          </div>

          {/* Nav items section */}
          <div className="hidden md:flex flex-col mt-8">
            {role === "user" &&
              userSidebarItems.map((item, index) => (
                <SidebarItem key={index} item={item} />
              ))}

            {role === "admin" &&
              adminSidebarItems.map((item, index) => (
                <SidebarItem key={index} item={item} />
              ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Sidebar;
