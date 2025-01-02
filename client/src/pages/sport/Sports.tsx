import { useState } from 'react'
import Add from '../../components/sports/sport/Add'
import Details from '../../components/sports/sport/Details'
import { sport, objectId } from '../../types/type'
type obj = sport & objectId
import Filter from '../../components/sports/sport/Filter'
const Sports = () => {
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

export default Sports