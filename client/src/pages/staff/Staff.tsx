import { useState } from 'react'
import Add from '../../components/staff/Add'
import { staff, objectId } from '../../types/type'
import Details from '../../components/staff/Details'

import Filter from '../../components/staff/Filter'

type obj = staff & objectId
const Staffs = () => {

    const [row, setRow] = useState<obj | null>(null);

    const [code, setCode] = useState('')
    const [name, setName] = useState('')
    return (
        <div className='container flex flex-col gap-4 '>
            <Add row={row} />
            <Filter name={name} setName={setName} code={code} setCode={setCode} />
            <Details setRow={setRow} row={row} name={name} code={code} />

        </div>
    )
}

export default Staffs