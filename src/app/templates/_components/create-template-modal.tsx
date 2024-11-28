"use client"

import { z } from "zod"
import React from "react"
import { Loader2 } from 'lucide-react'
import { useForm } from "react-hook-form"
import { UploadIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"

const Icons: {
    spinner: React.FC<React.SVGProps<SVGSVGElement>>;
} = {
    spinner: Loader2,
};

const TemplateFormSchema = z.object({
    title: z.string().min(3),
    description: z.string().max(200),
    file: z.instanceof(File, { message: "File is required!" }).refine(file => file.type.startsWith('application/pdf'), {
        message: 'Please upload a PDF file.',
    }),
});

export default function CreateTemplate() {

    const [isFileUploaded, setIsFileUploaded] = React.useState(false);
    const [responseExists, setResponseExists] = React.useState(true);
    const router = useRouter();

    const form = useForm<z.infer<typeof TemplateFormSchema>>({
        resolver: zodResolver(TemplateFormSchema),
        defaultValues: {
            title: '',
            description: '',
            file: undefined
        }
    });

    async function onSubmit(data: z.infer<typeof TemplateFormSchema>, type: string) {
        if (type === "auto") {
            const formData = new FormData();
            formData.append("title", data.title);
            formData.append("description", data.description);
            formData.append("file", data.file);
            formData.append("type", "auto");
            setResponseExists(false);
            toast({
                title: 'Creating template...',
                description: 'This usually takes some time, please be patient :D',
                style: {zIndex:500}
            })
            const response = await fetch('/api/templates', {
                method: 'POST',
                body: formData
            });
            setResponseExists(true);
            if (response.ok) {
                console.log('Template created successfully');
                console.log(response.body);
            } else {
                console.error('Failed to create template');
            }
            router.push('/templates');
        }
        else {

        }
    }

    return (
        <>
            <Form {...form}>
                <div className="flex justify-center">
                    <Tabs defaultValue="auto" className="w-full" onValueChange={(e) => form.reset()}>
                        <TabsList className="md:grid w-full grid-cols-2">
                            <TabsTrigger value="auto">File Upload</TabsTrigger>
                            <TabsTrigger value="manual">Manual Entry</TabsTrigger>
                        </TabsList>
                        <TabsContent value="auto">
                            <Card>
                                <CardHeader>
                                    <CardTitle>File Upload</CardTitle>
                                    <CardDescription>
                                        Upload a PDF file and let our system extract the template for you.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    <form className="flex flex-col gap-2" onSubmit={form.handleSubmit(() => onSubmit(form.getValues(), "auto"))}>
                                        <FormField
                                            control={form.control}
                                            name="title"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Title</FormLabel>
                                                    <Input {...field} id="text" type="text" placeholder="Unique Title" required />
                                                    {form.formState.errors.title && (
                                                        <p className="text-red-500 text-sm">
                                                            {form.formState.errors.title.message}
                                                        </p>
                                                    )}
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="description"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Description</FormLabel>
                                                    <Textarea  {...field} id="description" placeholder="A brief description of the template" className="resize-none" required />
                                                    {form.formState.errors.description && (
                                                        <p className="text-red-500 text-sm">
                                                            {form.formState.errors.description.message}
                                                        </p>
                                                    )}
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="file"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>File</FormLabel>
                                                    <Input type="file" onChange={(e) => field.onChange(e.target.files?.[0])} />
                                                    {form.formState.errors.file && (
                                                        <p className="text-red-500 text-sm">
                                                            {form.formState.errors.file.message}
                                                        </p>
                                                    )}
                                                </FormItem>
                                            )}
                                        />
                                        <Button className="w-full mt-4" type="submit">
                                            {
                                                !responseExists && <Icons.spinner className="h-16 w-16 animate-spin" />
                                            }
                                            Create Template
                                        </Button>
                                    </form>
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="manual">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Password</CardTitle>
                                    <CardDescription>
                                        Change your password here
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    <div className="space-y-1">
                                        <Label htmlFor="current">Current password</Label>
                                        <Input id="current" type="password" />
                                    </div>
                                    <div className="space-y-1">
                                        <Label htmlFor="new">New password</Label>
                                        <Input id="new" type="password" />
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button>Save password</Button>
                                </CardFooter>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </Form>
        </>
    );

}