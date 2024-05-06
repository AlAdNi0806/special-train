import React, { Suspense, useState } from 'react'
import { CreateEventButton } from './CreateEventButton'
import ShowEventInformation from './ShowEventInformation'
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardDescription, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Info } from 'lucide-react';

const Events = ({ userId, events, setUserEvents }) => {
    const [cEvents, setCEvents] = useState(events)

    const addCEvent = (newEvent) => {
        if (cEvents) {
            setUserEvents(prevEvents => [...prevEvents, newEvent])
            setCEvents(prevEvents => [...prevEvents, newEvent]);
        } else {
            setUserEvents([newEvent])
            setCEvents([newEvent]);
        }
    };

    return (
        <div className='w-full h-full bg-slate-100 rounded overflow-y-scroll shadow-inset-bottom-whitish z-100 relative'>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
                <CreateEventButton
                    addEvent={(newEvent) => addCEvent(newEvent)}
                    userId={userId}
                />

                <Suspense
                    fallback={[1, 2, 3, 4].map((el) => (
                        <Skeleton key={el} />
                    ))}
                >
                    <EventCards events={cEvents} />
                </Suspense>
            </div>
        </div>
    )
}


function EventCards({ events }) {
    console.log(events)
    return (events) && (
        <>
            {events.map((event) => (
                <EventCard key={event.id} event={event} />
            ))}
        </>
    );
}

function EventCard({ event }) {
    return (
        <Card className="bg-white text-white relative overflow-hidden rounded">
            <div className='absolute z-2 rounded-full h-[200px] w-[200px] blur-[30px] bg-thirdly right-0 mr-[-50px] mt-[-50px]'></div>
            <div className='absolute z-3 rounded-full h-[150px] w-[150px] blur-[30px] bg-seventhly right-0 mr-[-60px] mt-4'></div>
            <CardHeader className='flex flex-row justify-between items-center'>
                <div className='relative z-100'>
                    {event.status === "accepted" && <Badge className=" bg-emerald-700 hover:bg-emerald-800 text-white">Accepted</Badge>}
                    {event.status === "rejected" && <Badge variant={"destructive"}>Rejected</Badge>}
                    {event.status === "pending" && <Badge>Pending</Badge>}
                </div>
                {/* <button
                    // onClick={console.log("Infor clicked")}
                    className='relative z-100 cursor-pointer'
                >
                    <Info size={26} />
                </button> */}
                <ShowEventInformation event={event}/>
            </CardHeader>
            <CardDescription>
                <div className='text-black text-3xl ml-6 relative z-100'>
                    {event.title}
                </div>
            </CardDescription>
            <CardFooter>
                <div className='text-black text-md mt-4 mr-16 text-wrap text-ellipsis line-clamp-2 relative z-100'>
                    {event.description}...
                </div>
            </CardFooter>
        </Card>
    )
}

export default Events