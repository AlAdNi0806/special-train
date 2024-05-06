import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Info } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { format } from 'date-fns';

const ShowEventInformation = ({ event, fromEvent }) => {

    const [date, setDate] = useState(event.date)

    useEffect(() => {
        const currDate = new Date(event.date);
        setDate(format(currDate, 'yyyy-MM-dd'));
    }, [event])
    return (
        <Dialog>
            <DialogTrigger asChild>
                {!fromEvent ? (<Button

                    className="relative z-100 cursor-pointer bg-transparent hover:bg-transparent"
                >

                    <Info size={26} className='text-white' />
                </Button>
                ) : (
                    <div className='cursor-pointer w-full'>
                        Info
                    </div>
                )}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Event information</DialogTitle>
                    <DialogDescription>We see this information as well, we are looking at it</DialogDescription>
                </DialogHeader>

                <DialogFooter className='flex flex-col gap-4'>
                    <div className='flex flex-col'>
                        <div className='text-2xl tracking-wider font-bold'>
                            Title:
                        </div>
                        <div className='text-lg'>
                            {event.title}
                        </div>
                    </div>
                    <div className='flex flex-col'>
                        <div className='text-2xl tracking-wider font-bold'>
                            Location:
                        </div>
                        <div className='text-lg'>
                            {event.location}
                        </div>
                    </div>
                    <div className='flex flex-col'>
                        <div className='text-2xl tracking-wider font-bold'>
                            Date:
                        </div>
                        <div className='text-lg'>
                            {date}
                        </div>
                    </div>
                    <div className='flex flex-col'>
                        <div className='text-2xl tracking-wider font-bold'>
                            Maximum amount of people:
                        </div>
                        <div className='text-lg'>
                            {event.maxPeople}
                        </div>
                    </div>
                    <div className='flex flex-col'>
                        <div className='text-2xl tracking-wider font-bold'>
                            Description:
                        </div>
                        <div className='text-lg'>
                            {event.description}
                        </div>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default ShowEventInformation