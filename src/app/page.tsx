"use client";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/firebase";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useAuth,
} from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { addDoc, collection, doc, getDoc } from "firebase/firestore";

export default function Home() {
  const user = useAuth();
  const hanldeClick = async () => {
    await fetch("/api/get-access-token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user.userId,
        provider: "oauth_github",
      }),
    });
  };

  const getRepos = async () => {
    const response = await fetch("/api/github/repos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center space-y-5">
      <ModeToggle />
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <Button onClick={hanldeClick}>Get Token</Button>
        <Button onClick={getRepos}>Get Repos</Button>
        <UserButton />
      </SignedIn>
    </main>
  );
}
