import { VelocityScroll } from '@/components/magicui/scroll-based-velocity';
import React from 'react'


function LeadingTeams() {
    return (
        <div className='py-24 flex flex-col items-center justify-center space-y-5 w-full'>
            <p className='font-semibold text-sm text-slate-500'>TRUSTED BY LEADING TEAMS</p>
            <VelocityScroll
                text="Velocity Scroll"
                default_velocity={5}
                className="font-display text-center text-sm font-bold tracking-[-0.02em] text-black drop-shadow-sm dark:text-white"
            />
        </div>
    )
}

export default LeadingTeams;