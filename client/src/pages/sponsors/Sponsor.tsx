import { useState } from 'react'
import Add from '../../components/sponsers/sponsor/Add'
import { sponsor, objectId } from '../../types/type'
import Filter from '../../components/sponsers/sponsor/Filter'
import Details from '../../components/sponsers/sponsor/Details'
type obj = sponsor & objectId


const Sponsor = () => {
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

export default Sponsor