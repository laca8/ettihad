import { useState } from 'react'
import Add from '../../components/lecture/Add'
import Details from '../../components/lecture/Details'
import { lecture, objectId } from '../../types/type'
type obj = lecture & objectId
import Filter from '../../components/lecture/Filter'
const Lectures = () => {
    const [row, setRow] = useState<obj | null>(null);
    const [code, setCode] = useState('')
    const [par, setPar] = useState('')


    return (
        <div className='container flex flex-col gap-4 '>
            <Add row={row} />
            <Filter code={code} setCode={setCode} setPar={setPar} par={par} />
            <Details setRow={setRow} row={row} code={code} par={par} />

        </div>
    )
}

export default Lectures