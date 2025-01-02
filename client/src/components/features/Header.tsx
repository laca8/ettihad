
const Header = () => {
    return (
        <div className="navbar shadow-md text-white bg-zinc-900 " >
            <div className="navbar-start" >
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden" >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content   rounded-box z-[1] mt-3 w-52 p-2 shadow bg-zinc-900" >
                        <li>
                            <a>Sports</a>
                            <ul className="p-2 bg-zinc-900" >
                                <li><a href='games'>Games</a></li>
                                <li><a href='players'>Players</a></li>
                                <li><a href='coaches'>Coaches</a></li>
                                <li><a href='prizes'>Prizes</a></li>
                            </ul>
                        </li>
                        <li><a href='staff'>Staff</a></li>
                        <li>
                            <a>Sponsors</a>
                            <ul className="p-2 bg-zinc-900" >
                                <li><a href='sponsor'>Sponsor</a></li>
                                <li><a href='player_sponsor'>Player Sponsor</a></li>
                                <li><a href='sport_sponsor'>Sport Sponsor</a></li>
                                <li><a href='club_sponsor'>Club Sponsor</a></li>
                            </ul>
                        </li>
                        <li><a href='infra'>Infra</a></li>
                        <li><a href='members'>Members</a></li>


                    </ul>
                </div>
                <a className="btn btn-ghost text-xl" href='/'>
                    <img src='https://cdn-icons-png.flaticon.com/512/7438/7438654.png' className='h-12 w-12 border-2 border-yellow-600 rounded-xl' />
                </a>
            </div>
            <div className="navbar-end hidden lg:flex bg-zinc-900" >
                <ul className="menu menu-horizontal px-1 bg-zinc-900">
                    <li>
                        <details>
                            <summary>Sports</summary>
                            <ul className="p-2 bg-yellow-600">
                                <li className='hover:text-black'><a href='games '>Games</a></li>
                                <li className='hover:text-black'><a href='players'>Players</a></li>
                                <li className='hover:text-black'><a href='coaches'>Coaches</a></li>
                                <li className='hover:text-black'><a href='prizes'>Prizes</a></li>
                            </ul>
                        </details>
                    </li>
                    <li><a href='staff'>Staff</a></li>
                    <li>
                        <details>
                            <summary>Sponsors</summary>
                            <ul className="p-2 bg-yellow-600 w-36">
                                <li className='hover:text-black'><a href='sponsor'>Sponsor</a></li>
                                <li className='hover:text-black'><a href='player_sponsor'>Player Sponsor</a></li>
                                <li className='hover:text-black'><a href='sport_sponsor'>Sport Sponsor</a></li>
                                <li className='hover:text-black'><a href='club_sponsor'>Club Sponsor</a></li>

                            </ul>
                        </details>
                    </li>
                    <li><a href='infra'>Infra</a></li>
                    <li><a href='members'>Members</a></li>

                </ul>
            </div>

        </div>
    )
}

export default Header