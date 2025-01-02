import { useState } from 'react'
import Add from '../../components/sports/prizes/Add'
import { prize, objectId } from '../../types/type'
import Details from '../../components/sports/prizes/Details'

import Filter from '../../components/sports/prizes/Filter'

type obj = prize & objectId
const Prizes = () => {
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

export default Prizes