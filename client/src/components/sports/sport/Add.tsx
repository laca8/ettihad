import React, { useState, useEffect } from 'react'
import { LoaderPinwheel, Volleyball } from 'lucide-react';
import { objectId, sport } from '../../../types/type';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../redux/store';
import Loader from '../../features/Loader';
import { addGame, editGame } from '../../../redux/slicers/gameSlicer';
import { toast } from "react-toastify";
type obj = sport & objectId
type Props = { row: obj | null }
type stad = {
    stadium: string
}
const Add = ({ row }: Props) => {
    const dispatch = useDispatch<AppDispatch>()
    const [notify, setNotify] = useState<number | string>("");
    const gameSlice = useSelector((state: { gameSlice: { loading: boolean, game: sport, error: string, success: boolean, games: sport[] } }) => state.gameSlice)
    const { loading, error, success } = gameSlice
    const [id, setId] = useState('')
    const [game, setGame] = useState('')
    const [date, setDate] = useState('')
    const [manager, setManager] = useState('')
    const [numStadium, setNumStadium] = useState<number>(0)
    const [arrLevels, setArrLevels] = useState<stad[] | []>([])
    useEffect(() => {
        if (numStadium) {
            setArrLevels(
                new Array(Number(numStadium ? numStadium : 0)).fill({ stadium: '' })
            );
        }
        console.log(arrLevels);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [numStadium]);
    const handleLevelChange = (index: number, value: string) => {
        const newArrLevels = [...arrLevels];
        newArrLevels[index] = { ...newArrLevels[index], stadium: value };
        setArrLevels(newArrLevels);
    };
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (id === '' || game === '' || date === '' || manager === '' || arrLevels.length === 0) {
            setNotify(toast.error('please fill all fields'));
        }
        const data = {
            code: Number(id),
            game,
            date,
            manager,
            nums: Number(numStadium),
            stadiums: arrLevels.map(level => ({ stadium: level.stadium }))
        }
        console.log(data);

        if (data) {
            dispatch(addGame(data));
            setId('')
            setDate('')
            setManager('')
            setGame('')
            setNumStadium(0)
            setArrLevels([])
        }
        if (success) {
            setNotify(toast.success('تم اضافة البيانات'));
            window.location.reload()

        }
    }

    useEffect(() => {
        if (row) {
            setId(row?.code?.toString())
            setGame(row.game)
            setDate(row.date)
            setManager(row.manager)
            setNumStadium(row.nums)
            setArrLevels(row.stadiums)
        }

    }, [row, id])
    useEffect(() => {
        setNotify(toast.error(error));
    }, [error]);

    const handleEdit = () => {
        if (id === '' || game === '' || date === '' || manager === '' || arrLevels.length === 0) {
            setNotify(toast.error('please fill all fields'));
        }
        const data = {
            _id: row?._id ? row?._id : '',
            code: Number(id),
            game,
            date,
            manager,
            nums: Number(numStadium),
            stadiums: arrLevels.map(level => ({ stadium: level.stadium }))
        }
        if (data) {
            dispatch(editGame(data));
            setId('')
            setDate('')
            setManager('')
            setGame('')
            setNumStadium(0)
            setArrLevels([])
        }
        if (success) {
            setNotify(toast.success('تم تحديث البيانات'));
            window.location.reload()

        }
    }
    return (
        loading ? (
            <Loader />
        ) : (
            <div>
                {error && (
                    <div>
                        <span className="invisible">{notify}</span>
                    </div>
                )}
                <div className='flex flex-col items-center text-zinc-900 border-2 border-yellow-600 p-2 text-center rounded-xl w-32 m-auto text-xl font-bold mb-4'>
                    <div className="flex gap-8 items-center">
                        <div className="animate-bounce">
                            <LoaderPinwheel className="w-10 h-10 text-yellow-600 shadow-lg" />
                        </div>
                        <h1 className='text-white text-center w-32'>الالعاب</h1>
                        <div className="animate-bounce">
                            <Volleyball className="w-10 h-10 text-green-500 shadow-lg" />
                        </div>
                    </div>
                </div>
                <form className='w-full ' onSubmit={handleSubmit}>
                    <div className='border-2 border-yellow-600 p-4  shadow-md rounded-xl'>

                        <div className='grid grid-cols-4 max-lg:grid-cols-1 justify-center items-center w-full gap-4 '>

                            <div className='flex flex-col gap-2'>
                                <label className='font-bold text-zinc-100 bg-yellow-600 p-1 w-14 rounded-xl text-center'>code</label>
                                <input type="text" value={id} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setId(e.target.value)} placeholder="Type here" className="p-2 bg-gray-50 rounded-xl w-full max-w-xs shadow-md border-2 border-yellow-600" />
                            </div>
                            <div className='flex gap-2 flex-col '>
                                <label className='font-bold text-zinc-100 bg-yellow-600 p-1 w-20 rounded-xl text-center'>اللعبة</label>
                                <input value={game} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setGame(e.target.value)} type="text" placeholder="Type here" className="p-2 bg-gray-50 rounded-xl  w-full max-w-xs shadow-md border-2 border-yellow-600" />
                            </div>
                            <div className='flex gap-2 flex-col '>
                                <label className='font-bold text-zinc-100 bg-yellow-600 p-1 w-20 rounded-xl text-center'>التاريخ</label>
                                <input value={date} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDate(e.target.value)} type="date" placeholder="Type here" className="p-2 bg-gray-50 rounded-xl w-full max-w-xs shadow-md border-2 border-yellow-600" />

                            </div>
                            <div className='flex gap-2 flex-col '>
                                <label className='font-bold text-zinc-100 bg-yellow-600 p-1 w-20 rounded-xl text-center'>المسئول</label>
                                <input value={manager} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setManager(e.target.value)} type="text" placeholder="Type here" className="p-2 bg-gray-50 rounded-xl w-full max-w-xs shadow-md border-2 border-yellow-600" />

                            </div>
                            <div className='flex gap-2 flex-col' >
                                <label className='font-bold text-zinc-100 bg-yellow-600 p-1 w-52 rounded-xl text-center'>عدد الملاعب</label>
                                <input type="number" placeholder="Type here" className="p-2 bg-gray-50 rounded-xl w-full max-w-xs shadow-md border-2 border-yellow-600" value={numStadium} onChange={(e) => setNumStadium(Number(e.target.value))} />

                            </div>
                            {
                                arrLevels?.map((x, i) => (
                                    <div className='flex gap-2 flex-col' key={i}>
                                        <label className='font-bold text-zinc-100 bg-yellow-600 p-1 w-24 rounded-xl text-center'>ملعب {i + 1}</label>
                                        <input type="text" placeholder="Type here" className="p-2 bg-gray-50 rounded-xl w-full max-w-xs shadow-md border-2 border-yellow-600"
                                            value={x?.stadium}
                                            onChange={(e) => handleLevelChange(i, e.target.value)}
                                        />
                                    </div>
                                ))
                            }

                        </div>
                        <div className='mt-4'>
                            <button type='submit' className="btn hover:bg-green-300 bg-green-800 text-white hover:text-black">save</button>
                            <button className="btn hover:bg-green-300 bg-green-800 text-white hover:text-black mr-2" onClick={() => handleEdit()} >update</button>
                        </div>
                    </div>


                </form >

            </div >
        )

    )
}

export default Add