"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQS() {
  return (
    <div className="py-16 space-y-10 flex flex-col items-center justify-center p-4">
      <div className="text-center space-y-3">
        <p className="text-sm tracking-wide">FAQS</p>
        <h2 className="text-5xl font-semibold">Frequently asked questions</h2>
      </div>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>How does the app generate reports from GitHub commits?</AccordionTrigger>
          <AccordionContent>
          The app connects to your GitHub account to analyze your commit history. Using AI, it summarizes your activity and organizes it into a structured report based on the selected template. This includes details like project progress, task updates, and contributions.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Is my GitHub data safe and secure?</AccordionTrigger>
          <AccordionContent>
          Absolutely! Your data is handled securely and is only accessed to generate reports. We comply with GitHub’s API guidelines to ensure your data privacy. No sensitive information is stored permanently.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Can I customize the report template?</AccordionTrigger>
          <AccordionContent>
          Yes, you can! The app provides multiple templates, and you can tweak elements like sections, formatting, and tone to match your preferences. We aim to make your reports as tailored and useful as possible.
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <p className="text-sm">
        Still have questions? Email us at vk102002@gmail.com
      </p>
    </div>
  );
}
