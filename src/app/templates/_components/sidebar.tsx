"use client";

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { CustomTemplate } from "../page"

export const SideBar: React.FC<{ customTemplates: CustomTemplate[], selectedTemplate: CustomTemplate, setSelectedTemplate:any }> = ({ customTemplates, selectedTemplate, setSelectedTemplate }) => {
    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <div className="text-2xl text-white">Custom Templates</div>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {customTemplates.map((customTemplate, idx) => (
                                <SidebarMenuItem key={idx} >
                                    <div className="h-fit p-2 rounded-sm hover:cursor-pointer hover:backdrop-brightness-150" onClick={(e) => {
                                        setSelectedTemplate(customTemplate);
                                    }}>
                                        <div className="py-4 flex flex-col">
                                            <div className="text-xl text-slate-400">{ customTemplate.title }</div>
                                            <p className="">{ customTemplate.description }</p>
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
