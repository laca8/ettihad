import React, { useState, useEffect } from 'react'
import { LoaderPinwheel, Volleyball } from 'lucide-react';
import { player, objectId, sport } from '../../../types/type';
import { useDispatch, useSelector } from 'react-redux';
import { addPlayer, editPlayer } from '../../../redux/slicers/playerSlicer'
import Loader from '../../features/Loader';
import { AppDispatch } from '../../../redux/store';
import { toast } from "react-toastify";
type obj = player & objectId
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
    const playerSlice = useSelector((state: { playerSlice: { loading: boolean, game: player, error: string, success: boolean, games: player[] } }) => state.playerSlice)
    const { loading, error, success } = playerSlice
    const gameSlice = useSelector((state: { gameSlice: { loading: boolean, success: boolean, game: sport, error: string, games: objGame[] } }) => state.gameSlice)
    const { games } = gameSlice
    const [id, setId] = useState('')
    const [name, setName] = useState('')
    const [game, setGame] = useState('')
    const [contract_value, setContract] = useState('')
    const [sex, setSex] = useState('')
    const [national_Id, setNational] = useState('')
    const [address, setAddress] = useState('')
    const [phone1, setPhone1] = useState('')
    const [phone2, setPhone2] = useState('')
    const [bills_num, setBillsNum] = useState('')
    const [bill_value, setBillValue] = useState('')
    const [bills_paid, setBillsPaid] = useState('')
    const [bills_remaining, setBillsRem] = useState('')
    const [rewards, setRewards] = useState('')
    const [penalits, setPenalits] = useState('')
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
        if (id === '' || game === '' || name === '' || sex === '' || contract_value === '' || national_Id === '' || address === '' || phone1 === '' || phone2 === '' || bill_value === '' || bills_num === '' || bills_paid === '' || bills_remaining === '' || rewards === '' || penalits === '') {
            setNotify(toast.error('please fill all fields'));
        }
        console.log(image);

        const formData = new FormData();
        formData.append("code", id);
        formData.append("name", name);
        formData.append("game", game);
        formData.append("sex", sex);
        formData.append("contract_value", contract_value);
        formData.append("national_Id", national_Id);
        formData.append("address", address);
        formData.append("phone1", phone1);
        formData.append("phone2", phone2);
        formData.append("bill_value", bill_value);
        formData.append("bills_paid", bills_paid);
        formData.append("bills_remaining", bills_remaining);
        formData.append("rewards", rewards);
        formData.append("penalits", penalits);
        formData.append("image", image);
        const playerData: player = {
            code: Number(id),
            name: name,
            game: game,
            sex: sex,
            contract_value: contract_value,
            national_Id: national_Id,
            address: address,
            phone1: phone1,
            phone2: phone2,
            bill_value: bill_value,
            bills_num: bills_num,
            bills_paid: bills_paid,
            bills_remaining: bills_remaining,
            rewards: rewards,
            penalits: penalits,
            image: image
        };
        dispatch(addPlayer(playerData));
        setId('')
        setName('')
        setAddress('')
        setGame('')
        setBillValue('')
        setBillsNum('')
        setBillsPaid('')
        setBillsRem('')
        setContract('')
        setNational('')
        setPenalits('')
        setRewards('')
        setSex('')
        setImage('')
        setPhone1('')
        setPhone2('')
        if (success) {
            setNotify(toast.success('تم اضافة البيانات'));
            window.location.reload()

        }

    }
    const handleEdit = () => {

        if (id === '' || game === '' || name === '' || sex === '' || contract_value === '' || national_Id === '' || address === '' || phone1 === '' || phone2 === '' || bill_value === '' || bills_num === '' || bills_paid === '' || bills_remaining === '' || rewards === '' || penalits === '') {
            setNotify(toast.error('please fill all fields'));
        }
        console.log(image);
        const formData = new FormData();
        formData.append("code", id);
        formData.append("name", name);
        formData.append("game", game);
        formData.append("sex", sex);
        formData.append("contract_value", contract_value);
        formData.append("national_Id", national_Id);
        formData.append("address", address);
        formData.append("phone1", phone1);
        formData.append("phone2", phone2);
        formData.append("bill_value", bill_value);
        formData.append("bills_paid", bills_paid);
        formData.append("bills_remaining", bills_remaining);
        formData.append("rewards", rewards);
        formData.append("penalits", penalits);
        formData.append("image", image);
        const playerData = {
            _id: row?._id ? row?._id : '',
            code: Number(id),
            name: name,
            game: game,
            sex: sex,
            contract_value: contract_value,
            national_Id: national_Id,
            address: address,
            phone1: phone1,
            phone2: phone2,
            bill_value: bill_value,
            bills_num: bills_num,
            bills_paid: bills_paid,
            bills_remaining: bills_remaining,
            rewards: rewards,
            penalits: penalits,
            image: image
        };
        dispatch(editPlayer(playerData));
        setId('')
        setName('')
        setAddress('')
        setGame('')
        setBillValue('')
        setBillsNum('')
        setBillsPaid('')
        setBillsRem('')
        setContract('')
        setNational('')
        setPenalits('')
        setRewards('')
        setSex('')
        setImage('')
        setPhone1('')
        setPhone2('')
        if (success) {
            setNotify(toast.success('تم تحديث البيانات'));
            window.location.reload()

        }

    }


    useEffect(() => {
        if (row) {
            setId(row?.code?.toString())
            setGame(row.game)
            setName(row.name)
            setAddress(row.address)
            setBillValue(row.bill_value)
            setBillsNum(row.bills_num)
            setBillsPaid(row.bills_paid)
            setBillsRem(row.bills_paid)
            setContract(row.contract_value)
            setImage(row.image)
            setNational(row.national_Id)
            setPenalits(row.penalits)
            setPhone1(row.phone1)
            setPhone2(row.phone2)
            setRewards(row.rewards)
            setSex(row.sex)
        }
    }, [row, row?.code, row?.image])

    useEffect(() => {
        setNotify(toast.error(error));
    }, [error]);
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
        loading ? <Loader /> :
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
                        <h1 className='text-white text-center'>الاعبين</h1>
                        <div className="animate-bounce">
                            <Volleyball className="w-10 h-10 text-green-500 shadow-lg" />
                        </div>
                    </div>
                </div>
                <form className='w-full  ' onSubmit={handleSubmit}>
                    <div className='border-2 border-yellow-600 p-4  shadow-md rounded-xl'>
                        <div className='grid grid-cols-4 justify-center max-lg:grid-cols-1  w-full gap-4 '>
                            <div className='flex flex-col gap-2'>
                                <label className='font-bold text-zinc-100 bg-yellow-600 p-1 w-14 rounded-xl text-center'>code</label>
                                <input type="text" value={id} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setId(e.target.value)} placeholder="Type here" className="p-2 bg-gray-50 rounded-xl w-full max-w-xs shadow-md border-2 border-yellow-600" />
                            </div>
                            <div className='flex gap-2 flex-col'>
                                <label className='font-bold text-zinc-100 bg-yellow-600 p-1 w-20 rounded-xl text-center'>الاسم</label>
                                <input value={name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)} type="text" placeholder="Type here" className="p-2 bg-gray-50 rounded-xl  w-full max-w-xs shadow-md border-2 border-yellow-600" />
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
                                <label className='font-bold text-zinc-100 bg-yellow-600 p-1 w-20 rounded-xl text-center'>قيمة العقد</label>
                                <input value={contract_value} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setContract(e.target.value)} type="text" placeholder="Type here" className="p-2 bg-gray-50 rounded-xl w-full max-w-xs shadow-md border-2 border-yellow-600" />
                            </div>
                            <div className='flex gap-2 flex-col' >
                                <label className='font-bold text-zinc-100 bg-yellow-600 p-1 w-52 rounded-xl text-center'>عدد الأقساط</label>
                                <input type="text" placeholder="Type here" className="p-2 bg-gray-50 rounded-xl w-full max-w-xs shadow-md border-2 border-yellow-600" value={bills_num} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBillsNum(e.target.value)} />
                            </div>
                            <div className='flex gap-2 flex-col' >
                                <label className='font-bold text-zinc-100 bg-yellow-600 p-1 w-52 rounded-xl text-center'>قيمة القسط</label>
                                <input type="text" placeholder="Type here" className="p-2 bg-gray-50 rounded-xl w-full max-w-xs shadow-md border-2 border-yellow-600" value={bill_value} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBillValue(e.target.value)} />
                            </div>
                            <div className='flex gap-2 flex-col' >
                                <label className='font-bold text-zinc-100 bg-yellow-600 p-1 w-52 rounded-xl text-center'>الأقساط المدفوعة</label>
                                <input type="text" placeholder="Type here" className="p-2 bg-gray-50 rounded-xl w-full max-w-xs shadow-md border-2 border-yellow-600" value={bills_paid} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBillsPaid(e.target.value)} />
                            </div>
                            <div className='flex gap-2 flex-col' >
                                <label className='font-bold text-zinc-100 bg-yellow-600 p-1 w-52 rounded-xl text-center'>الأقساط المتبقية</label>
                                <input type="text" placeholder="Type here" className="p-2 bg-gray-50 rounded-xl w-full max-w-xs shadow-md border-2 border-yellow-600" value={bills_remaining} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBillsRem(e.target.value)} />
                            </div>
                            <div className='flex gap-2 flex-col' >
                                <label className='font-bold text-zinc-100 bg-yellow-600 p-1 w-52 rounded-xl text-center'>المكأفأت</label>
                                <input type="text" placeholder="Type here" className="p-2 bg-gray-50 rounded-xl w-full max-w-xs shadow-md border-2 border-yellow-600" value={rewards} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRewards(e.target.value)} />
                            </div>
                            <div className='flex gap-2 flex-col' >
                                <label className='font-bold text-zinc-100 bg-yellow-600 p-1 w-52 rounded-xl text-center'>الجزاءات</label>
                                <input type="text" placeholder="Type here" className="p-2 bg-gray-50 rounded-xl w-full max-w-xs shadow-md border-2 border-yellow-600" value={penalits} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPenalits(e.target.value)} />
                            </div>
                            <div className='flex gap-2 flex-col ' >
                                <label className='font-bold text-zinc-100 bg-yellow-600 p-1 w-52 rounded-xl text-center'>الصورة</label>
                                <input accept="image/*" type="file" placeholder="Type here" className="p-2 bg-gray-50 rounded-xl w-full max-w-xs shadow-md border-2 border-yellow-600" onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)} />
                            </div>
                            <div className='flex gap-2 flex-col' >
                                <label className='font-bold text-zinc-100 bg-yellow-600 p-1 w-52 rounded-xl text-center'>الصورة</label>
                                <img className="w-44 h-48 p-2 bg-gray-50 rounded-xl shadow-md border-2 border-yellow-600" src={image ? image : ''} />
                            </div>
                        </div>
                        <div className='mt-4'>
                            <button type='submit' className="btn hover:bg-green-300 bg-green-800 text-white hover:text-black">save</button>
                            <button className="btn hover:bg-green-300 bg-green-800 text-white hover:text-black mr-2" onClick={() => handleEdit()}>update</button>
                        </div>
                    </div>

                </form >

            </div >
    )
}


export default Add