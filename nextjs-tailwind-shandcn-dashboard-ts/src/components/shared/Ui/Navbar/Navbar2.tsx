"use client";

import { Button } from "@/components/ui/button";
import { IMAGES } from "@/image-data";
import { Menu, Sun, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import ActiveLink from "../ActiveLink";
import Container from "../Container";
import { navItems } from "./navbar.utils";
// import { useAppSelector } from "@/redux/hooks";
// import { useCurrentUser } from "@/redux/reducers/authSlice";

const Navbar2 = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // const user = useAppSelector(useCurrentUser);

  // const isAdmin = user?.role === "admin";
  // const isInstructor = user?.role === "instructor";
  // const isStudent = user?.role === "user";

  // close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.addEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <nav className="relative w-full border-b border-gray-200" ref={navRef}>
      <Container>
        <div className="flex h-16 items-center justify-between">
          <div className="flex gap-2">
            {/* mobile menu toggle */}
            <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? (
                <X className="w-6 h-6 transition-all duration-300" />
              ) : (
                <Menu className="w-6 h-6 transition-all duration-300" />
              )}
            </button>

            {/* logo */}
            <Link href={`/`}>
              <Image
                src={IMAGES.shared.Logo}
                alt="kaamil_academy"
                width={180}
                height={80}
              />
            </Link>
          </div>

          {/* desktop navigation */}
          <div className="hidden md:flex md:items-center md:gap-6">
            <>
              {navItems.map((item, index) => (
                <ActiveLink
                  href={item.href}
                  key={index}
                  exact={item.href === "/"}
                >
                  <span className="font-medium transition-colors duration-300 hover:text-primary">
                    {item.label}
                  </span>
                </ActiveLink>
              ))}
            </>

            {/* <>
                  {user && (
                    <>
                      {isAdmin && (
                        <NavItem
                          exact={false}
                          href={"/dashboard/admin"}
                          label={"Dashboard"}
                        />
                      )}
                      {isInstructor && (
                        <NavItem
                          exact={false}
                          href={"/dashboard/instructor"}
                          label={"Dashboard"}
                        />
                      )}
                      {isStudent && (
                        <NavItem
                          exact={false}
                          href={"/dashboard/user"}
                          label={"Dashboard"}
                        />
                      )}
                    </>
                  )}
                </> */}
          </div>

          {/* login/logout button */}
          <div className="flex items-center gap-4">
            <Sun />
            <Button>Login</Button>
          </div>
        </div>

        {/* mobile menu dropdown */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out md:hidden absolute left-0 bg-white w-full ${
            isOpen ? "opacity-100" : "opacity-0"
          } border-b border-gray-200`}
        >
          <div className="w-[90%] mx-auto py-4">
            <div className="flex flex-col space-y-4">
              <>
                {navItems.map((item, index) => (
                  <ActiveLink
                    href={item.href}
                    key={index}
                    exact={item.href === "/"}
                  >
                    <span
                      className="font-medium transition-colors duration-300 hover:text-primary"
                      // onClick={() => setIsOpen(!isOpen)}
                    >
                      {item.label}
                    </span>
                  </ActiveLink>
                ))}
              </>

              {/* <>
                  {user && (
                    <>
                      {isAdmin && (
                        <NavItem
                          exact={false}
                          href={"/dashboard/admin"}
                          label={"Dashboard"}
                        />
                      )}
                      {isInstructor && (
                        <NavItem
                          exact={false}
                          href={"/dashboard/instructor"}
                          label={"Dashboard"}
                        />
                      )}
                      {isStudent && (
                        <NavItem
                          exact={false}
                          href={"/dashboard/user"}
                          label={"Dashboard"}
                        />
                      )}
                    </>
                  )}
                </> */}
            </div>
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default Navbar2;
