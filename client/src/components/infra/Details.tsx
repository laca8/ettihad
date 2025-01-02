import React, { useEffect, useState } from 'react'
import { infra, objectId } from '../../types/type';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import Loader from '../../components/features/Loader';
import { removeInfra, fetchInfras } from '../../redux/slicers/infraSlicer';
import { toast } from "react-toastify";
import { Trash2 } from 'lucide-react';
type obj = infra & objectId
type Props = {
    name: string,
    code: string,
    row: obj | null,
    setRow: React.Dispatch<React.SetStateAction<null | obj>>;
}

const Details = ({ row, setRow, name, code }: Props) => {
    const infraSlice = useSelector((state: { infraSlice: { loading: boolean, success: boolean, game: infra, error: string, games: obj[] } }) => state.infraSlice)
    const { loading, error, games, success } = infraSlice
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

        dispatch(fetchInfras(keyword))
    }, [name, code, dispatch])
    useEffect(() => {
        setNotify(toast.error(error));
    }, [error]);
    const handleDelete = (id: string) => {
        const isRemove = window.confirm('هل تريد حذف البيانات؟')
        // Add logic to handle delete operation
        if (isRemove) {
            dispatch(removeInfra(id))
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
                            <th>التاريخ</th>
                            <th>الصنف</th>
                            <th>سعر الوحدة</th>
                            <th>المشتري</th>
                            <th>البائع</th>
                            <th>نوع الصنف</th>
                            <th>ملاحظات</th>
                            <th>العدد</th>
                            <th>السعر الاجمالي</th>
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
                                    <td className='text-md'>{x.date}</td>
                                    <td className='text-md'>{x.item}</td>
                                    <td className='text-md'>{x.salary}</td>
                                    <td className='text-md'>{x.buyer}</td>
                                    <td className='text-md'>{x.seller}</td>
                                    <td className='text-md'>{x.itemType}</td>
                                    <td className='text-md'>{x.notes}</td>
                                    <td className='text-md'>{x.num}</td>
                                    <td className='text-md'>{x.total}</td>

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