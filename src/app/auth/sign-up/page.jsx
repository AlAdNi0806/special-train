'use client'

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label';
import React, { useState } from 'react'
import axios from 'axios'
import { Shell } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';


const API_URL = "http://localhost:8082"

const page = () => {
    const router = useRouter()
    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [pending, setPending] = useState(false)
    const [error, setError] = useState('')

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission
        setPending(true)
        setError(''); // Reset error state
    
        // Validation checks
        if (fullName.length < 3) {
            setPending(false)
            setError('Full name must be at least 3 characters long.');
            return; // Exit the function if validation fails
        }
        if (username.length < 3) {
            setPending(false)
            setError('Username must be at least 3 characters long.');
            return; // Exit the function if validation fails
        }
        if (password.length < 5) {
            setPending(false)
            setError('Password must be at least 5 characters long.');
            return; // Exit the function if validation fails
        }
    
        try {
            const response = await axios.post(
                `${API_URL}/register`,
                {
                    fullName: fullName,
                    username: username,
                    password: password
                }
            );
            console.log(response);
            console.log('Form submitted');
            localStorage.setItem('jwtToken', response.data);
            // Assuming you have received the JWT token in a variable named `token`
            // document.cookie = `jwtToken=${token}; path=/; max-age=${3600}`; // Set the cookie to expire in 1 hour
            router.push('/dashboard'); // Replace '/dashboard' with your desired path
        } catch (error) {
            if (error.response) {
                setError(error.response.data);
            } else {
                setError('An error occurred while submitting the form:', error);
            }
        }
        setPending(false)
    }
    

    return (
        <div className='w-full h-full dark:bg-background overflow-x-hidden relative'>
            <div className='absolute z-1 rounded-full h-[500px] w-[500px] blur-[90px] bg-thirdly md:ml-[-100px] sm:ml-[-50px]'></div>
            <div className='absolute z-2 rounded-full h-[300px] w-[500px] blur-[90px] bg-fourthly md:mt-[-100px]'></div>
            <div className='absolute z-2 rounded-full h-[300px] w-[500px] blur-[100px] bg-thirdly bottom-0 right-0 mr-[-100px]'></div>
            <div className='w-full h-[100vh] flex justify-center items-center relative'>
                <div className=' border-fivthly px-10 py-6 rounded-xl '>
                    <div className='mb-10 text-3xl text-center font-bold tracking-wider'>
                        Register
                    </div>
                    <form
                        onSubmit={handleSubmit}
                        className='flex flex-col justify-center '
                    >
                        <Label htmlFor='fullName' className=' text-start mb-2'>
                            Full name
                        </Label>
                        <input
                            id='fullName'
                            type="text"
                            name="fullName"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="Full Name"
                            className="mb-6 w-full bg-thirdly px-4 py-2 text-white placeholder-pink-200 rounded-xl"
                        />
                        <Label htmlFor='username' className=' text-start mb-2'>
                            Username
                        </Label>
                        <input
                            id='username'
                            type="text"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Username"
                            className="mb-6 w-full bg-thirdly px-4 py-2 text-white placeholder-pink-200 rounded-xl"
                        />
                        <Label htmlFor='password' className=' text-start mb-2'>
                            Password
                        </Label>
                        <input
                            id='password'
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            className="w-full mb-2 bg-thirdly px-4 py-2 text-white placeholder-pink-200 rounded-xl"
                        />
                        <div className='text-md text-red-950 md:text-red-500 mb-10 flex flex-wrap max-w-52'>
                            {error}
                        </div>
                        <Button disabled={pending} variant={'outline'} type="submit" className=" hover:bg-transparent mb-2">
                            {pending ? (
                                <Shell className="animate-spin" />
                            ) : 'Submit'}
                        </Button>
                        <Link href={'/auth/sign-in'}>
                            <Button variant={'link'}>
                                Already have an account? Login
                            </Button>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default page