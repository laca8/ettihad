import React, { useEffect, useState } from 'react'
import { coach, objectId } from '../../../types/type';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../redux/store';
import Loader from '../../features/Loader';
import { removeCoach, fetchCoaches } from '../../../redux/slicers/coachSlicer';
import { toast } from "react-toastify";
import { Trash2 } from 'lucide-react';
type obj = coach & objectId
type Props = {
    name: string,
    code: string,
    row: obj | null,
    setRow: React.Dispatch<React.SetStateAction<null | obj>>;
}

const Details = ({ row, setRow, name, code }: Props) => {
    const coachSlice = useSelector((state: { coachSlice: { loading: boolean, success: true, game: coach, error: string, games: obj[] } }) => state.coachSlice)
    const { loading, error, games, success } = coachSlice
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
        console.log(games);

        dispatch(fetchCoaches(keyword))
    }, [name, code, dispatch])
    useEffect(() => {
        setNotify(toast.error(error));
    }, [error]);
    const handleDelete = (id: string) => {
        // Add logic to handle delete operation

        const isRemove = window.confirm('هل تريد حذف البيانات؟')
        // Add logic to handle delete operation
        if (isRemove) {
            dispatch(removeCoach(id))
            console.log(`Deleting item with id: ${id}`);
        }
        if (success) {
            setNotify(toast.info('تم حذف البيانات'));
        }
    }

    return (

        loading ? <Loader /> : (
            <div className="overflow-x-auto overflow-y-auto  rounded-xl shadow-lg mb-10  h-[500px]">
                {error && (
                    <div>
                        <span className="invisible">{notify}</span>
                    </div>
                )}
                <table className="table table-md text-white border-2 border-yellow-600 rounded-xl   max-w-[100%]">
                    <thead className='bg-slate-800'>
                        <tr className='text-yellow-600  text-md'>
                            <th>code</th>
                            <th>الاسم</th>
                            <th>اللعبة</th>
                            <th>النوع</th>
                            <th>الرقم القومي</th>
                            <th>العنوان</th>
                            <th>اتصال 1</th>
                            <th>اتصال 2</th>
                            <th>المسمي</th>
                            <th>الراتب</th>
                            <th>مقدم التعاقد</th>
                            <th>تاريخ التعاقد</th>
                            <th>الخبرات</th>
                            <th>الجوائز</th>
                            <th>التعاقدات</th>
                            <th>الصورة</th>
                            <th>#</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            games?.map((x, i) => (
                                <tr className='hover:bg-zinc-900' key={i} onClick={() => handleClick(x._id)}>
                                    <th className='text-md'>{x.code}</th>
                                    <td className='text-md'>{x.name}</td>
                                    <td className='text-md'>{x.game}</td>
                                    <td className='text-md'>{x.sex}</td>

                                    <td className='text-md'>{x.national_Id}</td>
                                    <td className='text-md'>{x.address}</td>
                                    <td className='text-md'>{x.phone1}</td>
                                    <td className='text-md'>{x.phone2}</td>
                                    <td className='text-md'>{x.named}</td>
                                    <td className='text-md'>{x.salary}</td>
                                    <td className='text-md'>{x.contract_value}</td>
                                    <td className='text-md'>{x.contract_date}</td>
                                    <td className='text-md'>{x.experiance}</td>
                                    <td className='text-md'>{x.rewards}</td>
                                    <td className='text-md'>{x.contracts}</td>
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