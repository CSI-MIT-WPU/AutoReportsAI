import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center space-y-5">
      <ModeToggle />
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <Link href="/dashboard">
          <Button>Dashboard</Button>
        </Link>
        <UserButton />
      </SignedIn>
    </main>
  );
}
