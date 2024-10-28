"use client";

import React from 'react'
import { SideBar } from './_components/sidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'

export interface CustomTemplate {
  title: string;
  description: string;
  fileUrl: string;
  createdAt: string;
}

export default function Templates() {

  const [customTemplates, setCustomTemplates] = React.useState([] as CustomTemplate[]);
  const [selectedTemplate, setSelectedTemplate] = React.useState<CustomTemplate | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    async function getCustomTemplates() {
      try {
        setLoading(true);
        const response = await fetch("/api/templates");
        if (!response.ok) {
          throw new Error(`An error occured. Status: ${response.status}`);
        }
        const data = await response.json();
        setCustomTemplates(data);
        setLoading(false);
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
          <SideBar customTemplates={customTemplates}
            selectedTemplate={selectedTemplate as CustomTemplate}
            setSelectedTemplate={setSelectedTemplate}
            loading={loading} 
          />
          <SidebarTrigger />
        </SidebarProvider>
      </div>
      <div className='flex flex-col w-[80%] p-8'>
        {
          selectedTemplate ? (
            <>
              <h2 className='self-center scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0'>
                {selectedTemplate?.title}
              </h2>
              <div className='flex'>
                <p className='font-bold underline'>Description:</p>
                <p>&nbsp;{selectedTemplate?.description}</p>
              </div>
              <div className='flex'>
                <p className='font-bold underline'>Created:</p>
                <p>&nbsp;{selectedTemplate?.createdAt}</p>
              </div>
              <div className='self-center mt-8'>
                <iframe
                  src={selectedTemplate?.fileUrl}
                  className="w-full md:w-[500px] h-[70vh] max-w-full"
                  style={{ maxWidth: '100%', border: 'none' }}
                />
              </div>
            </>
          ) :
            <div className='self-center text-2xl text-white'>Select a template to view</div>
        }
      </div>
    </div>
  )
}
