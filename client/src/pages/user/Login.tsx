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

    };
    useEffect(() => {
        if (error != null) {
            alert(error)

        }
    }, [error])
    return (
        <div className="min-h-screen  flex mt-10  justify-center">

            <div className="bg-gray-100 h-1/2 p-8  shadow-md w-full max-w-md rounded-xl">
                <h1 className="text-2xl font-bold mb-6 text-center">تسجيل الدخول</h1>
                {
                    loading ? <Loader /> : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Username Field */}
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    الاسم
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    value={credentials.name}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            </div>

                            {/* Password Field */}
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    الرقم السري
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    value={credentials.password}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            </div>

                            {/* Submit Button */}
                            <div>
                                <button
                                    type="submit"
                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    تسجيل الدخول
                                </button>
                            </div>
                        </form>
                    )
                }
            </div>
        </div>
    )
}

export default Login