import type { Metadata } from "next";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import HeroSection from "@/app/_components/heroSection";
import HeroVid from "@/app/_components/heroVid";
import LeadingTeams from "./_components/leadingTeams";
import ProblemSec from "./_components/problemSec";
import SolutionSec from "./_components/solutionSec";
import HowItWorks from "./_components/howItWorks";
import TestimonialSec from "./_components/TestimonialSec";
import { FAQS } from "./_components/faqs";
import FreeTrial from "./_components/freeTrial";
import Footer from "./_components/footer";
import Blog from "./_components/blog";

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

            <section className="w-full flex flex-col items-center justify-center space-y-7">
                <HeroSection />
                <HeroVid />
                <LeadingTeams />
                <ProblemSec />
                <SolutionSec />
                <HowItWorks />
                <TestimonialSec />
                <FAQS />
                <Blog />
                <FreeTrial />
                <Footer />
            </section>


        </main>
    );
}

export const metadata: Metadata = {
    title: "Home | Auto Reports AI",
    description: "Generate reports for your Github repositories",
};