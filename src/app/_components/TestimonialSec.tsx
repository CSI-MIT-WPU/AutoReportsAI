import React from 'react'
import { Quote } from 'lucide-react';
import BlurFade from "@/components/magicui/blur-fade";

function TestimonialSec() {
    return (
        <div className='py-16 space-y-10 px-40'>
            <div className="text-center space-y-3">
                <p className='text-sm tracking-wide'>TESTIMONIAL HIGHLIGHTS</p>
                <h2 className="text-5xl font-semibold">What our customers are saying</h2>
            </div>
            <div className='flex flex-col items-center justify-center space-y-5'>
                <Quote className='text-black dark:text-white' />
                <p className='font-semibold text-base max-w-md text-center'>There is a lot of exciting stuff going on in the stars above us that make astronomy so much fun. The truth is the universe is a constantly changing, moving, some would say “living” thing because you just never know what you are going to see on any given night of stargazing.</p>
            </div>
            <div className='space-y-1'>
                <BlurFade delay={0.25} inView>
                    <img src="/Google.svg" className='mx-auto w-auto h-[40px] grayscale opacity-30' alt="" />
                </BlurFade>
                <BlurFade delay={0.25 * 2} inView>
                    <p className='font-semibold text-base text-center'>Leslie Alexander</p>
                </BlurFade>
                <BlurFade delay={0.25 * 3} inView>
                    <p className='text-base text-center'>UI Designer</p>
                </BlurFade>
            </div>
        </div>
    )
}

export default TestimonialSec