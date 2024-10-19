"use client"

import { z, ZodError } from "zod";
import React from "react";
import { useForm } from "react-hook-form"
import { UploadIcon } from "lucide-react"
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod";
import Dropzone, { DropzoneState } from 'shadcn-dropzone'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"


const TemplateFormSchema = z.object({
    title: z.string().min(3),
    description: z.string().max(200),
    file: z.instanceof(File, {message: "File is required!"}).refine(file => file.type.startsWith('application/pdf'), {
        message: 'Please upload a PDF file.',
    }),
});

export function CreateTemplate() {

    const [isFileUploaded, setIsFileUploaded] = React.useState(false);

    const form = useForm<z.infer<typeof TemplateFormSchema>>({
        resolver: zodResolver(TemplateFormSchema),
        defaultValues: {
            title: '',
            description: '',
            file: undefined
        }
    });

    async function onSubmit(data: z.infer<typeof TemplateFormSchema>) {
        console.log("first")
        console.log(data);
    }

    return (
        <Form {...form}>
            <form className="h-screen flex justify-center items-center" onSubmit={form.handleSubmit(onSubmit)}>
                <Card className="grid grid-cols-2 items-center justify-center gap-x-8 p-14">
                    <div className="flex flex-col gap-4">
                        <CardHeader className="px-0 pt-0">
                            <CardTitle className="text-2xl">Add Template</CardTitle>
                            <CardDescription>
                                Upload a pdf file to scan for template headings.
                            </CardDescription>
                        </CardHeader>
                        <div className="grid gap-2">
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
                        </div>
                        <div className="grid gap-2">
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
                        </div>
                        <Button className="w-full" type="submit">Create Template</Button>
                    </div>
                    <CardContent className="h-full grid gap-4 pb-0">
                        <Dropzone
                            onDrop={(acceptedFiles: File[], fileRejections: any, event: any) => {
                                if (fileRejections.length > 0) {
                                    console.log('rejected files');
                                    return;
                                }
                                else if (acceptedFiles.length > 0) {
                                    form.setValue('file', acceptedFiles[0]);
                                    setIsFileUploaded(true);
                                }
                            }}
                            dropZoneClassName="h-full w-full border-2 border-dashed border-gray-300 rounded-lg"
                        >
                            {(dropzone: DropzoneState) => (
                                <div className=" h-full flex flex-col items-center justify-center">
                                    <input {...dropzone.getInputProps()} />
                                    {form.formState.errors.file && (
                                            <p className="text-red-500 text-sm">
                                                {form.formState.errors.file.message}
                                            </p>
                                        )}
                                    {
                                        dropzone.isDragAccept ? (
                                            <div className='text-sm font-medium'>Drop your file here!</div>
                                        ) : (
                                            <div className='flex items-center flex-col gap-1.5'>
                                                {
                                                    isFileUploaded ? (
                                                        <p className="text-sm font-medium">
                                                            {form.getValues().file.name}
                                                        </p>
                                                    ) : (
                                                        <div className='flex items-center flex-row gap-2 '>
                                                            <UploadIcon size={20} />
                                                            <p className="text-sm font-medium">
                                                                Upload files
                                                            </p>
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        )
                                    }
                                </div>
                            )}
                        </Dropzone>
                    </CardContent>
                </Card>
            </form>
        </Form>
    )
}



export default CreateTemplate