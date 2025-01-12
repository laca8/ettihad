import React, { useState, useEffect } from 'react'
import { LoaderPinwheel, Volleyball } from 'lucide-react';
import { infra, objectId } from '../../types/type';
import { useDispatch, useSelector } from 'react-redux';

import Loader from '../features/Loader';
import { AppDispatch } from '../../redux/store';
import { toast } from "react-toastify";
import { addInfra, editInfra } from '../../redux/slicers/infraSlicer';
type obj = infra & objectId
type Props = { row: obj | null }
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import config from '../../config';
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
    const infraSlice = useSelector((state: { infraSlice: { loading: boolean, game: infra, error: string, success: boolean, games: infra[] } }) => state.infraSlice)
    const { loading, error, success } = infraSlice
    const [id, setId] = useState('')
    const [name, setName] = useState('')
    const [buyer, setBuyer] = useState('')
    const [seller, setSeller] = useState('')
    const [date, setDate] = useState('')
    const [notes, setNotes] = useState('')
    const [salary, setSalary] = useState<number | 0>(0)
    const [item, setItem] = useState('')
    const [num, setNum] = useState<number | 0>(0)
    const [total, setTotal] = useState<number | 0>(0)
    const [itemType, setItemType] = useState('')
    const [image, setImage] = useState('')
    const handleChange = async (e: React.ChangeEvent<HTMLInputElement | null>) => {


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

            setImage(downloadURL);

        } catch (error) {
            console.error('Upload failed:', error);

        }
    };


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (id === '' || date === '' || name === '' || item === '' || itemType === '' || notes === '' || seller === '' || buyer === '') {
            setNotify(toast.error('please fill all fields'));
        }
        console.log(image);

        const formData = new FormData();
        formData.append("code", id);
        formData.append("name", name);
        formData.append("date", date);
        formData.append("item", item);
        // formData.append("salary", salary);
        // formData.append("num", num);
        formData.append("itemType", itemType);
        formData.append("item", item);
        formData.append("seller", seller);
        formData.append("buyer", buyer);
        // formData.append("total", total);
        formData.append("image", image);
        formData.append("notes", notes);
        const infraData: infra = {
            code: Number(id),
            name,
            salary,
            num,
            total,
            item,
            itemType,
            seller,
            date,
            buyer,
            image,
            notes
        };
        dispatch(addInfra(infraData));
        setId('')
        setName('')
        setDate('')
        setBuyer('')
        setItem('')
        setSeller('')
        setItemType('')
        setNotes('')
        setSalary(0)
        setImage('')
        if (success) {
            setNotify(toast.success('تم اضافة البيانات'));
            window.location.reload()

        }


    }
    const handleEdit = () => {
        if (id === '' || date === '' || name === '' || item === '' || itemType === '' || notes === '' || seller === '' || buyer === '') {
            setNotify(toast.error('please fill all fields'));
        }
        console.log(image);

        const formData = new FormData();

        formData.append("code", id);
        formData.append("name", name);
        formData.append("date", date);
        formData.append("item", item);
        // formData.append("salary", salary);
        // formData.append("num", num);
        formData.append("itemType", itemType);
        formData.append("item", item);
        formData.append("seller", seller);
        formData.append("buyer", buyer);
        // formData.append("total", total);
        formData.append("image", image);
        formData.append("notes", notes);
        const infraData = {
            _id: row?._id ? row?._id : '',
            code: Number(id),
            name,
            salary,
            num,
            total,
            item,
            itemType,
            seller,
            date,
            buyer,
            image,
            notes
        };
        dispatch(editInfra(infraData));
        setId('')
        setName('')
        setDate('')
        setBuyer('')
        setItem('')
        setSeller('')
        setItemType('')
        setNotes('')
        setSalary(0)
        setImage('')
        if (success) {
            setNotify(toast.success('تم تحديث البيانات'));
            window.location.reload()

        }

    }


    useEffect(() => {
        if (row) {
            setId(row?.code?.toString())
            setBuyer(row.buyer)
            setName(row.name)
            setDate(row.date)
            setItem(row.item)
            setSalary(row.salary)
            setItemType(row.itemType)
            setNotes(row.notes)
            setNum(row.num)
            setTotal(row.total)
            setImage(row.image)

        }
    }, [row, row?.code, row?.image])

    useEffect(() => {
        setNotify(toast.error(error));
    }, [error]);

    return (
        loading ? <Loader /> : (
            <div >
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
                        <h1 className='text-white text-center'>المشتريات</h1>
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
                                <label className='font-bold text-zinc-100 bg-yellow-600 p-1 w-20 rounded-xl text-center'>الاسم</label>
                                <input value={name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)} type="text" placeholder="Type here" className="p-2 bg-gray-50 rounded-xl  w-full max-w-xs shadow-md border-2 border-yellow-600" />

                            </div>
                            <div className='flex gap-2 flex-col '>
                                <label className='font-bold text-zinc-100 bg-yellow-600 p-1 w-20 rounded-xl text-center'>التاريخ</label>
                                <input value={date} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDate(e.target.value)} type="date" placeholder="Type here" className="p-2 bg-gray-50 rounded-xl w-full max-w-xs shadow-md border-2 border-yellow-600" />

                            </div>
                            <div className='flex gap-2 flex-col '>
                                <label className='font-bold text-zinc-100 bg-yellow-600 p-1 w-20 rounded-xl text-center'>الصنف</label>
                                <input value={item} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setItem(e.target.value)} type="text" placeholder="Type here" className="p-2 bg-gray-50 rounded-xl w-full max-w-xs shadow-md border-2 border-yellow-600" />

                            </div>
                            <div className='flex gap-2 flex-col '>
                                <label className='font-bold text-zinc-100 bg-yellow-600 p-1 w-32 rounded-xl text-center'>سعر الوحده</label>
                                <input value={salary} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSalary(Number(e.target.value))} type="number" placeholder="Type here" className="p-2 bg-gray-50 rounded-xl w-full max-w-xs shadow-md border-2 border-yellow-600" />

                            </div>
                            <div className='flex gap-2 flex-col '>
                                <label className='font-bold text-zinc-100 bg-yellow-600 p-1 w-32 rounded-xl text-center'>المشتري</label>
                                <input value={buyer} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBuyer(e.target.value)} type="text" placeholder="Type here" className="p-2 bg-gray-50 rounded-xl w-full max-w-xs shadow-md border-2 border-yellow-600" />

                            </div>
                            <div className='flex gap-2 flex-col '>
                                <label className='font-bold text-zinc-100 bg-yellow-600 p-1 w-20 rounded-xl text-center'>البائع</label>
                                <input value={seller} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSeller(e.target.value)} type="text" placeholder="Type here" className="p-2 bg-gray-50 rounded-xl w-full max-w-xs shadow-md border-2 border-yellow-600" />

                            </div>
                            <div className='flex gap-2 flex-col '>
                                <label className='font-bold text-zinc-100 bg-yellow-600 p-1 w-32 rounded-xl text-center'>نوع الصنف</label>
                                <input value={itemType} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setItemType(e.target.value)} type="text" placeholder="Type here" className="p-2 bg-gray-50 rounded-xl w-full max-w-xs shadow-md border-2 border-yellow-600" />

                            </div>
                            <div className='flex gap-2 flex-col '>
                                <label className='font-bold text-zinc-100 bg-yellow-600 p-1 w-20 rounded-xl text-center'>ملاحظات</label>
                                <input value={notes} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNotes(e.target.value)} type="text" placeholder="Type here" className="p-2 bg-gray-50 rounded-xl w-full max-w-xs shadow-md border-2 border-yellow-600" />

                            </div>
                            <div className='flex gap-2 flex-col '>
                                <label className='font-bold text-zinc-100 bg-yellow-600 p-1 w-20 rounded-xl text-center'>العدد</label>
                                <input value={num} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNum(Number(e.target.value))} type="text" placeholder="Type here" className="p-2 bg-gray-50 rounded-xl w-full max-w-xs shadow-md border-2 border-yellow-600" />

                            </div>
                            <div className='flex gap-2 flex-col '>
                                <label className='font-bold text-zinc-100 bg-yellow-600 p-1 w-32 rounded-xl text-center'>السعر الاجمالي</label>
                                <input value={num * salary} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTotal(Number(e.target.value))} type="text" placeholder="Type here" className="p-2 bg-gray-50 rounded-xl w-full max-w-xs shadow-md border-2 border-yellow-600" />

                            </div>


                            <div className='flex gap-2 flex-col ' >
                                <label className='font-bold text-zinc-100 bg-yellow-600 p-1 w-52 rounded-xl text-center'>صورة الفاتورة</label>
                                <input type="file" placeholder="Type here" className="p-2 bg-gray-50 rounded-xl w-full max-w-xs shadow-md border-2 border-yellow-600" onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)} />
                            </div>
                            <div className='flex gap-2 flex-col' >
                                <label className='font-bold text-zinc-100 bg-yellow-600 p-1 w-52 rounded-xl text-center'>صورة الفاتورة</label>
                                <img className="w-44 h-48 p-2 bg-gray-50 rounded-xl shadow-md border-2 border-yellow-600" src={image} />
                            </div>


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