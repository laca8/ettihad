import { Trash2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../../components/features/Loader';
import { user, objectId } from '../../types/type';
import { AppDispatch } from '../../redux/store';

import { registerUser, removeUser, fetchUsers } from '../../redux/slicers/userSlice'
type obj = user & objectId
const AdminPage = () => {
    const dispatch = useDispatch<AppDispatch>()
    const userSlice = useSelector((state: { userSlice: { loading: boolean, user: user, error: string, success: boolean, users: obj[] } }) => state.userSlice)
    const { loading, error, users } = userSlice
    const [user, setUser] = useState({
        name: '',
        password: '',
        permission: '', // Default role
        isAdmin: false
    });
    const per = ['الرياضات', 'المحاضر', 'المراسلات', 'الموظفين', 'مجالس الادارات', 'الأعضاء', 'المشتريات', 'الرعاة']
    const handleChange = (e: React.ChangeEvent) => {
        const { name, value } = e.target as HTMLInputElement;
        setUser({ ...user, [name]: value });
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (user.permission == '') {
                alert('يجب ادخال نوع التحكم');

            }
            console.log(user);

            dispatch(registerUser(user))
            alert('User added successfully!');
            setUser({ name: '', password: '', permission: '', isAdmin: false }); // Reset form
        } catch (error) {
            console.error('Error adding user:', error);
            alert('An error occurred. Please try again.');
        }
    };
    useEffect(() => {
        dispatch(fetchUsers())
    }, [])
    const handleDelete = (id: string) => {
        // Add logic to handle delete operation
        const isRemove = window.confirm('هل تريد حذف البيانات؟')
        // Add logic to handle delete operation
        if (isRemove) {
            dispatch(removeUser(id))
            console.log(`Deleting item with id: ${id}`);
        }

    }
    return (

        <div className="min-h-screen grid grid-cols-3 gap-4 max-md:grid-cols-1 max-md:gap-4 items-start mx-auto py-8 px-4 sm:px-6 lg:px-8">
            {loading && <Loader />}
            {error && <p className='text-red-500 bg-gray-100 p-4'>{error}</p>}
            <div className="w-full  rounded-lg shadow-md col-span-1">
                <h1 className="text-2xl font-bold mb-6 text-center  text-white">أضافة مستخدم</h1>
                <form onSubmit={handleSubmit} className="space-y-6 border-2 border-yellow-500 p-4">
                    {/* Name Field */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-white">
                            الاسم
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={user.name}
                            onChange={handleChange}
                            placeholder="Type here" className="p-2 bg-gray-50 rounded-xl w-full max-w-xs shadow-md border-2 border-yellow-600"
                            required
                        />
                    </div>


                    {/* Password Field */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-white">
                            الرقم السري
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={user.password}
                            onChange={handleChange}
                            placeholder="Type here" className="p-2 bg-gray-50 rounded-xl w-full max-w-xs shadow-md border-2 border-yellow-600"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-white">
                            نوع التحكم
                        </label>
                        <select value={user.permission} onChange={handleChange}
                            className="p-2 bg-gray-50 rounded-xl w-full max-w-xs shadow-md border-2 border-yellow-600" name='permission'>
                            <option value="" disabled>Select</option>
                            {
                                per?.map((x, i) => (
                                    <option value={x} key={i}>{x}</option>

                                ))
                            }
                        </select>
                    </div>
                    {/* Submit Button */}
                    <div>
                        <button type='submit' className="btn hover:bg-green-300 bg-green-800 text-white hover:text-black">save</button>
                    </div>
                </form>
            </div>
            <div className="w-full overflow-x-auto overflow-y-auto  rounded-xl shadow-lg mt-14 col-span-2">
                <table className="table table-md text-white border-2 border-yellow-600 rounded-xl   max-w-[100%]">
                    <thead className='bg-slate-800'>
                        <tr className='text-yellow-600  text-md cursor-pointer'>
                            <th>الاسم</th>
                            <th>ادمن</th>
                            <th>التحكم</th>
                            <th>#</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users?.map((x, i) => (
                                <tr className='hover:bg-zinc-900' key={i} >
                                    <th className='text-md'>{x.name}</th>
                                    <td className='text-md'>{x.isAdmin ? 'true' : 'false'}</td>
                                    <td className='text-md'>{x.permission}</td>
                                    <td className='text-md text-red-500 '>
                                        <Trash2 onClick={() => handleDelete(x._id)} />
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default AdminPage;