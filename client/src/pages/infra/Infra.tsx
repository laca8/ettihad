import { useState } from 'react'
import Add from '../../components/infra/Add'
import { infra, objectId } from '../../types/type'
import Details from '../../components/infra/Details'

import Filter from '../../components/infra/Filter'

type obj = infra & objectId
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