import React, { useState, useEffect } from 'react'
import { BadgeX, Download, LoaderPinwheel, Volleyball } from 'lucide-react';
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
    const [upload, setUpload] = useState(false)
    const [num, setNum] = useState(0)
    const [date, setDate] = useState('')

    const [par, setPar] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (id === '' || codeBoard === '' || num === 0) {
            setNotify(toast.error('please fill all fields'));
        }
        const lectureData: lecture = {
            code: Number(id),
            num: images.length,
            codeBoard,
            images,
            par,
            date,


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
            num: images.length,
            codeBoard,
            images,
            par,
            date,


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

    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
    const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/jpg'];

    const validateFile = (file: File): boolean => {
        // Check file size
        if (file.size > MAX_FILE_SIZE) {
            alert(`File ${file.name} is too large. Maximum size is 5MB`);
            return false;
        }

        // Check file type
        if (!ALLOWED_TYPES.includes(file.type)) {
            alert(`File ${file.name} is not a supported image type. Please use JPG, PNG, GIF, or WebP`);
            return false;
        }

        return true;
    };

    const handleChangeImages = async (e: React.ChangeEvent<HTMLInputElement | null>) => {
        setUpload(true)
        const files = e.target.files
        if (!files) return;
        const validFiles = Array.from(files).filter(validateFile);
        // Upload to Firebase
        try {

            for (let index = 0; index < validFiles.length; index++) {
                const file = validFiles[index];
                const filename = `${Date.now()}-${file.name}`;
                const storageRef = ref(storage, `images/${filename}`);

                const snapshot = await uploadBytes(storageRef, file);
                const downloadURL = await getDownloadURL(snapshot.ref);
                const newArr = [...images];
                newArr[index] = downloadURL;
                setImages((images) => [...images, downloadURL])
                console.log(images);
                setUpload(false)
            }

        } catch (error) {
            console.error('Upload failed:', error);
            setUpload(false)

        }

    };
    useEffect(() => {
        if (row) {
            setId(row?.code?.toString())
            setCodeBoard(row?.codeBoard)
            setNum(row?.num)
            setDate(row?.date)

            setPar(row?.par)
            setImages(row?.images)
        }
        console.log(games);

    }, [row, row?.code, row?.images, games])
    useEffect(() => {
        dispatch(fetchBoards({ code: '' }))
    }, [dispatch])
    const handleRemove = (i: number) => {
        // Add logic to handle delete operation
        const isRemove = window.confirm('هل تريد حذف الصورة')
        // Add logic to handle delete operation
        if (isRemove) {
            setImages(images.filter((_, index) => index !== i))
            console.log(images);

            console.log(`Deleting item with id: ${i}`);
        }

    }
    const handleDownload = async (x: string) => {
        console.log(`Downloading image: ${x}`);
        const link = document.createElement('a');
        link.href = x;
        link.download = 'downloaded-image.jpg'; // Specify the filename for the downloaded image
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

    }
    return (
        loading ? <Loader /> : (
            <div  >
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
                <div className='grid grid-cols-5 max-md:grid-cols-1 gap-4 h-full'>
                    <form className='w-full  col-span-3 ' onSubmit={handleSubmit}>
                        <div className='border-2 border-yellow-600 p-4  shadow-md rounded-xl'>
                            <div className='grid grid-cols-3 max-lg:grid-cols-1 justify-center  w-full h-full gap-4 '>
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
                                <div className='flex flex-col gap-2'>
                                    <label className='font-bold text-zinc-100 bg-yellow-600 p-1 w-32 rounded-xl text-center'>التاريخ</label>
                                    <input type="date" value={date} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDate(e.target.value)} placeholder="Type here" className="p-2 bg-gray-50 rounded-xl w-full max-w-xs shadow-md border-2 border-yellow-600" />
                                </div>


                                <div className='flex gap-2 flex-col'>
                                    <label className='font-bold text-zinc-100 bg-yellow-600 p-1 w-32 rounded-xl text-center'>عدد المحاضر</label>
                                    <input value={num} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNum(Number(e.target.value))} type="number" placeholder="Type here" className="p-2 bg-gray-50 rounded-xl w-full max-w-xs shadow-md border-2 border-yellow-600" />
                                </div>
                                <div className='flex gap-2 flex-col ' >
                                    <label className='font-bold text-zinc-100 bg-yellow-600 p-1 w-48 rounded-xl text-center'> المحاضر ( يمكنك اختيار مجموعة من الصور )</label>
                                    <input
                                        type="file"
                                        multiple
                                        accept={ALLOWED_TYPES.join(',')}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeImages(e)}

                                        id="file-upload"
                                        className="p-2 bg-gray-50 rounded-xl w-full max-w-xs shadow-md border-2 border-yellow-600"
                                    />

                                </div>
                                <div className='flex flex-col gap-2'>
                                    <label className='font-bold text-zinc-100 bg-yellow-600 p-1 w-32 rounded-xl text-center'>الملخص</label>
                                    <textarea
                                        placeholder="الملخص"
                                        value={par}
                                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setPar(e.target.value)}
                                        className="textarea textarea-bordered textarea-lg w-full max-w-xs"></textarea>
                                </div>


                            </div>





                            <div className='mt-4'>
                                <button type='submit' className="btn hover:bg-green-300 bg-green-800 text-white hover:text-black">save</button>
                                <button onClick={() => handleEdit()} className="btn hover:bg-green-300 bg-green-800 text-white hover:text-black mr-2">update</button>
                            </div>
                        </div>


                    </form >
                    <div className='w-full col-span-2'>
                        <p className='font-bold text-zinc-100 bg-yellow-600 p-1  rounded-xl text-center mb-2 mt-2 w-full'>المحاضر</p>
                        <div className='grid grid-cols-1 max-lg:grid-cols-1   h-96 overflow-y-auto'>

                            {
                                upload ? <p>Upload.....</p> : images.length != 0 ? images.map((x, i) => (
                                    <div className='flex relative' key={i} >
                                        <img className="p-2 w-full h-96 bg-gray-50 rounded-xl shadow-md border-2 border-yellow-600" src={x} />
                                        <div className=" absolute w-full bg-black flex justify-between text-white p-2">

                                            <button type='button' className='bg-red-500 p-2 rounded-full' onClick={() => handleRemove(i)}>
                                                <BadgeX />
                                            </button>
                                            <button
                                                className='bg-green-500 p-2 rounded-full'
                                                onClick={() => handleDownload(x)}


                                            >
                                                <Download />

                                            </button>
                                        </div>
                                    </div>
                                )) : null
                            }
                        </div>
                    </div>


                </div>

            </div >
        )
    )
}

export default Add