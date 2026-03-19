import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";

type TActiveLinkProps = {
  to: string;
  children: React.ReactNode;
  exact?: boolean;
  className?: string;
};

export default function ActiveLink({
  to,
  children,
  exact = false,
  className,
}: TActiveLinkProps) {
  return (
    <NavLink
      to={to}
      end={exact}
      className={({ isActive }) =>
        cn(
          "text-base font-medium text-gray-900 dark:text-gray-100 transition-all duration-300 hover:text-primary dark:hover:text-primary",
          isActive && "text-primary dark:text-primary",
          className,
        )
      }
    >
      {children}
    </NavLink>
  );
}
