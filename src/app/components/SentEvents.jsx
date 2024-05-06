import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { MoreVertical, Shell } from 'lucide-react';
import React, { useState } from 'react'
import axios from 'axios'
import ShowEventInformation from './ShowEventInformation';

const API_URL = "http://localhost:8082"

const SentEvents = ({ events, setEvents }) => {
    const [data, setData] = useState(events);

    const handleDelete = async (id) => {
        try {
            const response = await axios.post(
                `${API_URL}/delete-event`,
                {
                    id: id
                }
            );
            console.log(response);
            setEvents(data.filter(item => item.id !== id))
            setData(data.filter(item => item.id !== id));
        } catch (error) {
            if (error.response) {
                console.log(error.response.data);
            } else {
                console.log('An error occurred while submitting the form:', error);
            }
        }
    };

    const handleUpdateStatus = async (id, newStatus) => {
        try {
            const response = await axios.post(
                `${API_URL}/update-event-status`,
                {
                    id: id,
                    status: newStatus
                }
            );
            console.log(response);
            const updatedData = data.map(event =>
                event.id === id ? { ...event, status: newStatus } : event
            );
            setData(updatedData);
            setEvents(updatedData)
        } catch (error) {
            if (error.response) {
                console.log(error.response.data);
            } else {
                console.log('An error occurred while submitting the form:', error);
            }
        }
    }

    return (
        <div className='p-4 md:pd-20 w-full h-full bg-slate-100 rounded overflow-y-scroll z-100 relative'>
            {events ? (<Table>

                <TableHeader>
                    <TableRow>
                        <TableHead className='text-black'>Title</TableHead>
                        <TableHead className='text-black'>Status</TableHead>
                        <TableHead className='text-black'>Max People</TableHead>
                        <TableHead className='text-black'>Actions</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {data.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell className='text-black'>{item.title}</TableCell>
                            <TableCell className='text-black'>{item.status}</TableCell>
                            <TableCell className='text-black'>{item.maxPeople}</TableCell>
                            <TableCell className='flex justify-center'>
                                {item.status === 'pending' && (
                                    <>
                                        <div className='flex flex-row gap-4'>
                                            <Button
                                                className='bg-emerald-600  text-white rounded hover:bg-emerald-800'
                                                onClick={() => handleUpdateStatus(item.id, "accepted")}
                                            >
                                                Accept
                                            </Button>
                                            <Button
                                                className='bg-red-600  text-white rounded hover:bg-red-800'
                                                onClick={() => handleUpdateStatus(item.id, "rejected")}
                                            >
                                                Reject
                                            </Button>
                                        </div>
                                    </>
                                )}
                                {item.status === 'accepted' && (
                                    <>
                                        <Button className='border-2 bg-emerald-900 border-emerald-700 text-emerald-500 rounded hover:bg-emerald-900 cursor-default'>Accepted</Button>
                                    </>
                                )}
                                {item.status === 'rejected' && (
                                    <>
                                        <Button className='border-2 bg-red-900 border-red-700 text-red-500 rounded hover:bg-red-900 cursor-default'>Rejected</Button>
                                    </>
                                )}
                            </TableCell>
                            <TableCell >
                                <DropdownMenu>
                                    <DropdownMenuTrigger>
                                        <Button variant="ghost" className="h-8 w-8 p-0 rounded-xl">
                                            <span className="sr-only">Open menu</span>
                                            <MoreVertical className="h-4 w-4 text-black" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuItem className='cursonr-pointer' onSelect={() => handleDelete(item.id)}>Delete</DropdownMenuItem>
                                        <DropdownMenuItem onSelect={(e) => {
                                            e.preventDefault()
                                            e.stopPropagation(); // Stop event propagation
                                            console.log('Delete');
                                        }}>
                                            <ShowEventInformation event={item} fromEvent={true} />
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            ) : (
                <div className='flex justify-center items-center'>
                    <Shell size={26} className=' animate-spin' />
                </div>
            )}
        </div>
    )
}

export default SentEvents