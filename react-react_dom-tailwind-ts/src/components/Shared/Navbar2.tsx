import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Container from "../Layout/Container";
import ActiveLink2 from "./ActiveLink2";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Projects", href: "/projects" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar2() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80">
      <Container>
        <div className="flex h-16 xl:h-18 items-center justify-between">
          <Link to="/">
            <h2 className="text-xl font-semibold tracking-tight text-foreground xl:text-2xl">
              Logo
            </h2>
          </Link>

          <nav className="hidden items-center gap-6 lg:flex 2xl:gap-7">
            {navLinks.map((item) => (
              <ActiveLink2
                key={item.name}
                to={item.href}
                exact={item.href === "/"}
              >
                {item.name}
              </ActiveLink2>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <ThemeToggle />
            <Button className="rounded-full px-5" size="lg">
              Get Started
            </Button>
          </div>

          <div className="flex items-center gap-3 lg:hidden">
            <ThemeToggle />

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Menu className="h-5 w-6" />
              </SheetTrigger>

              <SheetContent
                side="right"
                className="w-[300px] bg-background p-5 sm:w-[360px]"
                showCloseButton={false}
              >
                <div className="mb-3">
                  <Link to="/" onClick={() => setIsOpen(false)}>
                    <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                      Logo
                    </h2>
                  </Link>
                </div>

                <div className="flex flex-col">
                  <div className="mb-2 space-y-1.5">
                    {navLinks.map((item) => (
                      <div key={item.name} onClick={() => setIsOpen(false)}>
                        <ActiveLink2 to={item.href} exact={item.href === "/"}>
                          {item.name}
                        </ActiveLink2>
                      </div>
                    ))}
                  </div>

                  <Separator className="my-5" />

                  <div className="flex flex-col gap-3">
                    <Button className="rounded-full px-5" size="lg">
                      Get Started
                    </Button>
                    <Button variant="outline" className="w-full rounded-full">
                      Book Demo
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </Container>
    </header>
  );
}
