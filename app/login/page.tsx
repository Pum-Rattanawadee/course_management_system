'use client';

import React, { useState } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { useLogin } from './useLogin';

export default function login() {
    const router = useRouter();
    const userLogin = {username: '', password: ''}
    const [login, setLogin] = useState(userLogin)
    const  UserLogin = async (username: string, password: string) =>  {
       const result = await useLogin().login(username, password)
       if(result.statusCode == 200){
         router.replace("/courses")
       }
      
    }
    const updateField = (e: React.ChangeEvent<HTMLInputElement>) => {
        const field = e.target.name
        setLogin({...login, [field]: e.target.value})
    }
    return (
        <div className='container'>
            <div className='row justify-content-md-center'>
                <div className='col-xs-12 col-md-4 border rounded p-5'>
                    <div className='row mb-3'>
                        <label className='form-label'>Username: </label>
                        <input type='text' className='form-control' name='username' onChange={updateField}/>
                    </div>
                    <div className='row mb-3'>
                        <label className='form-label'>Password: </label>
                        <input type='password' className='form-control' name='password' onChange={updateField}/>
                    </div>
                    <div className='row mb-3'>
                        <button 
                            className='btn btn-primary' 
                            onClick={ ()=>UserLogin(login.username, login.password) }
                        >Login</button>
                    </div>
                </div>
            </div>
        </div>
    )
}