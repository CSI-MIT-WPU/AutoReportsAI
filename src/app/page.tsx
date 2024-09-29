import type { Metadata } from "next";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";

import HeroSection from "./_components/HeroSection";
import ContactSection from "./_components/contact";
import CTA from "./_components/CTA";
import Footer from "./_components/footer";
import ProblemSection from "./_components/problem-section";
import SolutionsSection from "./_components/solutions-section";
import Navbar from "./_components/navbar";

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

            <section className="w-full min-h-screen flex flex-col">
                {/* <Navbar/> */}
                <HeroSection />
                <CTA />
                {/* <ProblemSection/> */}
                {/* <SolutionsSection /> */}
                <ContactSection />
                <Footer />

            </section>


        </main>
    );
}

export const metadata: Metadata = {
    title: "Home | Auto Reports AI",
    description: "Generate reports for your Github repositories",
};