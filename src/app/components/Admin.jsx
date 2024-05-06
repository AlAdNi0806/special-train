import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

const API_URL = "http://localhost:8082";

const Admin = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [username, setUsername] = useState('');
    const [role, setRole] = useState(''); // State to hold the selected role
    const [error, setError] = useState()

    useEffect(() => {
        if (userInfo) {
            setRole(userInfo.role); // Set the role based on userInfo when it's available
        }
    }, [userInfo]);

    const getUserInfo = async (username) => {
        setError(null)
        setUserInfo(null)
        try {
            const response = await axios.post(
                `${API_URL}/get-user-info`,
                {
                    username: username
                }
            );
            setUserInfo(response.data);
        } catch (error) {
            setError("User doesn't exist...")
            console.error('An error occurred while fetching user info:', error);
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        getUserInfo(username);
    }

    const handleRoleChange = async (event) => {
        try {
            const response = await axios.post(
                `${API_URL}/update-user-role`,
                {
                    id: userInfo.id,
                    role: event.target.value
                }
            );
            userInfo.role = event.target.value
            setRole(event.target.value)
        } catch (error) {
            console.error('An error occurred while fetching user info:', error);
        }
    }

    return (
        <div className='p-4 md:pd-20 w-full h-full bg-slate-100 rounded overflow-y-scroll z-100 relative'>
            <form onSubmit={handleSubmit}>
                <Label htmlFor="username" className='text-lg mb-2 text-black'>Username:</Label>
                <Input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className='mb-6 text-black bg-slate-100'
                />
                <Button type="submit" className='mb-8 bg-slate-100 border-2 border-black text-black'>Find User</Button>
            </form>
            {error && (
                <div className='text-black text-xl'>
                    {error}
                </div>
            )}
            {userInfo && (
                <div>
                    <h2 className='mb-4 text-black'>User Information:</h2>
                    <pre className='text-black'>{JSON.stringify(userInfo, null, 2)}</pre>
                    <div className='mt-4'>
                        <Label className='text-lg mb-2 text-black'>Role:</Label>
                        <div>
                            <input
                                type="radio"
                                id="guest"
                                name="role"
                                value="guest"
                                checked={role === 'guest'}
                                onChange={(e) => handleRoleChange(e)}
                                className='cursor-pointer'
                            />
                            <Label htmlFor="guest" className='ml-2 cursor-pointer text-black'>Guest</Label>
                        </div>
                        <div>
                            <input
                                type="radio"
                                id="worker"
                                name="role"
                                value="worker"
                                checked={role === 'worker'}
                                onChange={(e) => handleRoleChange(e)}
                                className='cursor-pointer'
                            />
                            <Label htmlFor="worker" className='ml-2 cursor-pointer text-black'>Worker</Label>
                        </div>
                        <div>
                            <input
                                type="radio"
                                id="administrator"
                                name="role"
                                value="administrator"
                                checked={role === 'administrator'}
                                onChange={(e) => handleRoleChange(e)}
                                className='cursor-pointer'
                            />
                            <Label htmlFor="administrator" className='ml-2 cursor-pointer text-black'>Administrator</Label>
                        </div>

                    </div>
                </div>

            )}
            {/* Radio group for selecting role */}

        </div>
    );
}

export default Admin;
