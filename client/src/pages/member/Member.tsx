import { useState } from 'react'
import Add from '../../components/member/Add'
import { member, objectId } from '../../types/type'
import Details from '../../components/member/Details'

import Filter from '../../components/member/Filter'

type obj = member & objectId
const Infra = () => {

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

export default Infra