"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Container from "../Container";
import {
  MobileNavItem,
  MobileSubMenuItem,
  NavItem,
  SubMenuItem,
} from "./Navbar.helper";
import { dropdownNavItems, navItems } from "./navbar.utils";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

  // Toggle submenu on mobile
  const toggleSubmenu = (menuId: string) => {
    setActiveSubmenu(activeSubmenu === menuId ? null : menuId);
  };

  return (
    <Container className="w-[100%]">
      <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
        <div className="px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex gap-1 justify-center">
              {/* Mobile menu button */}
              <button
                className="lg:hidden rounded-md p-2 text-gray-700 hover:bg-gray-100 focus:outline-none"
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
                aria-label="Toggle navigation"
              >
                {isOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
              {/* Logo */}
              <Link href="/" className="flex items-center">
                <span className="text-xl font-bold text-primary">
                  YourBrand
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex lg:items-center lg:space-x-4">
              {navItems.map((item, index) => (
                <NavItem key={index} href={item.href} label={item.label} />
              ))}

              {/* submenu */}
              {dropdownNavItems.map((dropdownSingleItem, index) => (
                <div className="relative group" key={index}>
                  <button
                    className="inline-flex items-center rounded-md px-3 py-2 text-base font-medium text-gray-800 hover:text-[#3a0579] hover:cursor-pointer transition-colors duration-300"
                    onClick={() => toggleSubmenu(dropdownSingleItem.id)}
                    aria-expanded={activeSubmenu === dropdownSingleItem.id}
                  >
                    {dropdownSingleItem.label}
                    <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:text-[#3a0579] " />
                  </button>

                  {/* Desktop submenu (hover) */}
                  <div className="absolute left-0 mt-1 w-48 origin-top-left rounded-md bg-white shadow-lg focus:outline-none transition-all duration-200 ease-in-out opacity-0 scale-95 invisible group-hover:opacity-100 group-hover:scale-100 group-hover:visible">
                    <div className="py-2 pl-2">
                      {dropdownSingleItem.submenu.map((subMenuItem, index) => (
                        <SubMenuItem
                          key={index}
                          href={subMenuItem.href}
                          label={subMenuItem.label}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </nav>

            {/* actions */}
            <div>
              <Button>Login</Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation - Overlay */}
        <div
          className={cn(
            "fixed inset-0 z-40 lg:hidden bg-black bg-opacity-50 transition-opacity duration-300",
            isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          )}
          onClick={() => setIsOpen(false)}
        >
          <div
            className={cn(
              "absolute top-0 left-0 right-0 bg-white transition-transform duration-300 ease-in-out transform shadow-lg",
              isOpen ? "translate-y-0" : "-translate-y-full"
            )}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mobile header - Logo and close button */}
            <div className="flex items-center justify-between h-16 px-4 border-b">
              <Link
                href="/"
                className="flex items-center"
                onClick={() => setIsOpen(false)}
              >
                <span className="text-xl font-bold text-primary">
                  YourBrand
                </span>
              </Link>
              <button
                className="rounded-md p-2 text-gray-700 hover:bg-gray-100 focus:outline-none"
                onClick={() => setIsOpen(false)}
                aria-label="Close navigation"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Mobile menu items */}
            <div className="space-y-1 px-4 py-3">
              {navItems.map((item, index) => (
                <MobileNavItem
                  key={index}
                  href={item.href}
                  label={item.label}
                  onClick={() => setIsOpen(false)}
                />
              ))}

              {/* Mobile Demo with dropdown */}
              {dropdownNavItems.map((dropdownSingleItem, index) => (
                <div className="py-0" key={index}>
                  <button
                    className="flex w-full items-center justify-between rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:text-[#3a0579]"
                    onClick={() => toggleSubmenu(dropdownSingleItem.id)}
                    aria-expanded={activeSubmenu === dropdownSingleItem.id}
                  >
                    {dropdownSingleItem.label}
                    <ChevronDown
                      className={cn(
                        "h-5 w-5 transition-transform duration-300",
                        activeSubmenu === dropdownSingleItem.id
                          ? "rotate-180"
                          : ""
                      )}
                    />
                  </button>

                  {/* submenu */}
                  <div
                    className={cn(
                      "transition-all duration-300 ease-in-out overflow-hidden pl-4",
                      activeSubmenu === dropdownSingleItem.id
                        ? "max-h-screen opacity-100"
                        : "max-h-0 opacity-0"
                    )}
                  >
                    {dropdownSingleItem.submenu.map((subMenuItem, index) => (
                      <MobileSubMenuItem
                        href={subMenuItem.href}
                        label={subMenuItem.label}
                        onClick={() => setIsOpen(false)}
                        key={index}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>
    </Container>
  );
}
