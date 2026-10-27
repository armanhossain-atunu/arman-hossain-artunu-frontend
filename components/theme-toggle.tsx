"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
export function ThemeToggle() { const { theme, setTheme } = useTheme(); const [ready, setReady] = useState(false); useEffect(() => setReady(true), []); return <Button aria-label="Toggle theme" variant="outline" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>{ready && theme === "dark" ? <Sun size={17}/> : <Moon size={17}/>}</Button>; }
