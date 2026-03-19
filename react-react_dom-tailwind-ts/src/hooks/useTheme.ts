import { ThemeContext } from "@/contexts/theme-context";
import { useContext } from "react";

export const useTheme = () => {
  const context = useContext(ThemeContext);

  return context;
};
