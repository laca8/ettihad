import React, { useState, useEffect } from 'react'
import { LoaderPinwheel, Volleyball } from 'lucide-react';
import { board, lecture, objectId } from '../../types/type';
import { useDispatch, useSelector } from 'react-redux';

import Loader from '../features/Loader';
import { AppDispatch } from '../../redux/store';
import { toast } from "react-toastify";
import { addLecture, editLecture } from '../../redux/slicers/lecture';
type obj = lecture & objectId
type Props = { row: obj | null }

import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import config from '../../config';
import { fetchBoards } from '../../redux/slicers/boardSlicer';

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
    const lectureSlice = useSelector((state: { lectureSlice: { loading: boolean, game: lecture, error: string, success: boolean, games: lecture[] } }) => state.lectureSlice)
    const { loading, error, success } = lectureSlice
    const boardSlice = useSelector((state: { boardSlice: { loading: boolean, game: board, error: string, success: boolean, games: board[] } }) => state.boardSlice)
    const { games } = boardSlice
    const [id, setId] = useState('')
    const [codeBoard, setCodeBoard] = useState('')
    const [images, setImages] = useState<string[]>([])
    const [num, setNum] = useState(0)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (id === '' || codeBoard === '' || num === 0) {
            setNotify(toast.error('please fill all fields'));
        }
        const lectureData: lecture = {
            code: Number(id),
            num,
            codeBoard,
            images
        };
        dispatch(addLecture(lectureData));
        setId('')
        setCodeBoard('')
        setNum(0)
        setImages([])
        if (success) {
            setNotify(toast.success('تم اضافة البيانات'));
            window.location.reload()
        }


    }
    const handleEdit = () => {

        if (id === '' || codeBoard === '' || num === 0) {
            setNotify(toast.error('please fill all fields'));
        }
        const lectureData = {
            _id: row?._id ? row?._id : '',
            code: Number(id),
            num,
            codeBoard,
            images

        };
        dispatch(editLecture(lectureData));
        setId('')
        setCodeBoard('')
        setNum(0)
        setImages([])
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
            setImages(
                new Array(Number(num ? num : 0)).fill('')
            );
        }


    }, [num]);

    const handleChangeImages = async (e: React.ChangeEvent<HTMLInputElement | null>, index: number) => {
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
            alert("File is too large. Maximum size is 500KB.");
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

            const newArr = [...images];
            newArr[index] = downloadURL;
            setImages(newArr);

        } catch (error) {
            console.error('Upload failed:', error);

        }

    };
    useEffect(() => {
        if (row) {
            setId(row?.code?.toString())
            setCodeBoard(row?.codeBoard)
            setNum(row?.num)
            setImages(row?.images)
        }
        console.log(games);

    }, [row, row?.code, row?.images, games])
    useEffect(() => {
        dispatch(fetchBoards({ code: '' }))
    }, [dispatch])
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
                        <h1 className='text-white text-center w-36'>المحاضر</h1>
                        <div className="animate-bounce">
                            <Volleyball className="w-10 h-10 text-green-500 shadow-lg" />
                        </div>
                    </div>
                </div>
                <form className='w-full ' onSubmit={handleSubmit}>
                    <div className='border-2 border-yellow-600 p-4  shadow-md rounded-xl'>
                        <div className='grid grid-cols-4 max-lg:grid-cols-1 justify-center  w-full gap-4 '>
                            <div className='flex flex-col gap-2'>
                                <label className='font-bold text-zinc-100 bg-yellow-600 p-1 w-32 rounded-xl text-center'>رقم المحضر</label>
                                <input type="text" value={id} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setId(e.target.value)} placeholder="Type here" className="p-2 bg-gray-50 rounded-xl w-full max-w-xs shadow-md border-2 border-yellow-600" />
                            </div>
                            <div className='flex gap-2 flex-col'>

                                <label className='font-bold text-zinc-100 bg-yellow-600 p-1 w-20 rounded-xl text-center'>المجلس</label>
                                <select value={codeBoard} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setCodeBoard(e.target.value)} className="p-2 bg-gray-50 rounded-xl w-full max-w-xs shadow-md border-2 border-yellow-600">
                                    <option value="" disabled>Select</option>
                                    {
                                        games?.map((x, i) => (
                                            <option value={x?.code} key={i}>{x?.code}</option>

                                        ))
                                    }
                                </select>

                            </div>


                            <div className='flex gap-2 flex-col '>
                                <label className='font-bold text-zinc-100 bg-yellow-600 p-1 w-32 rounded-xl text-center'>عدد المحاضر</label>
                                <input value={num} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNum(Number(e.target.value))} type="number" placeholder="Type here" className="p-2 bg-gray-50 rounded-xl w-full max-w-xs shadow-md border-2 border-yellow-600" />
                            </div>
                        </div>

                        <div className='grid grid-cols-4 max-lg:grid-cols-1 justify-center  w-full gap-4 mt-2 mb-2'>
                            {
                                images.map((x, i) => (
                                    <div key={i} className='flex flex-col  gap-4 w-full '>
                                        <div className='flex gap-2 flex-col ' >
                                            <label className='font-bold text-zinc-100 bg-yellow-600 p-1 w-52 rounded-xl text-center'>الصورة {i + 1}</label>
                                            <input type="file" placeholder="Type here" className="p-2 bg-gray-50 rounded-xl w-full max-w-xs shadow-md border-2 border-yellow-600" onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeImages(e, i)} />
                                        </div>
                                        <div className='flex gap-2 flex-col' >
                                            <label className='font-bold text-zinc-100 bg-yellow-600 p-1 w-52 rounded-xl text-center'>الصورة {i + 1}</label>
                                            <img className="w-44 h-48 p-2 bg-gray-50 rounded-xl shadow-md border-2 border-yellow-600" src={x} />
                                        </div>

                                    </div>
                                ))
                            }
                        </div>



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