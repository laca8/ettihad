import React, { useEffect, useState } from 'react'

import { loginUser } from '../../redux/slicers/userSlice'
import Loader from '../../components/features/Loader'
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch } from '../../redux/store';
import { user } from '../../types/type';

const Login = () => {
    const dispatch = useDispatch<AppDispatch>()
    const userSlice = useSelector((state: { userSlice: { loading: boolean, user: user, error: string, success: boolean } }) => state.userSlice)
    const { loading, error, success } = userSlice
    const [credentials, setCredentials] = useState({
        name: '',
        password: '',
    });

    const handleChange = (e: React.FormEvent) => {
        const { name, value } = e.target as HTMLInputElement;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(loginUser(credentials))

        if (success) {
            window.location.href = '/'
        }
        setCredentials({
            name: '',
            password: ''
        })
    };
    useEffect(() => {
        if (error != null) {
            alert(error)

        }
    }, [error])
    return (
        <div className='min-h-screen  shadow-md rounded-xl w-full mx-auto py-10 mt-10'>
            {
                loading ? <Loader /> : (
                    <div className=" h-1/2 p-8  shadow-md max-w-96 bg-black mx-auto rounded-xl border-2 border-yellow-600">
                        <h1 className="text-2xl font-bold mb-6 text-center text-white">تسجيل الدخول</h1>

                        <form onSubmit={handleSubmit} className='grid grid-cols-1 max-lg:grid-cols-1 justify-center p-4 gap-4 w-full mx-auto'>
                            {/* Username Field */}
                            <div className='flex flex-col gap-2'>
                                <label htmlFor="name" className='font-bold text-zinc-100 bg-yellow-600 p-1 w-32 rounded-xl text-center'>
                                    الاسم
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    value={credentials.name}
                                    onChange={handleChange}
                                    className="p-2 bg-gray-50 rounded-xl w-full max-w-xs shadow-md border-2 border-yellow-600"
                                    required
                                />
                            </div>

                            {/* Password Field */}
                            <div className='flex flex-col gap-2'>
                                <label htmlFor="password" className='font-bold text-zinc-100 bg-yellow-600 p-1 w-32 rounded-xl text-center'>
                                    الرقم السري
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    value={credentials.password}
                                    onChange={handleChange}
                                    className="p-2 bg-gray-50 rounded-xl w-full max-w-xs shadow-md border-2 border-yellow-600"
                                    required
                                />
                            </div>

                            {/* Submit Button */}
                            <div>
                                <button
                                    type="submit"
                                    className="btn hover:bg-green-300 bg-green-800 text-white hover:text-black"
                                >
                                    تسجيل الدخول
                                </button>
                            </div>
                        </form>

                    </div>
                )}
        </div>
    )
}

export default Login