import Link from "next/link"
import { CircleUser, Menu, AudioWaveform, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { UserButton } from "@clerk/nextjs"

export default function Navbar() {
    return (
        <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
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
                    </nav>
                </SheetContent>
            </Sheet>
            <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
                <div className="ml-auto flex-1 sm:flex-initial">
                    <Button>
                        Generate Report
                    </Button>
                </div>
                <UserButton />
            </div>
        </header>
    )
}
