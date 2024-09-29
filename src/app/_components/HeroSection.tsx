import React from 'react'
import { Button } from "@/components/ui/button";

const HeroSection = () => {
    return (
        <div className="pt-32 px-10 text-center space-y-5">
            <h1 className="text-5xl tracking-tighter font-medium">Take a look on your <span className="p-2 rounded-lg bg-gray-100 font-semibold text-red-500 text-4xl font-mono">git commits</span> with AI</h1>
            <p className="text-base tracking-wide">No matter what problem you have, our AI can help you solve it.</p>
            <Button >Make Your First Report</Button>
        </div>
    )
}

export default HeroSection