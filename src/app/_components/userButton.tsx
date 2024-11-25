"use client";

import React from 'react';
import { dark } from "@clerk/themes";
import { useTheme } from 'next-themes';
import { Loader2, LogOut, LucideUser } from 'lucide-react';
import DropdownMenuItemWithIcon from './DropdownMenuItemWithIcon';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ClerkLoaded, ClerkLoading, SignedIn, SignedOut, SignOutButton, useClerk } from '@clerk/nextjs';
import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuGroup, 
    DropdownMenuItem, 
    DropdownMenuLabel, 
    DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

export const UserButton: React.FC = () => {

    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === 'dark';
    const { session, openUserProfile, openSignIn } = useClerk();

    return (
        <div className=''>
            <ClerkLoading>
                <Loader2 className='animate-spin' />
            </ClerkLoading>
            <ClerkLoaded>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Avatar>
                            <AvatarImage src={session?.user.imageUrl} />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <SignedIn>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>Manage Account</DropdownMenuLabel>
                            <DropdownMenuGroup>
                                <DropdownMenuItemWithIcon Icon={LucideUser} onClick={() => openUserProfile({ appearance: { baseTheme: isDark ? dark : undefined } })}>
                                    <span>Profile</span>
                                </DropdownMenuItemWithIcon>
                                <SignOutButton signOutOptions={{ sessionId: session?.id }}>
                                    <DropdownMenuItemWithIcon Icon={LogOut}>
                                        <span>Sign Out</span>
                                    </DropdownMenuItemWithIcon>
                                </SignOutButton>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </SignedIn>
                    <SignedOut>
                        <DropdownMenuContent>
                            <DropdownMenuItem onClick={() => openSignIn()}>
                                <span>Sign In</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </SignedOut>
                </DropdownMenu>
            </ClerkLoaded>
        </div>
    )
}
