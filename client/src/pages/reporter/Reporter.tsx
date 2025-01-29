import { useState } from 'react'
import Add from '../../components/reporter/Add'
import Details from '../../components/reporter/Details'
import { reporter, objectId } from '../../types/type'
type obj = reporter & objectId
import Filter from '../../components/reporter/Filter'
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