"use client";

import React from 'react'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { SideBar } from './_components/sidebar'

export interface CustomTemplate {
  title: string;
  description: string;
  fileUrl: string;
  createdAt: string;
}

export default function Templates() {

  const [customTemplates, setCustomTemplates] = React.useState([] as CustomTemplate[]);
  const [selectedTemplate, setSelectedTemplate] = React.useState<CustomTemplate | null>(null);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    async function getCustomTemplates() {
      try {
        const response = await fetch("/api/templates");
        if (!response.ok) {
          throw new Error(`An error occured. Status: ${response.status}`);
        }
        const data = await response.json();
        setCustomTemplates(data);
        console.log(data);
      } catch (error: any) {
        setError(error.message);
        console.error("Failed to fetch custom templates:", error);
      }
    }

    getCustomTemplates();
  }, []);

  return (
    <div className='flex w-full'>
      <div>
        <SidebarProvider>
          <SideBar customTemplates={customTemplates} selectedTemplate={selectedTemplate as CustomTemplate} setSelectedTemplate={setSelectedTemplate}/>
          <SidebarTrigger />
        </SidebarProvider>
      </div>
      <div className='flex flex-col w-[80%] p-8'>
        <h2 className=' self-center scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0'> { selectedTemplate?.title } </h2>
        <p>{ selectedTemplate?.description }</p>
      </div>
    </div>
  )
}
