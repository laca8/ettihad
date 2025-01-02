import { useState } from 'react'
import Add from '../../components/sponsers/sponsor_sport/Add'
import { sport_sponsor, objectId } from '../../types/type'
import Details from '../../components/sponsers/sponsor_sport/Details'
import Filter from '../../components/sponsers/sponsor_sport/Filter'
type obj = sport_sponsor & objectId


const Sport_Sponsor = () => {
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

export default Sport_Sponsor