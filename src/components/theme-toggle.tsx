import { useTheme } from "@/hooks/use-theme";
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";

function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  function toggleTheme() {
    setTheme(theme === "dark" ? "light" : "dark");
  }

  return (
    <Button onClick={toggleTheme} variant="ghost" size="icon">
      {theme === "dark" ? <Sun /> : <Moon />}
    </Button>
  );
}

export default ThemeToggle;
