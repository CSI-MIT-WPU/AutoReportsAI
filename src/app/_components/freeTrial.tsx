import React from 'react'
import BlurFade from '@/components/magicui/blur-fade'
import { Button } from '@/components/ui/button'

function FreeTrial() {
    return (
        <div className='w-full py-16 space-y-5 px-40 bg-red-100 text-center'>
            <p className='text-sm tracking-wide'>READY TO GET STARTED?</p>
            <h2 className="text-5xl font-semibold">Start your free trial today.</h2>
            <BlurFade delay={0.25} inView>
                <Button>Get started for free</Button>
            </BlurFade>
        </div>
    )
}

export default FreeTrial