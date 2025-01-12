import { useState } from 'react'
import Add from '../../components/boards/Add'
import Details from '../../components/boards/Details'
import { board, objectId } from '../../types/type'
type obj = board & objectId
import Filter from '../../components/boards/Filter'
const Boards = () => {
    const [row, setRow] = useState<obj | null>(null);
    const [code, setCode] = useState('')


    return (
        <div className='container flex flex-col gap-4 '>
            <Add row={row} />
            <Filter code={code} setCode={setCode} />
            <Details setRow={setRow} row={row} code={code} />

        </div>
    )
}

export default Boards