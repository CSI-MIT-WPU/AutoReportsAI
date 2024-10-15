import React from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"


export const Navbar = () => {
    return (
        <div className='w-full dark:bg-black/90 bg-background/60 backdrop-blur border-b flex items-center justify-between px-16 py-4 fixed top-0 z-20'>
            <div>
                <h3 className='font-semibold text-xl tracking-tighter'>AutoReportsAI</h3>
            </div>

            <div className='flex items-center justify-center space-x-5'>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="ghost">Features</Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[500px]">
                        <div className='grid grid-cols-4 gap-4 text-xs font-medium'>
                            <div className='col-span-2 space-y-1 hover:bg-red-100 rounded-md p-2 group'>
                                <h4 className='font-semibold group-hover:text-red-500'>For small businesses</h4>
                                <p className='text-slate-500'>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
                            </div>
                            <div className='col-span-2 space-y-1 hover:bg-red-100 rounded-md p-2 group'>
                                <h4 className='font-semibold group-hover:text-red-500'>For small businesses</h4>
                                <p className='text-slate-500'>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
                            </div>
                            <div className='col-span-2 space-y-1 hover:bg-red-100 rounded-md p-2 group'>
                                <h4 className='font-semibold group-hover:text-red-500'>For small businesses</h4>
                                <p className='text-slate-500'>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
                            </div>
                            <div className='col-span-2 space-y-1 hover:bg-red-100 rounded-md p-2 group'>
                                <h4 className='font-semibold group-hover:text-red-500'>For small businesses</h4>
                                <p className='text-slate-500'>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
                            </div>
                            <div className='col-span-2 space-y-1 hover:bg-red-100 rounded-md p-2 group'>
                                <h4 className='font-semibold group-hover:text-red-500'>For small businesses</h4>
                                <p className='text-slate-500'>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
                            </div>
                            <div className='col-span-2 space-y-1 hover:bg-red-100 rounded-md p-2 group'>
                                <h4 className='font-semibold group-hover:text-red-500'>For small businesses</h4>
                                <p className='text-slate-500'>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>

                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="ghost">Solutions</Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[500px]">
                        <div className='grid grid-cols-4 gap-4 text-xs font-medium'>
                            <div className='col-span-2 space-y-1 hover:bg-red-100 rounded-md p-2 group'>
                                <h4 className='font-semibold group-hover:text-red-500'>For small businesses</h4>
                                <p className='text-slate-500'>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
                            </div>
                            <div className='col-span-2 space-y-1 hover:bg-red-100 rounded-md p-2 group'>
                                <h4 className='font-semibold group-hover:text-red-500'>For small businesses</h4>
                                <p className='text-slate-500'>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
                            </div>
                            <div className='col-span-2 space-y-1 hover:bg-red-100 rounded-md p-2 group'>
                                <h4 className='font-semibold group-hover:text-red-500'>For small businesses</h4>
                                <p className='text-slate-500'>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
                            </div>
                            <div className='col-span-2 space-y-1 hover:bg-red-100 rounded-md p-2 group'>
                                <h4 className='font-semibold group-hover:text-red-500'>For small businesses</h4>
                                <p className='text-slate-500'>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
                            </div>
                            <div className='col-span-2 space-y-1 hover:bg-red-100 rounded-md p-2 group'>
                                <h4 className='font-semibold group-hover:text-red-500'>For small businesses</h4>
                                <p className='text-slate-500'>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
                            </div>
                            <div className='col-span-2 space-y-1 hover:bg-red-100 rounded-md p-2 group'>
                                <h4 className='font-semibold group-hover:text-red-500'>For small businesses</h4>
                                <p className='text-slate-500'>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>

                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="ghost">Blog</Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[500px]">
                        <div className='grid grid-cols-4 gap-4 text-xs font-medium'>
                            <div className='col-span-2 space-y-1 hover:bg-red-100 rounded-md p-2 group'>
                                <h4 className='font-semibold group-hover:text-red-500'>For small businesses</h4>
                                <p className='text-slate-500'>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
                            </div>
                            <div className='col-span-2 space-y-1 hover:bg-red-100 rounded-md p-2 group'>
                                <h4 className='font-semibold group-hover:text-red-500'>For small businesses</h4>
                                <p className='text-slate-500'>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
                            </div>
                            <div className='col-span-2 space-y-1 hover:bg-red-100 rounded-md p-2 group'>
                                <h4 className='font-semibold group-hover:text-red-500'>For small businesses</h4>
                                <p className='text-slate-500'>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
                            </div>
                            <div className='col-span-2 space-y-1 hover:bg-red-100 rounded-md p-2 group'>
                                <h4 className='font-semibold group-hover:text-red-500'>For small businesses</h4>
                                <p className='text-slate-500'>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
                            </div>
                            <div className='col-span-2 space-y-1 hover:bg-red-100 rounded-md p-2 group'>
                                <h4 className='font-semibold group-hover:text-red-500'>For small businesses</h4>
                                <p className='text-slate-500'>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
                            </div>
                            <div className='col-span-2 space-y-1 hover:bg-red-100 rounded-md p-2 group'>
                                <h4 className='font-semibold group-hover:text-red-500'>For small businesses</h4>
                                <p className='text-slate-500'>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>

                <Button variant="outline">Login</Button>
                <Button variant="destructive">Get started for free</Button>

            </div>

        </div>
    )
}

// <div className="grid gap-4">
//                         <div className="space-y-2">
//                             <h4 className="font-medium leading-none">Dimensions</h4>
//                             <p className="text-sm text-muted-foreground">
//                                 Set the dimensions for the layer.
//                             </p>
//                         </div>
//                         <div className="grid gap-2">
//                             <div className="grid grid-cols-3 items-center gap-4">
//                                 <Label htmlFor="width">Width</Label>
//                                 <Input
//                                     id="width"
//                                     defaultValue="100%"
//                                     className="col-span-2 h-8"
//                                 />
//                             </div>
//                             <div className="grid grid-cols-3 items-center gap-4">
//                                 <Label htmlFor="maxWidth">Max. width</Label>
//                                 <Input
//                                     id="maxWidth"
//                                     defaultValue="300px"
//                                     className="col-span-2 h-8"
//                                 />
//                             </div>
//                             <div className="grid grid-cols-3 items-center gap-4">
//                                 <Label htmlFor="height">Height</Label>
//                                 <Input
//                                     id="height"
//                                     defaultValue="25px"
//                                     className="col-span-2 h-8"
//                                 />
//                             </div>
//                             <div className="grid grid-cols-3 items-center gap-4">
//                                 <Label htmlFor="maxHeight">Max. height</Label>
//                                 <Input
//                                     id="maxHeight"
//                                     defaultValue="none"
//                                     className="col-span-2 h-8"
//                                 />
//                             </div>
//                         </div>
//                     </div>