import React, { useState, useEffect } from 'react'
import { LoaderPinwheel, Volleyball } from 'lucide-react';
import { prize, objectId, sport, player } from '../../../types/type';
import { useDispatch, useSelector } from 'react-redux';

import Loader from '../../features/Loader';
import { AppDispatch } from '../../../redux/store';
import { toast } from "react-toastify";
import { addPrize, editPrize } from '../../../redux/slicers/prizeSlice';
type obj = prize & objectId
type objGame = sport & objectId
type objPlayer = player & objectId

type Props = { row: obj | null }
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import config from '../../../config';
import { fetchGames } from '../../../redux/slicers/gameSlicer';
import { fetchPlayers } from '../../../redux/slicers/playerSlicer';
// Initialize Firebase (replace with your config)
const firebaseConfig = {
    apiKey: config.apiKey,
    authDomain: config.authDomain,
    projectId: config.projectId,
    storageBucket: config.storageBucket,
    messagingSenderId: config.messagingSenderId,
    appId: config.appId,
    measurementId: config.measurementId
};
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const Add = ({ row }: Props) => {
    const dispatch = useDispatch<AppDispatch>()
    const [notify, setNotify] = useState<number | string>("");
    const prizeSlice = useSelector((state: { prizeSlice: { loading: boolean, game: prize, error: string, success: boolean, games: prize[] } }) => state.prizeSlice)
    const { loading, error, success } = prizeSlice
    const [id, setId] = useState('')
    const [name, setName] = useState('')
    const [game, setGame] = useState('')
    const [date, setDate] = useState('')
    const [manager, setManager] = useState('')
    const [player, setPlayer] = useState('')
    const [position, setPosition] = useState('')
    const [coach, setCoach] = useState('')
    const [notes, setNotes] = useState('')
    const [image, setImage] = useState('')
    const handleChange = async (e: React.ChangeEvent<HTMLInputElement | null>) => {
        console.log(config);

        const file = e.target.files ? e.target.files[0] : null;
        const allowedTypes = ["image/jpeg", "image/png", "images/jpg"];
        const maxSize = 0.5 * 1024 * 1024; // 5MB in bytes
        if (!file) return;

        // Validate file type
        if (!allowedTypes.includes(file.type)) {
            alert("Invalid file type. Please upload a JPEG, PNG, JPG.");
            return;
        }
        // Validate file size
        if (file.size > maxSize) {
            alert("File is too large. Maximum size is 1MB.");
            return;
        }
        // Create preview
        const reader = new FileReader();
        // reader.onloadend = () => {
        //   setImage(reader.result);
        // };
        reader.readAsDataURL(file);

        // Upload to Firebase
        try {


            const filename = `${Date.now()}-${file.name}`;
            const storageRef = ref(storage, `images/${filename}`);

            const snapshot = await uploadBytes(storageRef, file);
            const downloadURL = await getDownloadURL(snapshot.ref);

            setImage(downloadURL);

        } catch (error) {
            console.error('Upload failed:', error);

        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (id === '' || game === '' || name === '' || date === '' || manager === '' || player === '' || position === '' || coach === '' || notes === '') {
            setNotify(toast.error('please fill all fields'));
        }
        console.log(image);

        const formData = new FormData();
        formData.append("code", id);
        formData.append("name", name);
        formData.append("game", game);
        formData.append("player", player);
        formData.append("coach", coach);
        formData.append("date", date);
        formData.append("manager", manager);
        formData.append("position", position);
        formData.append("notes", notes);
        formData.append("image", image);
        const prizeData: prize = {
            code: Number(id),
            name: name,
            game: game,
            player,
            coach,
            manager,
            date,
            position,
            notes,
            image: image
        };
        dispatch(addPrize(prizeData));
        setId('')
        setName('')
        setCoach('')
        setGame('')
        setPlayer('')
        setDate('')
        setManager('')
        setPosition('')
        setNotes('')
        setImage('')
        if (success) {
            setNotify(toast.success('تم اضافة البيانات'));
            window.location.reload()

        }


    }
    const handleEdit = () => {
        if (id === '' || game === '' || name === '' || date === '' || manager === '' || player === '' || position === '' || coach === '' || notes === '') {
            setNotify(toast.error('please fill all fields'));
        }
        console.log(image);

        const formData = new FormData();
        formData.append("code", id);
        formData.append("name", name);
        formData.append("game", game);
        formData.append("player", player);
        formData.append("coach", coach);
        formData.append("date", date);
        formData.append("manager", manager);
        formData.append("position", position);
        formData.append("notes", notes);
        formData.append("image", image);
        const prizeData = {
            _id: row?._id ? row?._id : '',

            code: Number(id),
            name: name,
            game: game,
            player,
            coach,
            manager,
            date,
            position,
            notes,
            image: image
        };
        dispatch(editPrize(prizeData));
        setId('')
        setName('')
        setCoach('')
        setGame('')
        setPlayer('')
        setDate('')
        setManager('')
        setPosition('')
        setNotes('')
        setImage('')
        if (success) {
            setNotify(toast.success('تم تحديث البيانات'));
            window.location.reload()

        }

    }


    useEffect(() => {
        if (row) {
            setId(row?.code?.toString())
            setGame(row.game)
            setPlayer(row.player)
            setName(row.name)
            setCoach(row.coach)
            setDate(row.date)
            setGame(row.game)
            setManager(row.manager)
            setNotes(row.notes)
            setPosition(row.position)
            setImage(row.image)

        }
    }, [row, row?.code, row?.image])

    useEffect(() => {
        setNotify(toast.error(error));
    }, [error]);
    const gameSlice = useSelector((state: { gameSlice: { loading: boolean, success: boolean, game: sport, error: string, games: objGame[] } }) => state.gameSlice)
    const { games } = gameSlice
    useEffect(() => {
        const keyword: {
            name: string,
            code: string
        } = {
            name: '',
            code: ''
        }
        dispatch(fetchGames(keyword))
    }, [])
    const playerSlice = useSelector((state: { playerSlice: { loading: boolean, success: boolean, game: player, error: string, games: objPlayer[] } }) => state.playerSlice)
    const { games: gamesPlayers } = playerSlice
    useEffect(() => {
        const keyword: {
            name: string,
            code: string
        } = {
            name: '',
            code: ''
        }
        dispatch(fetchPlayers(keyword))
    }, [dispatch])
    return (
        loading ? <Loader /> : (
            <div >
                {error && (
                    <div>
                        <span className="invisible">{notify}</span>
                    </div>
                )}
                <div className='flex flex-col items-center text-zinc-900 border-2 border-yellow-600 p-2 text-center rounded-xl w-20 m-auto text-xl font-bold mb-4'>
                    <div className="flex gap-8 items-center">
                        <div className="animate-bounce">
                            <LoaderPinwheel className="w-10 h-10 text-yellow-600 shadow-lg" />
                        </div>
                        <h1 className='text-white text-center'>P<span className='text-yellow-500'>r</span>ize</h1>
                        <div className="animate-bounce">
                            <Volleyball className="w-10 h-10 text-green-500 shadow-lg" />
                        </div>
                    </div>
                </div>
                <form className='w-full ' onSubmit={handleSubmit}>
                    <div className='border-2 border-yellow-600 p-4  shadow-md rounded-xl'>

                        <div className='grid grid-cols-4 max-lg:grid-cols-1 justify-center  w-full gap-4 '>

                            <div className='flex flex-col gap-2'>
                                <label className='font-bold text-zinc-100 bg-yellow-600 p-1 w-14 rounded-xl text-center'>code</label>
                                <input type="text" value={id} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setId(e.target.value)} placeholder="Type here" className="p-2 bg-gray-50 rounded-xl w-full max-w-xs shadow-md border-2 border-yellow-600" />
                            </div>
                            <div className='flex gap-2 flex-col '>
                                <label className='font-bold text-zinc-100 bg-yellow-600 p-1 w-32 rounded-xl text-center'>اسم الجائزة</label>
                                <input value={name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)} type="text" placeholder="Type here" className="p-2 bg-gray-50 rounded-xl  w-full max-w-xs shadow-md border-2 border-yellow-600" />

                            </div>
                            <div className='flex gap-2 flex-col '>
                                <label className='font-bold text-zinc-100 bg-yellow-600 p-1 w-32 rounded-xl text-center'>تاريخ الجائزة</label>
                                <input value={date} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDate(e.target.value)} type="date" placeholder="Type here" className="p-2 bg-gray-50 rounded-xl  w-full max-w-xs shadow-md border-2 border-yellow-600" />

                            </div>

                            <div className='flex gap-2 flex-col'>

                                <label className='font-bold text-zinc-100 bg-yellow-600 p-1 w-20 rounded-xl text-center'>اللعبة</label>
                                <select value={game} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setGame(e.target.value)} className="p-2 bg-gray-50 rounded-xl w-full max-w-xs shadow-md border-2 border-yellow-600">
                                    <option value="" disabled>Select</option>
                                    {
                                        games?.map((x, i) => (
                                            <option value={x?.game} key={i}>{x?.game}</option>

                                        ))
                                    }
                                </select>

                            </div>
                            <div className='flex gap-2 flex-col '>
                                <label className='font-bold text-zinc-100 bg-yellow-600 p-1 w-20 rounded-xl text-center'>اللاعب</label>
                                <select value={player} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setPlayer(e.target.value)} className="p-2 bg-gray-50 rounded-xl w-full max-w-xs shadow-md border-2 border-yellow-600">
                                    <option value="" disabled>Select</option>
                                    {
                                        gamesPlayers?.map((x, i) => (
                                            <option value={x?.name} key={i}>{x?.name}</option>

                                        ))
                                    }
                                </select>

                            </div>
                            <div className='flex gap-2 flex-col '>
                                <label className='font-bold text-zinc-100 bg-yellow-600 p-1 w-20 rounded-xl text-center'>المركز</label>
                                <input value={position} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPosition(e.target.value)} type="text" placeholder="Type here" className="p-2 bg-gray-50 rounded-xl w-full max-w-xs shadow-md border-2 border-yellow-600" />

                            </div>

                            <div className='flex gap-2 flex-col '>
                                <label className='font-bold text-zinc-100 bg-yellow-600 p-1 w-20 rounded-xl text-center'>المدرب</label>
                                <input value={coach} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCoach(e.target.value)} type="text" placeholder="Type here" className="p-2 bg-gray-50 rounded-xl w-full max-w-xs shadow-md border-2 border-yellow-600" />

                            </div>
                            <div className='flex gap-2 flex-col '>
                                <label className='font-bold text-zinc-100 bg-yellow-600 p-1 w-32 rounded-xl text-center'>المشرف العام</label>
                                <input value={manager} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setManager(e.target.value)} type="text" placeholder="Type here" className="p-2 bg-gray-50 rounded-xl w-full max-w-xs shadow-md border-2 border-yellow-600" />

                            </div>
                            <div className='flex gap-2 flex-col '>
                                <label className='font-bold text-zinc-100 bg-yellow-600 p-1 w-20 rounded-xl text-center'>ملاحظات</label>
                                <input value={notes} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNotes(e.target.value)} type="text" placeholder="Type here" className="p-2 bg-gray-50 rounded-xl w-full max-w-xs shadow-md border-2 border-yellow-600" />

                            </div>

                            <div className='flex gap-2 flex-col ' >
                                <label className='font-bold text-zinc-100 bg-yellow-600 p-1 w-52 rounded-xl text-center'>الصورة</label>
                                <input type="file" placeholder="Type here" className="p-2 bg-gray-50 rounded-xl w-full max-w-xs shadow-md border-2 border-yellow-600" onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)} />

                            </div>
                            <div className='flex gap-2 flex-col' >
                                <label className='font-bold text-zinc-100 bg-yellow-600 p-1 w-52 rounded-xl text-center'>الصورة</label>
                                <img className="w-44 h-48 p-2 bg-gray-50 rounded-xl shadow-md border-2 border-yellow-600" src={image ? image : ''} />

                            </div>


                        </div>
                        <div className='mt-4'>
                            <button type='submit' className="btn hover:bg-green-300 bg-green-800 text-white hover:text-black">save</button>
                            <button onClick={() => handleEdit()} className="btn hover:bg-green-300 bg-green-800 text-white hover:text-black ml-2">update</button>
                        </div>
                    </div>


                </form >

            </div >
        )
    )
}

export default Add