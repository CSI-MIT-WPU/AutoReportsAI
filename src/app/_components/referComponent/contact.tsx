"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const ContactSection = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !subject || !description) {
      setError("All fields are required.");
      return;
    }

    setError("");

    try {
      setIsLoading(true);
      const response = await fetch("/api/resend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          subject,
          message: description,
        }),
      });
      const result = await response.json();

      if (response.status === 400 || response.status === 500) {
        setIsLoading(false);
        return toast.error(
          "Error sending the message. Please try after some time."
        );
      }
      toast.success("Message send successfully!");
      setFirstName("");
      setLastName("");
      setEmail("");
      setSubject("");
      setDescription("");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Error submitting form:", error);
      setError("An error occurred while submitting the form.");
    }
  };

  return (
    <section id="contact" className="w-full my-28">
      <Card className="w-full md:w-[500px] md:mx-auto border">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Contact Us</CardTitle>
            <CardDescription>How can we help?</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid items-center gap-4">
              {error && <p className="text-red-500">{error}</p>}
              <div className="flex justify-between">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    placeholder="Enter your first name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    placeholder="Enter your last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
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
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  placeholder="Enter your subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="desc">Message</Label>
                <Textarea
                  id="desc"
                  placeholder="Write your message here..."
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="submit" disabled={isLoading}>
              Submit
            </Button>
          </CardFooter>
        </form>
      </Card>
    </section>
  );
};

export default ContactSection;
