"use client";

import Link from "next/link";
import { CustomTemplate } from "../page"
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
} from "@/components/ui/sidebar"

export const SideBar: React.FC<{
    customTemplates: CustomTemplate[],
    selectedTemplate: CustomTemplate,
    setSelectedTemplate: any
    loading: boolean,
    }> = ({
        customTemplates,
        selectedTemplate,
        setSelectedTemplate,
        loading,
    }) => 
{
    return (
        <Sidebar>
            <SidebarHeader>
                <Button>
                    <Link href="/templates/create-template">
                        Create New Template
                    </Link>
                </Button>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <div className="text-2xl text-white">Custom Templates</div>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {
                                loading && (
                                    <div className="flex flex-col gap-8 pt-8">
                                        <div className="space-y-2">
                                            <Skeleton className="h-6 w-[250px]" />
                                            <Skeleton className="h-4 w-[200px]" />
                                        </div>
                                        <div className="space-y-2">
                                            <Skeleton className="h-6 w-[250px]" />
                                            <Skeleton className="h-4 w-[200px]" />
                                        </div>
                                    </div>
                                )

                            }
                            {customTemplates.map((customTemplate, idx) => (
                                <SidebarMenuItem key={idx} >
                                    <div className="h-fit p-2 rounded-sm hover:cursor-pointer hover:backdrop-brightness-150" onClick={(e) => {
                                        setSelectedTemplate(customTemplate);
                                    }}>
                                        <div className="py-4 flex flex-col">
                                            <div className="text-xl text-slate-400">{customTemplate.title}</div>
                                            <p>{customTemplate.description}</p>
                                        </div>
                                    </div>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}
