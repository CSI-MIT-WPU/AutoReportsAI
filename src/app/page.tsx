import type { Metadata } from "next";
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
                <div className="flex space-x-4">
                    <Link href="/dashboard">
                        <Button>Dashboard</Button>
                    </Link>
                    <Link href="/reports">
                        <Button>Reports</Button>
                    </Link>
                </div>
                <UserButton />
            </SignedIn>

            <section className="w-full min-h-screen flex flex-col items-center justify-start">
                <div className="pt-32 px-10 text-center space-y-5">
                    <h1 className="text-5xl tracking-tighter font-medium">Take a look on your <span className="p-2 rounded-lg bg-gray-100 font-semibold text-red-500 text-4xl font-mono">git commits</span> with AI</h1>
                    <p className="text-base tracking-wide">No matter what problem you have, our AI can help you solve it.</p>
                    <Button >Make Your First Report</Button>
                </div>


            </section>


        </main>
    );
}

export const metadata: Metadata = {
    title: "Home | Auto Reports AI",
    description: "Generate reports for your Github repositories",
  };