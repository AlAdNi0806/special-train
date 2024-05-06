'use client'

import React, { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode';
import axios from 'axios'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Shell } from 'lucide-react';
import Events from '../components/Events'
import SentEvents from '../components/SentEvents'
import Admin from '../components/Admin'
import { cn } from '@/lib/utils';
import { Form, FormProvider, useForm } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';


const API_URL = "http://localhost:8082"

const Page = () => {
    const router = useRouter()
    const [id, setId] = useState('')
    const [userInfo, setUserInfo] = useState()
    const [userEvents, setUserEvents] = useState()
    const [events, setEvents] = useState()

    const [pending, setPending] = useState()

    const [userName, setUsername] = useState()

    const [particularUser, setParticularUser] = useState()

    const form = useForm({
        // resolver: zodResolver(formSchema),
    });

    useEffect(() => {
        const initialize = async () => {
            const jwtToken = await localStorage.getItem('jwtToken');
            console.log("jwtToken: ", jwtToken);
            if (!jwtToken) {
                router.push('/auth/sign-in');
            }

            try {
                // Decode the token
                const decodedToken = jwtDecode(jwtToken);

                // Extract claims from the token
                const subject = decodedToken.sub;
                const issuedAt = decodedToken.iat;
                const expiration = decodedToken.exp;

                setId(subject);
            } catch (error) {
                console.error("Error decoding JWT token: ", error);
                router.push('/auth/sign-in');
            }
        };

        initialize();
    }, []);

    useEffect(() => {
        if (id.length > 0) {
            const getInfo = async () => {
                try {
                    console.log("Id: " + id);
                    const response = await axios.post(
                        `${API_URL}/user-info`,
                        {
                            id: id
                        }
                    );
                    console.log(response);
                    console.log('Form submitted');
                    setUserInfo(response.data)
                    setUserEvents(response.data.events)
                } catch (error) {
                    if (error.response) {
                        console.log(error.response.data);
                    } else {
                        console.log('An error occurred while submitting the form:', error);
                    }
                }
            }
            getInfo()
        }
    }, [id]);

    useEffect(() => {
        if (userInfo) {
            if (userInfo.role === "administrator" || userInfo.role === "worker") {
                const getEvents = async () => {
                    try {
                        const response = await axios.post(
                            `${API_URL}/events`
                        );
                        setEvents(response.data)
                    } catch (error) {
                        if (error.response) {
                            console.log(error.response.data);
                        } else {
                            console.log('An error occurred while submitting the form:', error);
                        }
                    }
                }
                getEvents()
            }
        }
    }, [userInfo])

    const logout = async () => {
        localStorage.setItem('jwtToken', '');
        router.push('/');
    }


    return (
        <div className='w-full h-full dark:bg-background overflow-x-hidden relative'>
            <div className='absolute z-1 rounded-full h-[500px] w-[500px] blur-[90px] bg-thirdly md:ml-[-100px] sm:ml-[-50px]'></div>
            <div className='absolute z-2 rounded-full h-[300px] w-[500px] blur-[90px] bg-fourthly md:mt-[-100px]'></div>
            <div className='absolute z-2 rounded-full h-[300px] w-[500px] blur-[100px] bg-thirdly bottom-0 right-0 mr-[-100px]'></div>
            <div className='w-full h-[100vh] relative px-6 md:px-20 pt-10 pb-48'>
                {userInfo && (
                    <div className='h-full w-full'>
                        <div className='flex justify-end mb-4 mt-[-20px]'>
                            <Button className='' variant={'outline'} onClick={() => logout()}>
                                Log out
                            </Button>
                        </div>
                        <Tabs defaultValue="account" className="w-full h-full">
                            {/* <TabsList className="grid w-full h-20 grid-cols-2 grid-rows-2 md:h-10 md:grid-rows-1 md:grid-cols-3"> */}
                            <TabsList className={cn(
                                { "grid-cols-2": userInfo.role === "worker" },
                                { "grid-cols-1": userInfo.role === "guest", },
                                { "grid-cols-2 md:grid-cols-3 grid-rows-2 md:grid-rows-1": userInfo.role === "administrator", },
                                "grid w-full h-20 md:h-10",
                            )}>
                                <TabsTrigger value="event" className='text-black'>Your events</TabsTrigger>
                                {(userInfo.role === "worker" || userInfo.role === "administrator") && <TabsTrigger className='text-black' value="sentEvents" > Submitted events</TabsTrigger>}
                                {userInfo.role === "administrator" && <TabsTrigger value="admin" className='text-black'>Admin</TabsTrigger>}
                            </TabsList>
                            <TabsContent value="event" className='h-full'>
                                <Events userId={id} events={userEvents ? userEvents : null} setUserEvents={(events) => setUserEvents(events)} />
                            </TabsContent>
                            <TabsContent value="sentEvents">
                                <SentEvents events={events ? events : null} setEvents={(events) => setEvents(events)} />
                            </TabsContent>
                            <TabsContent value="admin">
                                <Admin />
                            </TabsContent>
                        </Tabs>
                    </div>
                )}
            </div>
        </div >
    )
}

export default Page
