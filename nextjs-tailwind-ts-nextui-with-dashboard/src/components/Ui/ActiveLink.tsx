"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

type TActiveLinkProps = {
  href: string;
  exact?: boolean;
  children: ReactNode;
};

const ActiveLink = ({ href, exact = false, children }: TActiveLinkProps) => {
  const path = usePathname();
  const active = exact ? path == href : path.startsWith(href);

  return (
    <div>
      <Link href={href} className={active ? "text-yellow-600 font-medium" : ""}>
        {children}
      </Link>
    </div>
  );
};

export default ActiveLink;
