"use client";

import Link from "next/link";
import { UserButton } from "./userButton";
import { Button } from "@/components/ui/button";
import { Menu, AudioWaveform } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Navbar() {
  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 z-40">
      <SignedIn>
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <AudioWaveform className="h-6 w-6" />
            <span className="sr-only">AutoReportsAI</span>
          </Link>
          <Link
            href="/dashboard"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Dashboard
          </Link>
          <Link
            href="/reports"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Reports
          </Link>
          <Link
            href="/templates"
            className="text-muted-foreground hover:text-foreground"
          >
            Templates
          </Link>
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                href="/"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <AudioWaveform className="h-6 w-6" />
                <span className="sr-only">AutoReportsAI</span>
              </Link>
              <Link
                href="/dashboard"
                className="text-muted-foreground hover:text-foreground"
              >
                Dashboard
              </Link>
              <Link
                href="/reports"
                className="text-muted-foreground hover:text-foreground"
              >
                Reports
              </Link>
              <Link
                href="/templates"
                className="text-muted-foreground hover:text-foreground"
              >
                Templates
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <div className="ml-auto flex items-center flex-1 sm:flex-initial">
            <ModeToggle />
            <Button size={"default"} variant={"outline"} className="ml-2">
              <Link href="/reports/generate">Generate Report</Link>
            </Button>
          </div>
          <UserButton/>
        </div>
      </SignedIn>
      <SignedOut>
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6 w-full justify-between">
          <h3>
            <Link href="/" className="font-semibold text-xl tracking-tighter">
              AutoReportsAI
            </Link>
          </h3>
          <Button className="px-6">
            <SignInButton />
          </Button>
        </nav>
      </SignedOut>
    </header>
  );
}
