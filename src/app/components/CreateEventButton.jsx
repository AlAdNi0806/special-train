
import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CalendarIcon, FilePlus, Shell } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import axios from 'axios'
import { useRouter } from "next/navigation";

const API_URL = "http://localhost:8082"

export const CreateEventButton = ({ userId, addEvent }) => {
    const [pending, setPending] = useState()
    const [error, setError] = useState()
    const [open, setOpen] = useState(false);
    const router = useRouter()

    const form = useForm({
        // resolver: zodResolver(formSchema),
    });

    async function onSubmit(values) {
        setPending(true)
        setError('');
        console.log(values.date)
        if (!values.title || !values.location || !values.date || !values.maxPeople || !values.description) {
            setPending(false)
            setError('Please provide all the information.');
            return; // Exit the function if validation fails
        }
        if (values.title.length < 1) {
            console.log(username.length)
            setPending(false)
            setError('Please provide a title.');
            return; // Exit the function if validation fails
        }
        if (values.location.length < 1) {
            setPending(false)
            setError('Please provide the location.');
            return; // Exit the function if validation fails
        }
        if (values.date.length < 1) {
            setPending(false)
            setError('Please provide the date.');
            return; // Exit the function if validation fails
        }
        if (values.maxPeople.length < 1) {
            setPending(false)
            setError('Please provide the maximum amount of people.');
            return; // Exit the function if validation fails
        }
        if (values.description.length < 1) {
            setPending(false)
            setError('Please provide a description.');
            return; // Exit the function if validation fails
        }

        try {
            const response = await axios.post(
                `${API_URL}/create-event`,
                {
                    title: values.title,
                    location: values.location,
                    date: values.date,
                    maxPeople: values.maxPeople,
                    description: values.description,
                    id: userId
                }
            );
            // const response = await axios.post(
            //     `http://localhost:8082/create-event`,
            //     {
            //         "title": "hallowo",
            //         "description": "youri",
            //         "location": "helsinki",
            //         "maxPeople": "70",
            //         "date": "2 august",
            //         "id": "1"
            //     }
            // );
            console.log(response.data);
            addEvent(response.data)
            console.log('Form submitted');
            setOpen(false);
            form.reset({
                title: '',
                location: '',
                date: '',
                maxPeople: null,
                description: ''
            });
            console.log("working")
            router.refresh()
            // router.push('/dashboard');
            // Assuming you have received the JWT token in a variable named `token`
            // document.cookie = `jwtToken=${token}; path=/; max-age=${3600}`; // Set the cookie to expire in 1 hour

        } catch (error) {
            if (error.response) {
                setError(error.response.data);
            } else {
                console.log(error)
                setError('An error occurred while submitting the form:' + error);
            }
        }
        setPending(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    variant={"outline"}
                    className="bg-slate-100 hover:bg-slate-200 hover:text-black group border border-slate-600 h-[190px] items-center justify-center flex flex-col hover:border-slate-100 hover:cursor-pointer border-dashed gap-4"
                >
                    <FilePlus className="h-8 w-8 text-muted-foreground group-hover:text-black" />
                    <p className="font-bold text-xl text-muted-foreground group-hover:text-black">Create new event</p>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-black">Create event</DialogTitle>
                    <DialogDescription className="text-black">Create a new event for us to manage it</DialogDescription>
                </DialogHeader>
                
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input {...field} className="bg-slate-100 text-black"/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="location"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Location</FormLabel>
                                    <FormControl>
                                        <Input {...field} className="bg-slate-100 text-black"/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="date"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Date of the event</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-[240px] pl-3 text-left font-normal",
                                                        !field.value && "text-muted-foreground border-black"
                                                    )}
                                                >
                                                    {field.value ? (
                                                        format(field.value, "PPP")
                                                    ) : (
                                                        <span className="text-black">Pick a date</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50 text-black" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={(date) => field.onChange(date)}
                                                disabled={(date) =>
                                                    date < new Date()
                                                }
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="maxPeople"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Maximum number of people</FormLabel>
                                    <FormControl>
                                        <Input type={'number'} {...field} className="bg-slate-100 text-black"/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea rows={5} {...field} className="bg-slate-100 text-black"/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
                <div className=" text-red-500">
                    {error}
                </div>
                <DialogFooter>
                    <Button onClick={form.handleSubmit(onSubmit)} disabled={form.formState.isSubmitting} className="w-full mt-4 bg-slate-100 text-black border-black border-2">
                        {!form.formState.isSubmitting && <span>Submit</span>}
                        {form.formState.isSubmitting && <Shell className="animate-spin " />}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

    );
}

