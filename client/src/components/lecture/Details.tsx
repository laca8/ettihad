import React, { useEffect, useState } from 'react'
import { objectId, lecture } from '../../types/type';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import Loader from '../../components/features/Loader';
import { fetchLectures, removeLecture } from '../../redux/slicers/lecture'
import { toast } from "react-toastify";
import { Trash2 } from 'lucide-react';
type obj = lecture & objectId

type Props = {
    row: obj | null,
    setRow: React.Dispatch<React.SetStateAction<null | obj>>;
    code: string
}
const Details = ({ row, setRow, code }: Props) => {
    const dispatch = useDispatch<AppDispatch>()
    const [notify, setNotify] = useState<number | string>("");
    const lectureSlice = useSelector((state: { lectureSlice: { loading: boolean, success: boolean, game: lecture, error: string, games: obj[] } }) => state.lectureSlice)
    const { loading, error, games, success } = lectureSlice
    const handleClick = (id: string): void => {
        setRow(games?.filter((x) => x._id == id)[0])
        console.log(row);
    }
    useEffect(() => {
        const keyword: {
            code: string
        } = {
            code
        }
        dispatch(fetchLectures(keyword))
    }, [code, dispatch])
    useEffect(() => {
        setNotify(toast.error(error));
    }, [error]);
    const handleDelete = (id: string) => {
        // Add logic to handle delete operation
        const isRemove = window.confirm('هل تريد حذف البيانات؟')
        // Add logic to handle delete operation
        if (isRemove) {
            dispatch(removeLecture(id))
            console.log(`Deleting item with id: ${id}`);
        }
        if (success) {
            setNotify(toast.info('تم حذف البيانات'));
        }
    }
    return (
        loading ? <Loader /> : (
            <>
                {error && (
                    <div>
                        <span className="invisible">{notify}</span>
                    </div>
                )}

                <div className="overflow-x-auto overflow-y-auto  rounded-xl shadow-lg mb-10  h-[500px]">
                    <table className="table table-md text-white border-2 border-yellow-600 rounded-xl   max-w-[100%]">
                        <thead className='bg-slate-800'>
                            <tr className='text-yellow-600  text-md cursor-pointer'>
                                <th>code</th>
                                <th>رقم المجلس</th>

                                <th>المحاضر</th>

                                <th>#</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                games?.map((x, i) => (
                                    <tr className='hover:bg-zinc-900' key={i} onClick={() => handleClick(x._id)}>
                                        <th className='text-md'>{x.code}</th>
                                        <td className='text-md'>{x.codeBoard}</td>

                                        <div className='text-md grid grid-cols-2'>
                                            {
                                                x.images.map((y, i) => (
                                                    <td key={i}>
                                                        <img src={y} className='w-14 h-14' />
                                                    </td>
                                                ))
                                            }
                                        </div>

                                        <td className='text-md text-red-500  '>
                                            <Trash2 onClick={() => handleDelete(x._id)} />

                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>

                    </table>
                </div>
            </>
        )

    )
}

export default Details