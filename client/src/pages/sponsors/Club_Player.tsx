import { useState } from 'react'
import Add from '../../components/sponsers/sponsor_club/Add'
import { club_sponsor, objectId } from '../../types/type'
import Details from '../../components/sponsers/sponsor_club/Details'
import Filter from '../../components/sponsers/sponsor_club/Filter'
type obj = club_sponsor & objectId

const Club_Sponsor = () => {
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

export default Club_Sponsor