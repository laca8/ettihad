import React, { useEffect, useState } from 'react'
import { prize, objectId } from '../../../types/type';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../redux/store';
import Loader from '../../features/Loader';
import { removePrize, fetchPrizes } from '../../../redux/slicers/prizeSlice';
import { toast } from "react-toastify";
import { Trash2 } from 'lucide-react';
type obj = prize & objectId
type Props = {
    name: string,
    code: string,
    row: obj | null,
    setRow: React.Dispatch<React.SetStateAction<null | obj>>;
}

const Details = ({ row, setRow, name, code }: Props) => {
    const prizeSlice = useSelector((state: { prizeSlice: { loading: boolean, success: boolean, game: prize, error: string, games: obj[] } }) => state.prizeSlice)
    const { loading, error, games, success } = prizeSlice
    const dispatch = useDispatch<AppDispatch>()
    const [notify, setNotify] = useState<number | string>("");
    const handleClick = (id: string): void => {
        setRow(games?.filter((x: obj) => x._id == id)[0])
        console.log(row);
    }

    useEffect(() => {
        const keyword: {
            name: string,
            code: string
        } = {
            name,
            code
        }


        dispatch(fetchPrizes(keyword))
    }, [name, code, dispatch])
    useEffect(() => {
        setNotify(toast.error(error));
    }, [error]);
    const handleDelete = (id: string) => {
        // Add logic to handle delete operation


        const isRemove = window.confirm('هل تريد حذف البيانات؟')
        // Add logic to handle delete operation
        if (isRemove) {
            dispatch(removePrize(id))
            console.log(`Deleting item with id: ${id}`);
        }
        if (success) {
            setNotify(toast.info('تم حذف البيانات'));
        }
    }

    return (
        loading ? <Loader /> : (

            <div className="overflow-x-auto overflow-y-auto  rounded-xl shadow-lg mb-10  h-[500px] ">
                {error && (
                    <div>
                        <span className="invisible">{notify}</span>
                    </div>
                )}
                <table className="table table-md text-white border-2 border-yellow-600 rounded-xl  max-w-[100%]">
                    <thead className='bg-slate-800'>
                        <tr className='text-yellow-600  text-md'>
                            <th>code</th>
                            <th>اسم الجائزة</th>
                            <th>تاريخ الجائزة</th>
                            <th>اللاعب</th>
                            <th>المركز</th>
                            <th>اللعبة</th>
                            <th>المدرب</th>
                            <th>المشرف العام</th>
                            <th>ملاحظات</th>
                            <th>الصورة</th>
                            <th>#</th>
                        </tr>
                    </thead>
                    <tbody className='text-md'>
                        {
                            games?.map((x, i) => (
                                <tr className='text-md hover:bg-zinc-900 ' key={i} onClick={() => handleClick(x._id)}>
                                    <td className='text-md'>{x.code}</td>
                                    <td className='text-md'>{x.name}</td>
                                    <td className='text-md'>{x.date}</td>
                                    <td className='text-md'>{x.player}</td>
                                    <td className='text-md'>{x.position}</td>
                                    <td className='text-md'>{x.game}</td>
                                    <td className='text-md'>{x.coach}</td>
                                    <td className='text-md'>{x.manager}</td>
                                    <td className='text-md'>{x.notes}</td>
                                    <td>
                                        <img src={x.image} className='w-10 h-10' />
                                    </td>
                                    <td className='text-md text-red-500  '>
                                        <Trash2 onClick={() => handleDelete(x._id)} />

                                    </td>

                                </tr>
                            ))
                        }


                    </tbody>

                </table>
            </div>

        )
    )
}

export default Details