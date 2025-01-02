import React, { useState, useEffect } from 'react'
import { LoaderPinwheel, Volleyball } from 'lucide-react';
import { sport_sponsor, objectId, sport } from '../../../types/type';
import { useDispatch, useSelector } from 'react-redux';

import Loader from '../../features/Loader';
import { AppDispatch } from '../../../redux/store';
import { toast } from "react-toastify";
import { addSponsor, editSponsor } from '../../../redux/slicers/sportSponsor'
type obj = sport_sponsor & objectId
type objGame = sport & objectId

type Props = { row: obj | null }
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import config from '../../../config';
import { fetchGames } from '../../../redux/slicers/gameSlicer';
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
    const sportSponsorSlice = useSelector((state: { sportSponsorSlice: { loading: boolean, game: sport_sponsor, error: string, success: boolean, games: sport_sponsor[] } }) => state.sportSponsorSlice)
    const { loading, error, success } = sportSponsorSlice
    const [id, setId] = useState('')
    const [name, setName] = useState('')
    const [job, setJob] = useState('')
    const [address1, setAddress1] = useState('')
    const [address2, setAddress2] = useState('')
    const [phone1, setPhone1] = useState('')
    const [phone2, setPhone2] = useState('')
    const [manager, setManager] = useState('')
    const [game, setGame] = useState('')
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
        if (id === '' || name === '' || job === '' || manager === '' || address1 === '' || address2 === '' || phone1 === '' || phone2 === '' || notes === '' || game === '') {
            setNotify(toast.error('please fill all fields'));
        }
        console.log(image);

        const formData = new FormData();
        formData.append("code", id);
        formData.append("name", name);
        formData.append("job", job);
        formData.append("manager", manager);
        formData.append("address1", address1);
        formData.append("address2", address2);
        formData.append("phone1", phone1);
        formData.append("phone2", phone2);
        formData.append("notes", notes);
        formData.append("image", image);
        formData.append("game", game);
        const sponsorData: sport_sponsor = {
            code: Number(id),
            name: name,
            game,
            job,
            manager,
            address1,
            address2,
            phone1,
            phone2,
            notes,
            image: image
        };
        dispatch(addSponsor(sponsorData));
        setId('')
        setName('')
        setAddress1('')
        setAddress2('')
        setJob('')
        setManager('')
        setPhone1('')
        setPhone2('')
        setNotes('')
        setImage('')
        if (success) {
            setNotify(toast.success('تم اضافة البيانات'));
            window.location.reload()

        }

    }
    const handleEdit = () => {
        if (id === '' || name === '' || job === '' || manager === '' || address1 === '' || address2 === '' || phone1 === '' || phone2 === '' || notes === '' || game === '') {
            setNotify(toast.error('please fill all fields'));
        }
        console.log(image);

        const formData = new FormData();
        formData.append("code", id);
        formData.append("name", name);
        formData.append("job", job);
        formData.append("manager", manager);
        formData.append("address1", address1);
        formData.append("address2", address2);
        formData.append("phone1", phone1);
        formData.append("phone2", phone2);
        formData.append("notes", notes);
        formData.append("image", image);
        formData.append("game", game);
        const sponsorData = {
            _id: row?._id ? row?._id : '',
            code: Number(id),
            name: name,
            job,
            manager,
            address1,
            address2,
            phone1,
            phone2,
            game,
            notes,
            image: image
        };
        dispatch(editSponsor(sponsorData));

        setId('')
        setName('')
        setAddress1('')
        setAddress2('')
        setJob('')
        setManager('')
        setPhone1('')
        setPhone2('')
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
            setAddress1(row.address1)
            setAddress2(row.address2)
            setName(row.name)
            setJob(row.job)
            setManager(row.manager)
            setNotes(row.notes)
            setGame(row?.game)
            setPhone1(row.phone1)
            setPhone2(row.phone2)
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
    return (
        loading ? <Loader /> : (
            <div >
                {error && (
                    <div>
                        <span className="invisible">{notify}</span>
                    </div>
                )}
                <div className='flex flex-col items-center text-zinc-900 border-2 border-yellow-600 p-2 text-center rounded-xl w-40 m-auto text-xl font-bold mb-4'>
                    <div className="flex gap-8 items-center">
                        <div className="animate-bounce">
                            <LoaderPinwheel className="w-10 h-10 text-yellow-600 shadow-lg" />
                        </div>
                        <h1 className='text-white text-center '>Sp<span className='text-yellow-500 '>o</span>rt_S<span className='text-yellow-500 '>p</span>onsor</h1>
                        <div className="animate-bounce">
                            <Volleyball className="w-10 h-10 text-green-500 shadow-lg" />
                        </div>
                    </div>
                </div>
                <form className='w-full ' onSubmit={handleSubmit}>
                    <div className='border-2 border-yellow-600 p-4  shadow-md rounded-xl'>

                        <div className='grid grid-cols-4 max-lg:grid-cols-1 justify-center  w-full gap-2 '>

                            <div className='flex flex-col gap-2'>
                                <label className='font-bold text-zinc-100 bg-yellow-600 p-1 w-14 rounded-xl text-center'>code</label>
                                <input type="text" value={id} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setId(e.target.value)} placeholder="Type here" className="p-2 bg-gray-50 rounded-xl w-full max-w-xs shadow-md border-2 border-yellow-600" />
                            </div>
                            <div className='flex gap-2 flex-col '>
                                <label className='font-bold text-zinc-100 bg-yellow-600 p-1 w-28 rounded-xl text-center'>الاسم التجاري</label>
                                <input value={name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)} type="text" placeholder="Type here" className="p-2 bg-gray-50 rounded-xl  w-full max-w-xs shadow-md border-2 border-yellow-600" />

                            </div>
                            <div className='flex gap-2 flex-col '>
                                <label className='font-bold text-zinc-100 bg-yellow-600 p-1 w-32 rounded-xl text-center'>الشخص المسئول</label>
                                <input value={manager} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setManager(e.target.value)} type="text" placeholder="Type here" className="p-2 bg-gray-50 rounded-xl w-full max-w-xs shadow-md border-2 border-yellow-600" />

                            </div>
                            <div className='flex gap-2 flex-col '>
                                <label className='font-bold text-zinc-100 bg-yellow-600 p-1 w-32 rounded-xl text-center'>وظيفة المسئول</label>
                                <input value={job} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setJob(e.target.value)} type="text" placeholder="Type here" className="p-2 bg-gray-50 rounded-xl w-full max-w-xs shadow-md border-2 border-yellow-600" />

                            </div>
                            <div className='flex gap-2 flex-col '>
                                <label className='font-bold text-zinc-100 bg-yellow-600 p-1 w-32 rounded-xl text-center'>العنوان التجاري</label>
                                <input value={address1} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAddress1(e.target.value)} type="text" placeholder="Type here" className="p-2 bg-gray-50 rounded-xl w-full max-w-xs shadow-md border-2 border-yellow-600" />

                            </div>
                            <div className='flex gap-2 flex-col '>
                                <label className='font-bold text-zinc-100 bg-yellow-600 p-1 w-32 rounded-xl text-center'>الاتصال التجاري</label>
                                <input value={phone1} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhone1(e.target.value)} type="text" placeholder="Type here" className="p-2 bg-gray-50 rounded-xl w-full max-w-xs shadow-md border-2 border-yellow-600" />

                            </div>

                            <div className='flex gap-2 flex-col '>
                                <label className='font-bold text-zinc-100 bg-yellow-600 p-1 w-32 rounded-xl text-center'>العنوان الخاص</label>
                                <input value={address2} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAddress2(e.target.value)} type="text" placeholder="Type here" className="p-2 bg-gray-50 rounded-xl w-full max-w-xs shadow-md border-2 border-yellow-600" />

                            </div>
                            <div className='flex gap-2 flex-col '>
                                <label className='font-bold text-zinc-100 bg-yellow-600 p-1 w-32 rounded-xl text-center'>الاتصال الخاص</label>
                                <input value={phone2} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhone2(e.target.value)} type="text" placeholder="Type here" className="p-2 bg-gray-50 rounded-xl w-full max-w-xs shadow-md border-2 border-yellow-600" />

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
                                <label className='font-bold text-zinc-100 bg-yellow-600 p-1 w-20 rounded-xl text-center'>ملاحظات</label>
                                <input value={notes} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNotes(e.target.value)} type="text" placeholder="Type here" className="p-2 bg-gray-50 rounded-xl w-full max-w-xs shadow-md border-2 border-yellow-600" />

                            </div>


                            <div className='flex gap-2 flex-col ' >
                                <label className='font-bold text-zinc-100 bg-yellow-600 p-1 w-52 rounded-xl text-center'>الصورة</label>
                                <input type="file" placeholder="Type here" className="p-2 bg-gray-50 rounded-xl w-full max-w-xs shadow-md border-2 border-yellow-600" onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)} />
                            </div>
                            <div className='flex gap-2 flex-col' >
                                <label className='font-bold text-zinc-100 bg-yellow-600 p-1 w-52 rounded-xl text-center'>الصورة</label>
                                <img className="w-44 h-48 p-2 bg-gray-50 rounded-xl shadow-md border-2 border-yellow-600" src={image} />
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