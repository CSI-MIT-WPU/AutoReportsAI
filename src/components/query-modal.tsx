"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAuth } from "@clerk/nextjs";
// import emailjs from "@emailjs/browser";
import { Textarea } from "./ui/textarea";
import { HelpCircle } from "lucide-react";

export default function QueryModal() {
  const user = useAuth();
  const [isOpen, setIsOpen] = React.useState(false); // State for controlling dialog visibility

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [description, setDescription] = React.useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !description)
      return toast.error("Please fill all fields");
    const id = toast.loading("Sending message...");
    const serviceId = process.env.NEXT_PUBLIC_SERVICE_ID as string;
    const templateId = process.env.NEXT_PUBLIC_TEMPLATE_ID as string;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_KEY as string;
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <HelpCircle
            onClick={openDialog}
            className="fixed bottom-4 right-4 cursor-pointer"
          />
        </DialogTrigger>
        <DialogContent className="sm:max-w-md rounded-md">
          <DialogHeader>
            <DialogTitle>Contact Us</DialogTitle>
            <DialogDescription>Lets talk about your problem.</DialogDescription>
          </DialogHeader>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="Enter your email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="desc">Description</Label>
              <Textarea
                id="desc"
                placeholder="Describe your problem in detail"
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>

          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="secondary" onClick={closeDialog}>
                Close
              </Button>
            </DialogClose>
            <Button className="mb-3 md:mb-0" onClick={handleSubmit}>
              Submit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
