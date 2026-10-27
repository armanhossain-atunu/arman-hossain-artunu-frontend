"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
const links = [{href:"#about",label:"About"},{href:"#skills",label:"Skills"},{href:"#projects",label:"Projects"},{href:"#experience",label:"Experience"},{href:"#contact",label:"Contact"}];
export function SiteHeader() { const [open,setOpen] = useState(false); return <header className="site-header"><div className="container nav-wrap"><Link href="/" className="brand"><span className="brand-mark">A</span><span>arman<span className="brand-dot">.</span></span></Link><nav className="desktop-nav">{links.map(x=><a key={x.href} href={x.href}>{x.label}</a>)}</nav><div className="nav-actions"><ThemeToggle/><Button asChild size="sm" className="nav-cta"><a href="#contact">Let&apos;s talk <ArrowUpRight size={15}/></a></Button><Button variant="outline" size="icon" className="mobile-menu" onClick={()=>setOpen(!open)} aria-label="Toggle navigation">{open?<X size={18}/>:<Menu size={18}/>}</Button></div></div>{open&&<nav className="mobile-nav">{links.map(x=><a key={x.href} href={x.href} onClick={()=>setOpen(false)}>{x.label}</a>)}</nav>}</header>; }
