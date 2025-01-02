import { useState } from 'react'
import Add from '../../components/sports/players/Add'
import Details from '../../components/sports/players/Details'
import { objectId, player } from '../../types/type'
import Filter from '../../components/sports/players/Filter'

type obj = player & objectId
const Players = () => {
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

export default Players