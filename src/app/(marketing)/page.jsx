'use client'

import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React, { useState } from 'react'
import main from '../../assets/main.jpg'
import { CalendarCheck, ListMusic, Shield, SmilePlus, Ticket } from 'lucide-react'
import Link from 'next/link'
import { useEffect } from 'react'
import { jwtDecode } from 'jwt-decode';

const page = () => {
  const [id, setId] = useState()

  useEffect(() => {
    const initialize = async () => {
      const jwtToken = await localStorage.getItem('jwtToken');
      console.log("jwtToken: ", jwtToken);
      // setId(subject);
      if (!jwtToken) {
        return;
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
      }
    };

    initialize();
  }, []);
  return (
    <div className='w-full h-full dark:bg-background overflow-x-hidden relative'>
      <div className='absolute z-1 rounded-full h-[500px] w-[500px] blur-[90px] bg-thirdly md:ml-[-100px] sm:ml-[-50px]'></div>
      <div className='absolute z-2 rounded-full h-[300px] w-[500px] blur-[90px] bg-fourthly md:mt-[-100px]'></div>
      <div className='absolute z-2 rounded-full h-[300px] w-[500px] blur-[100px] bg-thirdly bottom-0 right-0 mr-[-100px]'></div>
      <div className='w-full h-[100vh] relative'> {/* Ensure this container is positioned */}
        <div className=' z-100 flex flex-col md:flex-row gap-10 px-6 md:px-20 py-16 justify-between'> {/* Add 'absolute' positioning */}
          <div className='text-4xl text-white'>
            EVENTIO
          </div>
          <div className='flex gap-8'>
            {!id ? (
              <div className='flex gap-8'>
                <Link href={`/auth/sign-up`}>
                  <Button variant={'ghost'} className='text-lg' >
                    Register
                  </Button>
                </Link>
                <Link href={`/auth/sign-in`}>
                  <Button variant={'outline'} className='text-lg'>
                    Login
                  </Button>
                </Link>
              </div>
            ) : (
              <Link href={`/dashboard`}>
                <Button variant={'outline'} className='text-lg'>
                  Dashboard
                </Button>
              </Link>
            )}
          </div>
        </div>
        <div className='px-6 md:px-20 py-14 flex flex-col md:flex-row justify-between gap-10'>
          <div className='flex flex-col'>
            <div className='text-6xl text-white mb-6 font-bold tracking-wide'>
              Choose Once.
            </div>
            <div className='text-6xl text-white mb-12 font-bold tracking-wide'>
              Never Regret.
            </div>
            <div className='text-md text-white mb-10 max-w-[500px]'>
              Have the correct people back you up for your events, and expand your business without hinders.
            </div>
            <Link href={id ? `/dashboard` :`/auth/sign-up`}>
              <Button variant={'callToAction'} className='px-4 text-lg w-[200px] py-6'>
                Get Started
              </Button>
            </Link>
          </div>
          <Image
            src={main}
            alt='image'
          />
        </div>
      </div>
      <div className='bg-sixthly relative px-6 py-16 md:px-20'>
        <div>
          <div className='text-white text-xl tracking-widest font-semibold mb-10'>
            What you get
          </div>
          <div className=' max-w-[600px] mb-14'>
            You get the best team of organisers baking the schedule up for you, so you can relax and gather the people you want to enjoy your time with
          </div>
        </div>
        <div className='flex flex-row justify-between flex-wrap gap-10'>
          <div className=' hover:bg-fivthly p-2 rounded'>
            <SmilePlus size={30} />
          </div>
          <div className=' hover:bg-fivthly p-2 rounded'>
            <CalendarCheck size={30} />
          </div>
          <div className=' hover:bg-fivthly p-2 rounded'>
            <Shield size={30} />
          </div>
          <div className=' hover:bg-fivthly p-2 rounded'>
            <Ticket size={30} />
          </div>
          <div className=' hover:bg-fivthly p-2 rounded'>
            <ListMusic size={30} />
          </div>

        </div>
      </div>
    </div >
  )
}

export default page