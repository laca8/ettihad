import React, { useState, useEffect } from 'react'
import { LoaderPinwheel, Volleyball } from 'lucide-react';
import { member, objectId } from '../../types/type';
import { useDispatch, useSelector } from 'react-redux';

import Loader from '../features/Loader';
import { AppDispatch } from '../../redux/store';
import { toast } from "react-toastify";
import { addMember, editMember } from '../../redux/slicers/memberSlicer';
type obj = member & objectId
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
    const memberSlice = useSelector((state: { memberSlice: { loading: boolean, game: member, error: string, success: boolean, games: member[] } }) => state.memberSlice)
    const { loading, error, success } = memberSlice
    const [id, setId] = useState('')
    const [name, setName] = useState('')
    const [sex, setSex] = useState('')
    const [job, setJob] = useState('')
    const [date, setDate] = useState('')
    const [notes, setNotes] = useState('')
    const [address, setAddress] = useState('')
    const [national_Id, setNational] = useState('')
    const [phone1, setPhone1] = useState('')
    const [phone2, setPhone2] = useState('')
    const [address_work, setAddressWork] = useState('')
    const [member_type, setMemberType] = useState('')
    const [last_pay, setLastPay] = useState('')
    const [member_status, setMemberStatus] = useState('')
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
        if (id === '' || date === '' || name === '' || job === '' || address_work === '' || national_Id === '' || address === '' || phone1 === '' || phone2 === '' || address_work === '' || member_status === '' || member_type === '' || last_pay === '') {
            setNotify(toast.error('please fill all fields'));
        }
        console.log(image);

        const formData = new FormData();
        formData.append("code", id);
        formData.append("name", name);
        formData.append("date", date);
        formData.append("job", job);
        formData.append("member_status", member_status);
        formData.append("member_type", member_type);
        formData.append("address", address);
        formData.append("address_work", address_work);
        formData.append("phone1", phone1);
        formData.append("phone2", phone2);
        formData.append("sex", sex);
        formData.append("last_pay", last_pay);
        formData.append("image", image);
        formData.append("notes", notes);
        formData.append("national_Id", national_Id);
        const memberData: member = {
            code: Number(id),
            name,
            date,
            address,
            address_work,
            phone1,
            phone2,
            member_status,
            member_type,
            last_pay,
            image,
            notes,
            job,
            sex,
            national_Id
        };
        dispatch(addMember(memberData));
        setId('')
        setName('')
        setDate('')
        setNational('')
        setJob('')
        setMemberStatus('')
        setMemberType('')
        setNotes('')
        setAddress('')
        setAddressWork('')
        setLastPay('')
        setSex('')
        setImage('')
        if (success) {
            setNotify(toast.success('تم اضافة البيانات'));
            window.location.reload()

        }


    }
    const handleEdit = () => {
        if (id === '' || date === '' || name === '' || job === '' || address_work === '' || national_Id === '' || address === '' || phone1 === '' || phone2 === '' || address_work === '' || member_status === '' || member_type === '' || last_pay === '') {
            setNotify(toast.error('please fill all fields'));
        }
        console.log(image);

        const formData = new FormData();
        formData.append("code", id);
        formData.append("name", name);
        formData.append("date", date);
        formData.append("job", job);
        formData.append("member_status", member_status);
        formData.append("member_type", member_type);
        formData.append("address", address);
        formData.append("address_work", address_work);
        formData.append("phone1", phone1);
        formData.append("phone2", phone2);
        formData.append("sex", sex);
        formData.append("last_pay", last_pay);
        formData.append("image", image);
        formData.append("notes", notes);
        formData.append("national_Id", national_Id);
        const memberData = {
            _id: row?._id ? row?._id : '',
            code: Number(id),
            name,
            date,
            address,
            address_work,
            phone1,
            phone2,
            member_status,
            member_type,
            last_pay,
            image,
            notes,
            job,
            sex,
            national_Id
        };
        dispatch(editMember(memberData));
        setId('')
        setName('')
        setDate('')
        setNational('')
        setJob('')
        setMemberStatus('')
        setMemberType('')
        setNotes('')
        setAddress('')
        setAddressWork('')
        setLastPay('')
        setSex('')
        setImage('')
        if (success) {
            setNotify(toast.success('تم تحديث البيانات'));
            window.location.reload()

        }

    }


    useEffect(() => {
        if (row) {
            setId(row?.code?.toString())
            setAddress(row.address)
            setAddressWork(row.address_work)
            setDate(row.date)
            setImage(row.image)
            setJob(row.job)
            setLastPay(row.last_pay)
            setMemberStatus(row.member_status)
            setMemberType(row.member_type)
            setName(row.name)
            setNational(row.national_Id)
            setNotes(row.notes)
            setPhone1(row.phone1)
            setPhone2(row.phone2)
            setSex(row.sex)

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
                <div className='flex flex-col items-center text-zinc-900 border-2 border-yellow-600 p-2 text-center rounded-xl w-28 m-auto text-xl font-bold mb-4'>
                    <div className="flex gap-8 items-center">
                        <div className="animate-bounce">
                            <LoaderPinwheel className="w-10 h-10 text-yellow-600 shadow-lg" />
                        </div>
                        <h1 className='text-white text-center'>الاعضاء</h1>
                        <div className="animate-bounce">
                            <Volleyball className="w-10 h-10 text-green-500 shadow-lg" />
                        </div>
                    </div>
                </div>
                <form className='w-full ' onSubmit={handleSubmit}>
                    <div className='border-2 border-yellow-600 p-4  shadow-md rounded-xl'>

                        <div className='grid grid-cols-4 max-lg:grid-cols-1 justify-center  w-full gap-4 '>

                            <div className='flex flex-col gap-2'>
                                <label className='font-bold text-zinc-100 bg-yellow-600 p-1 w-32 rounded-xl text-center'>رقم العضوية</label>
                                <input type="text" value={id} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setId(e.target.value)} placeholder="Type here" className="p-2 bg-gray-50 rounded-xl w-full max-w-xs shadow-md border-2 border-yellow-600" />
                            </div>
                            <div className='flex gap-2 flex-col '>
                                <label className='font-bold text-zinc-100 bg-yellow-600 p-1 w-20 rounded-xl text-center'>الاسم</label>
                                <input value={name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)} type="text" placeholder="Type here" className="p-2 bg-gray-50 rounded-xl  w-full max-w-xs shadow-md border-2 border-yellow-600" />

                            </div>
                            <div className='flex gap-2 flex-col '>
                                <label className='font-bold text-zinc-100 bg-yellow-600 p-1 w-32 rounded-xl text-center'>تاريخ العضوية</label>
                                <input value={date} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDate(e.target.value)} type="date" placeholder="Type here" className="p-2 bg-gray-50 rounded-xl w-full max-w-xs shadow-md border-2 border-yellow-600" />

                            </div>
                            <div className='flex gap-2 flex-col '>
                                <label className='font-bold text-zinc-100 bg-yellow-600 p-1 w-20 rounded-xl text-center'>النوع</label>
                                <select value={sex} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSex(e.target.value)} className="p-2 bg-gray-50 rounded-xl w-full max-w-xs shadow-md border-2 border-yellow-600">
                                    <option value="" disabled>Select</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>
                            <div className='flex gap-2 flex-col '>
                                <label className='font-bold text-zinc-100 bg-yellow-600 p-1 w-32 rounded-xl text-center'>الرقم القومي</label>
                                <input maxLength={14} value={national_Id} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNational(e.target.value)} type="text" placeholder="Type here" className="p-2 bg-gray-50 rounded-xl w-full max-w-xs shadow-md border-2 border-yellow-600" />
                            </div>
                            <div className='flex gap-2 flex-col '>
                                <label className='font-bold text-zinc-100 bg-yellow-600 p-1 w-20 rounded-xl text-center'>العنوان</label>

                                <input value={address} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAddress(e.target.value)} type="text" placeholder="Type here" className="p-2 bg-gray-50 rounded-xl w-full max-w-xs shadow-md border-2 border-yellow-600" />
                            </div>
                            <div className='flex gap-2 flex-col '>
                                <label className='font-bold text-zinc-100 bg-yellow-600 p-1 w-20 rounded-xl text-center'>اتصال 1</label>

                                <input maxLength={11} value={phone1} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhone1(e.target.value)} type="text" placeholder="Type here" className="p-2 bg-gray-50 rounded-xl w-full max-w-xs shadow-md border-2 border-yellow-600" />
                            </div>
                            <div className='flex gap-2 flex-col' >
                                <label className='font-bold text-zinc-100 bg-yellow-600 p-1 w-20 rounded-xl text-center'>اتصال 2</label>
                                <input maxLength={11} value={phone2} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhone2(e.target.value)} type="text" placeholder="Type here" className="p-2 bg-gray-50 rounded-xl w-full max-w-xs shadow-md border-2 border-yellow-600" />
                            </div>

                            <div className='flex gap-2 flex-col '>
                                <label className='font-bold text-zinc-100 bg-yellow-600 p-1 w-32 rounded-xl text-center'>الوظيفة</label>
                                <input value={job} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setJob(e.target.value)} type="text" placeholder="Type here" className="p-2 bg-gray-50 rounded-xl w-full max-w-xs shadow-md border-2 border-yellow-600" />

                            </div>
                            <div className='flex gap-2 flex-col '>
                                <label className='font-bold text-zinc-100 bg-yellow-600 p-1 w-32 rounded-xl text-center'>مكان العمل</label>
                                <input value={address_work} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAddressWork(e.target.value)} type="text" placeholder="Type here" className="p-2 bg-gray-50 rounded-xl w-full max-w-xs shadow-md border-2 border-yellow-600" />

                            </div>
                            <div className='flex gap-2 flex-col '>
                                <label className='font-bold text-zinc-100 bg-yellow-600 p-1 w-32 rounded-xl text-center'>نوع العضوية</label>
                                <input value={member_type} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMemberType(e.target.value)} type="text" placeholder="Type here" className="p-2 bg-gray-50 rounded-xl w-full max-w-xs shadow-md border-2 border-yellow-600" />

                            </div>
                            <div className='flex gap-2 flex-col '>
                                <label className='font-bold text-zinc-100 bg-yellow-600 p-1 w-32 rounded-xl text-center'>اخر سداد</label>
                                <input value={last_pay} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLastPay(e.target.value)} type="text" placeholder="Type here" className="p-2 bg-gray-50 rounded-xl w-full max-w-xs shadow-md border-2 border-yellow-600" />

                            </div>
                            <div className='flex gap-2 flex-col '>
                                <label className='font-bold text-zinc-100 bg-yellow-600 p-1 w-32 rounded-xl text-center'>حالة العضوية</label>
                                <input value={member_status} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMemberStatus(e.target.value)} type="text" placeholder="Type here" className="p-2 bg-gray-50 rounded-xl w-full max-w-xs shadow-md border-2 border-yellow-600" />

                            </div>
                            <div className='flex gap-2 flex-col '>
                                <label className='font-bold text-zinc-100 bg-yellow-600 p-1 w-20 rounded-xl text-center'>ملاحظات</label>
                                <input value={notes} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNotes(e.target.value)} type="text" placeholder="Type here" className="p-2 bg-gray-50 rounded-xl w-full max-w-xs shadow-md border-2 border-yellow-600" />

                            </div>
                            <div className='flex gap-2 flex-col ' >
                                <label className='font-bold text-zinc-100 bg-yellow-600 p-1 w-52 rounded-xl text-center'>صورة</label>
                                <input type="file" placeholder="Type here" className="p-2 bg-gray-50 rounded-xl w-full max-w-xs shadow-md border-2 border-yellow-600" onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)} />
                            </div>
                            <div className='flex gap-2 flex-col' >
                                <label className='font-bold text-zinc-100 bg-yellow-600 p-1 w-52 rounded-xl text-center'>صورة</label>
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