import React, { useState, useEffect } from 'react'
import { LoaderPinwheel, Volleyball } from 'lucide-react';
import { board, objectId } from '../../types/type';
import { useDispatch, useSelector } from 'react-redux';

import Loader from '../features/Loader';
import { AppDispatch } from '../../redux/store';
import { toast } from "react-toastify";
import { addBoard, editBoard } from '../../redux/slicers/boardSlicer';
type obj = board & objectId
type Props = { row: obj | null }


const Add = ({ row }: Props) => {
    const dispatch = useDispatch<AppDispatch>()
    const [notify, setNotify] = useState<number | string>("");
    const boardSlice = useSelector((state: { boardSlice: { loading: boolean, game: board, error: string, success: boolean, games: board[] } }) => state.boardSlice)
    const { loading, error, success } = boardSlice
    const [id, setId] = useState('')
    const [num, setNum] = useState(0)
    const [members, setMembers] = useState<{ name: string, job: string }[]>([])
    const [from, setFrom] = useState('')
    const [to, setTo] = useState('')
    const [achievement, setAchievement] = useState([''])
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (id === '' || from === '' || to === '' || num === 0) {
            setNotify(toast.error('please fill all fields'));
        }
        const boardData: board = {
            code: Number(id),
            from,
            num,
            to,
            members,
            achievement,
        };
        dispatch(addBoard(boardData));
        setId('')
        setFrom('')
        setTo('')
        setMembers([{ name: '', job: '' }])
        if (success) {
            setNotify(toast.success('تم اضافة البيانات'));
            window.location.reload()
        }


    }
    const handleEdit = () => {

        if (id === '' || from === '' || to === '' || num === 0) {
            setNotify(toast.error('please fill all fields'));
        }
        const boardData = {
            _id: row?._id ? row?._id : '',
            code: Number(id),
            from,
            to,
            members,
            num,
            achievement,

        };
        dispatch(editBoard(boardData));
        setId('')
        setFrom('')
        setTo('')
        setMembers([{ name: '', job: '' }])
        if (success) {
            setNotify(toast.success('تم تحديث البيانات'));
            window.location.reload()
        }

    }



    useEffect(() => {
        setNotify(toast.error(error));
    }, [error]);
    useEffect(() => {
        if (num) {
            setMembers(
                new Array(Number(num ? num : 0)).fill({ name: '', job: '' })
            );
        }


    }, [num]);
    const handleMembersChange = (index: number, laca: string, value: string) => {
        const newArr = [...members];
        newArr[index] = { ...newArr[index], [laca]: value };
        console.log(laca);

        setMembers(newArr);
    };
    const addAcheviement = () => {
        const newArr = [...achievement, ''];
        setAchievement(newArr);
    };
    // const deleteAchievment = () => {
    //     console.log('i')
    //     achievement.splice(0, 1)
    // }
    const handleAchiement = (index: number, value: string) => {
        const newArr = [...achievement];
        newArr[index] = value;
        setAchievement(newArr);
    };
    useEffect(() => {
        if (row) {
            setId(row?.code?.toString())
            setFrom(row.from)
            setTo(row.to)
            setMembers(row.members)
            setAchievement(row.achievement)
            setNum(row.num)
        }
    }, [row, row?.code, row?.members])
    return (
        loading ? <Loader /> : (
            <div >
                {error && (
                    <div>
                        <span className="invisible">{notify}</span>
                    </div>
                )}
                <div className='flex flex-col items-center text-zinc-900 border-2 border-yellow-600 p-2 text-center rounded-xl w-36 m-auto text-xl font-bold mb-4'>
                    <div className="flex gap-8 items-center">
                        <div className="animate-bounce">
                            <LoaderPinwheel className="w-10 h-10 text-yellow-600 shadow-lg" />
                        </div>
                        <h1 className='text-white text-center w-36'>مجالس الأدارات</h1>
                        <div className="animate-bounce">
                            <Volleyball className="w-10 h-10 text-green-500 shadow-lg" />
                        </div>
                    </div>
                </div>
                <form className='w-full ' onSubmit={handleSubmit}>
                    <div className='border-2 border-yellow-600 p-4  shadow-md rounded-xl'>
                        <div className='grid grid-cols-4 max-lg:grid-cols-1 justify-center  w-full gap-4 '>
                            <div className='flex flex-col gap-2'>
                                <label className='font-bold text-zinc-100 bg-yellow-600 p-1 w-32 rounded-xl text-center'>رقم المجلس</label>
                                <input type="text" value={id} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setId(e.target.value)} placeholder="Type here" className="p-2 bg-gray-50 rounded-xl w-full max-w-xs shadow-md border-2 border-yellow-600" />
                            </div>
                            <div className='flex gap-2 flex-col '>
                                <label className='font-bold text-zinc-100 bg-yellow-600 p-1 w-20 rounded-xl text-center'>من</label>
                                <input value={from} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFrom(e.target.value)} type="date" placeholder="Type here" className="p-2 bg-gray-50 rounded-xl  w-full max-w-xs shadow-md border-2 border-yellow-600" />

                            </div>
                            <div className='flex gap-2 flex-col '>
                                <label className='font-bold text-zinc-100 bg-yellow-600 p-1 w-20 rounded-xl text-center'>الي</label>
                                <input value={to} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTo(e.target.value)} type="date" placeholder="Type here" className="p-2 bg-gray-50 rounded-xl w-full max-w-xs shadow-md border-2 border-yellow-600" />

                            </div>

                            <div className='flex gap-2 flex-col '>
                                <label className='font-bold text-zinc-100 bg-yellow-600 p-1 w-32 rounded-xl text-center'>عدد الأعضاء</label>
                                <input value={num} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNum(Number(e.target.value))} type="number" placeholder="Type here" className="p-2 bg-gray-50 rounded-xl w-full max-w-xs shadow-md border-2 border-yellow-600" />
                            </div>
                        </div>

                        <div className='grid grid-cols-2 max-lg:grid-cols-1 justify-center  w-full gap-4 mt-2 mb-2'>
                            {
                                members?.map((x, i) => (
                                    <div key={i} className='flex flex-row  gap-4 w-full '>
                                        <div className='flex gap-2 flex-col w-full '>
                                            <label className='font-bold text-zinc-100 bg-yellow-600 p-1 w-32 rounded-xl text-center'>اسم العضو</label>
                                            <input value={x?.name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleMembersChange(i, 'name', e.target.value)} type="text" placeholder="Type here" className="p-2 bg-gray-50 rounded-xl w-full max-w-xs shadow-md border-2 border-yellow-600" />

                                        </div>
                                        <div className='flex gap-2 flex-col w-full'>
                                            <label className='font-bold text-zinc-100 bg-yellow-600 p-1 w-32 rounded-xl text-center'>وظيفة العضو</label>
                                            <input value={x?.job} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleMembersChange(i, 'job', e.target.value)} type="text" placeholder="Type here" className="p-2 bg-gray-50 rounded-xl w-full max-w-xs shadow-md border-2 border-yellow-600" />

                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        <>
                            <div className='flex gap-2'>
                                <button onClick={addAcheviement} type='button' className='bg-green-500 p-1 shadow-lg rounded-full text-white'>+</button>
                                {/* <button onClick={deleteAchievment} type='button' className='bg-red-500 p-1 shadow-lg rounded-full text-white'>x</button> */}
                            </div>
                            <div className='grid grid-cols-4 w-full gap-4 max-lg:grid-cols-1 justify-center mt-2 mb-2'>
                                {
                                    achievement.map((x, i) => (
                                        <div className='flex gap-2 flex-col '>
                                            <label className='font-bold text-zinc-100 bg-yellow-600 p-1 w-32 rounded-xl text-center'>الانجازات</label>
                                            <input value={x} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleAchiement(i, e.target.value)} type="text" placeholder="Type here" className="p-2 bg-gray-50 rounded-xl w-full max-w-xs shadow-md border-2 border-yellow-600" />
                                        </div>
                                    ))
                                }
                            </div>

                        </>


                        <div className='mt-4'>
                            <button type='submit' className="btn hover:bg-green-300 bg-green-800 text-white hover:text-black">save</button>
                            <button onClick={() => handleEdit()} className="btn hover:bg-green-300 bg-green-800 text-white hover:text-black mr-2">update</button>
                        </div>
                    </div>


                </form >

            </div >
        )
    )
}

export default Add