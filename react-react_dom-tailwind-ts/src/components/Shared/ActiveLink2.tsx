import { type ReactNode } from "react";
import { NavLink } from "react-router-dom";

type TActiveLink2Props = {
  to: string;
  exact?: boolean;
  children: ReactNode;
};

const ActiveLink2 = ({ to, exact = false, children }: TActiveLink2Props) => {
  return (
    <NavLink
      to={to}
      end={exact} // equivalent to "exact" matching
      className={({ isActive }) =>
        `hover:text-primary transition-all duration-300 ${
          isActive
            ? "text-primary font-semibold"
            : "text-gray-900 dark:text-gray-100"
        }`
      }
    >
      {children}
    </NavLink>
  );
};

export default ActiveLink2;
