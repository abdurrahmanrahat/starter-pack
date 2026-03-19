import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Container from "../Layout/Container";
import ActiveLink from "./ActiveLink";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  {
    name: "Services",
    href: "/services",
    children: [
      { name: "Web Design", href: "/services/web-design" },
      { name: "Development", href: "/services/development" },
      { name: "Branding", href: "/services/branding" },
      { name: "SEO", href: "/services/seo" },
    ],
  },
  { name: "Projects", href: "/projects" },
  { name: "Contact", href: "/contact" },
];

const mobileMenuVariants = {
  closed: {
    height: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    },
  },
  open: {
    height: "auto" as const,
    transition: {
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

const subMenuVariants = {
  closed: {
    height: 0,
    transition: {
      duration: 0.25,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    },
  },
  open: {
    height: "auto" as const,
    transition: {
      duration: 0.3,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

export default function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [desktopDropdown, setDesktopDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // dropdown handler
  const handleDropdownEnter = (name: string) => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setDesktopDropdown(name);
  };

  const handleDropdownLeave = () => {
    dropdownTimeout.current = setTimeout(() => {
      setDesktopDropdown(null);
    }, 120);
  };

  const toggleMobileExpanded = (name: string) => {
    setMobileExpanded((prev) => (prev === name ? null : name));
  };

  const closeMobileMenu = () => {
    setIsMobileOpen(false);
    setMobileExpanded(null);
  };

  // close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsMobileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.addEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80 transition-all duration-300 ${
        scrolled ? "shadow-xs" : ""
      }`}
      ref={navRef}
    >
      <Container>
        <div className="flex h-16 xl:h-18 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="shrink-0" onClick={closeMobileMenu}>
            <h2 className="text-xl xl:text-2xl font-semibold tracking-tight text-foreground">
              Logo
            </h2>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-2 2xl:gap-3">
            {navLinks.map((item, index) => {
              if (!item.children) {
                return (
                  <ActiveLink
                    key={index}
                    to={item.href}
                    exact={item.href === "/"}
                    className="px-3 py-3"
                  >
                    {item.name}
                  </ActiveLink>
                );
              }

              return (
                <div
                  key={index}
                  className="relative"
                  onMouseEnter={() => handleDropdownEnter(item.name)}
                  onMouseLeave={handleDropdownLeave}
                >
                  <Link to={item.href}>
                    <button className="inline-flex items-center gap-1 text-base font-medium text-gray-900 dark:text-gray-100 transition-all duration-300 hover:text-primary dark:hover:text-primary cursor-pointer pl-3 pr-2 py-3">
                      <span>{item.name}</span>
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-300 ${
                          desktopDropdown === item.name ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  </Link>

                  <AnimatePresence>
                    {desktopDropdown === item.name && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        transition={{
                          duration: 0.22,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        className="absolute left-1/2 top-full z-50 mt-0 w-64 -translate-x-1/2 overflow-hidden rounded-md border border-border/60 bg-background shadow-md"
                        onMouseEnter={() => handleDropdownEnter(item.name)}
                        onMouseLeave={handleDropdownLeave}
                      >
                        <div className="p-2">
                          {item.children.map((child) => (
                            <ActiveLink
                              key={child.name}
                              to={child.href}
                              className="block px-3 py-2"
                            >
                              {child.name}
                            </ActiveLink>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <ThemeToggle />
            <Button className="rounded-full px-5" size="lg">
              Get Started
            </Button>
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center gap-4 lg:hidden">
            <ThemeToggle />

            <span onClick={() => setIsMobileOpen((prev) => !prev)}>
              {isMobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </span>
          </div>
        </div>
      </Container>

      {/* Mobile Menu */}
      <AnimatePresence initial={false}>
        {isMobileOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="absolute top-full left-0 w-full overflow-hidden border-t border-border/60 bg-background lg:hidden z-40 shadow-cardLightShadow dark:shadow-cardDarkShadow"
          >
            <Container>
              <div className="py-4">
                <div className="space-y-0">
                  {navLinks.map((item, index) => {
                    if (!item.children) {
                      return (
                        <div key={index} onClick={closeMobileMenu}>
                          <ActiveLink
                            to={item.href}
                            exact={item.href === "/"}
                            className="block rounded-md px-3 py-2 text-base"
                          >
                            {item.name}
                          </ActiveLink>
                        </div>
                      );
                    }

                    return (
                      <div key={index} className="">
                        <Link to={item.href}>
                          <button className="flex w-full items-center justify-between px-3 py-0 text-left text-base font-medium text-foreground">
                            <span>{item.name}</span>

                            <span
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                toggleMobileExpanded(item.name);
                              }}
                              className="p-3"
                            >
                              <ChevronDown
                                className={`h-4 w-4 transition-transform duration-200 ${
                                  mobileExpanded === item.name
                                    ? "rotate-180"
                                    : ""
                                }`}
                              />
                            </span>
                          </button>
                        </Link>

                        <AnimatePresence initial={false}>
                          {mobileExpanded === item.name && (
                            <motion.div
                              variants={subMenuVariants}
                              initial="closed"
                              animate="open"
                              exit="closed"
                              className="overflow-hidden"
                            >
                              <div className="space-y-2.5 px-7 mb-2">
                                {item.children.map((child) => (
                                  <div
                                    key={child.name}
                                    onClick={closeMobileMenu}
                                  >
                                    <ActiveLink
                                      to={child.href}
                                      className="block text-sm"
                                    >
                                      {child.name}
                                    </ActiveLink>
                                  </div>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-5 flex flex-col gap-3 border-t pt-5">
                  <Button className="rounded-full" size="lg">
                    Get Started
                  </Button>
                  <Button variant="outline" className="rounded-full" size="lg">
                    Book Demo
                  </Button>
                </div>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
