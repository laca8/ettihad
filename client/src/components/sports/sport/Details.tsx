import React, { useEffect, useState } from 'react'
import { objectId, sport } from '../../../types/type';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../redux/store';
import Loader from '../../features/Loader';
import { fetchGames, removeGame } from '../../../redux/slicers/gameSlicer';
import { toast } from "react-toastify";
import { Trash2 } from 'lucide-react';
type obj = sport & objectId

type Props = {
    row: obj | null,
    setRow: React.Dispatch<React.SetStateAction<null | obj>>;
    name: string,
    code: string
}
const Details = ({ row, setRow, name, code }: Props) => {
    const dispatch = useDispatch<AppDispatch>()
    const [notify, setNotify] = useState<number | string>("");
    const gameSlice = useSelector((state: { gameSlice: { loading: boolean, success: boolean, game: sport, error: string, games: obj[] } }) => state.gameSlice)
    const { loading, error, games, success } = gameSlice
    const handleClick = (id: string): void => {
        setRow(games?.filter((x) => x._id == id)[0])
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
        dispatch(fetchGames(keyword))
    }, [name, code, dispatch])
    useEffect(() => {
        setNotify(toast.error(error));
    }, [error]);
    const handleDelete = (id: string) => {
        // Add logic to handle delete operation


        const isRemove = window.confirm('هل تريد حذف البيانات؟')
        // Add logic to handle delete operation
        if (isRemove) {
            dispatch(removeGame(id))
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
                                <th>اللعبة</th>
                                <th>التاريخ</th>
                                <th>المسئول</th>
                                <th>عدد الملاعب</th>
                                <th>#</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                games?.map((x, i) => (
                                    <tr className='hover:bg-zinc-900' key={i} onClick={() => handleClick(x._id)}>
                                        <th className='text-md'>{x.code}</th>
                                        <td className='text-md'>{x.game}</td>
                                        <td className='text-md'>{x.date}</td>
                                        <td className='text-md'>{x.manager}</td>
                                        <td className='text-md'>{x.nums}</td>
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