import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/useTheme";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="icon"
      className="rounded-full"
      onClick={toggleTheme}
    >
      {theme === "dark" ? (
        <Sun className="h-6 w-6" />
      ) : (
        <Moon className="h-6 w-6" />
      )}
    </Button>
  );
}
{
  /* <Button
            variant="outline"
            size="icon"
            className="rounded-full"
            onClick={toggleTheme}
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button> */
}

/**
 <button
      onClick={toggleTheme}
      id="darkToggle"
      className="p-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 cursor-pointer"
      aria-label="Toggle dark mode"
    >
      {theme === "dark" ? <Sun /> : <Moon />}
    </button>
 * */
