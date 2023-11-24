"use client";
import Link from 'next/link';
import {useEffect, useState} from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';



export default function LoginPage () {
    const router = useRouter();
    const [loading , setLoading] = useState(false);
    const [buttonDisabled , setButtonDisabled] = useState(false)
    const [user , setUser] = useState({
        email : "",
        password : "" ,
    })

    const onLogin = async () => {
    try {
        setLoading(true);
        const response = await axios.post('/api/users/login' , user)
        console.log('login Successfully')
        router.push('/profile');
    } catch (error) {
        console.log('Login Failed' , error.message)
    }finally {
        setLoading(false)
    }
    }

    
    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0 ){
            setButtonDisabled(false)
        }else {
            setButtonDisabled(true);
        }
    } , [user]) // dont forget


    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className='my-4'>Login</h1>
            <hr />

            <label htmlFor='email'>Email</label>
            <input  id='email' type='email' value={user.email} onChange={(e) => setUser({...user , email : e.target.value})} required placeholder='email' className=' text-slate-800 py-2 px-5 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600' />

            <label htmlFor='password'>password</label>
            <input  id='password' type='password' value={user.password} onChange={(e) => setUser({...user , password : e.target.value})} required placeholder='password' className=' text-slate-800 py-2 px-5 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600' />

            <button className='py-2 px-5 bg-slate-800 text-slate-100/90 rounded-lg my-5' onClick={onLogin}>{loading ? 'loading...' : 'Login'}</button>

            <Link href='/signup'>visit signup</Link>

        </div>
    )
}