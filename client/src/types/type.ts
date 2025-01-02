export type objectId = { _id: string };

export  type sport = {
    code: number,
    game: string,
    date: string,
    manager: string,
    nums: number,
    stadiums:{
        stadium:string
    }[]
}

export  type player = {
    code: number,
    name:string,
    game: string,
    sex: string,
    national_Id: string,
    address: string,
    phone1: string,
    phone2: string,
    contract_value: string,
    bills_num: string,
    bill_value:string,
    bills_paid:string,
    bills_remaining:string,
    rewards:string,
    penalits:string,
    image:string
}

export  type coach = {
    code: number,
    name:string,
    game: string,
    sex: string,
    national_Id: string,
    address: string,
    phone1: string,
    phone2: string,
    named: string,
    salary: string,
    contract_value: string,
    contract_date: string,
    experiance:string,
    rewards:string,
    contracts:string,
    
    image:string
}
export  type prize = {
    code: number,
    name:string,
    date: string,
    player: string,
    game: string,
    position: string,
    coach: string,
    manager: string,
    notes: string,
    image:string
}



export  type staff = {
    code: number,
    name:string,
    national_Id:string,
    salary: string,
    address: string,
    phone1: string,
    phone2: string,
    job: string,
    game: string,
    image:string
}

export  type infra = {
    code: number,
    name:string,
    date:string,
    salary: number,
    item: string,
    itemType: string,
    notes: string,
    buyer: string,
    seller: string,
    num: number,
    total:number,
    image:string
}
export  type sponsor = {
    code: number,
    name:string,
    manager:string,
    job: string,
    address1: string,
    address2: string,
    phone1: string,
    phone2: string,
    notes: string,
    image:string
}
export  type player_sponsor = {
    code: number,
    name:string,
    manager:string,
    job: string,
    address1: string,
    address2: string,
    phone1: string,
    phone2: string,
    notes: string,
    image:string,
    player:string,
    game:string
}

export  type sport_sponsor = {
    code: number,
    name:string,
    manager:string,
    job: string,
    address1: string,
    address2: string,
    phone1: string,
    phone2: string,
    notes: string,
    image:string,
    game:string
}

export  type club_sponsor = {
    code: number,
    name:string,
    manager:string,
    job: string,
    address1: string,
    address2: string,
    phone1: string,
    phone2: string,
    notes: string,
    image:string,
    club:string
}


export  type member = {
    code: number,
    name:string,
    sex:string,
    job: string,
    address: string,
    national_Id: string,
    date: string,
    phone2: string,
    notes: string,
    image:string,
    phone1:string,
    address_work:string,
    member_type:string,
    last_pay:string,
    member_status:string,
}