"use client";
import Link from "next/link";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useAuth,
} from "@clerk/nextjs";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Menu } from "lucide-react";
import { signInWithCustomToken } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { ModeToggle } from "@/components/mode-toggle";
import { useTheme } from "next-themes";
import Image from "next/image";

const Navbar = () => {
  const { getToken } = useAuth();
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const { theme } = useTheme();

  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 z-30">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          href="#"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          {/* <Package2 className="h-6 w-6" /> */}
          {theme === "light" ? (
            <Image
              src="https://firebasestorage.googleapis.com/v0/b/hydrobud-427708.appspot.com/o/black-logo.png?alt=media&token=4948ff69-ed9a-4571-8e62-7c8de833a37d"
              height={200}
              width={300}
              alt="hydrobud logo"
            />
          ) : (
            <span className="font-black text-2xl text-accent-foreground">
              AutoReportsAI
            </span>
          )}
        </Link>
        <SignedIn>
          <Link
            href="/dashboard"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Dashboard
          </Link>
        </SignedIn>
        <Link
          href="/"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          Products
        </Link>
        <Link
          href="/"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          Support
        </Link>
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium text-primary">
            <Link
              href="/"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              {/* <Package2 className="h-6 w-6" /> */}
              <span className="text-2xl font-serif font-bold">Hydrobud</span>

              <span className="sr-only">Hydrobud</span>
            </Link>
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <SignedIn>
              <Link href="/dashboard" className="hover:text-foreground">
                Dashboard
              </Link>
            </SignedIn>
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex w-full items-center justify-end gap-4 md:ml-auto md:gap-2 lg:gap-4">
        {/* <form className="ml-auto flex-1 sm:flex-initial">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
            />
          </div>
        </form> */}
        <div className="ml-auto flex-1 flex space-x-3 sm:flex-initial">
          <ModeToggle />
          <SignedOut>
            <SignInButton forceRedirectUrl="/dashboard">
              <Button variant="outline" size="sm">
                Sign In
              </Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
