import { useDispatch } from "react-redux";
import { logout } from '../../redux/slicers/userSlice'
import { AppDispatch } from '../../redux/store';

const Header = () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}')

    const dispatch = useDispatch<AppDispatch>()
    const handleLogout = () => {
        console.log("logout");
        dispatch(logout());

        window.location.href = "/login";

        //navigator('/')
    };

    const handleLogin = () => {
        window.location.href = "/login";
    }
    return (
        <div className="navbar shadow-md text-white bg-zinc-900 w-full grid grid-cols-4" dir="ltr">
            <div className="navbar-start col-span-1  w-full" >
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
                    {
                        user?.data?.name ? (
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content   rounded-box z-[1] mt-3 w-52 p-2 shadow bg-zinc-900" >
                                {
                                    user?.data?.isAdmin || user?.data?.permission == 'الرياضات' ? (
                                        <li>
                                            <a>الرياضات</a>
                                            <ul className="p-2 bg-zinc-900" >
                                                <li><a href='games'>الألعاب</a></li>
                                                <li><a href='players'>الاعبين</a></li>
                                                <li><a href='coaches'>المدربين</a></li>
                                                <li><a href='prizes'>الجوائز</a></li>
                                            </ul>
                                        </li>
                                    ) : null
                                }
                                {
                                    user?.data?.isAdmin || user?.data?.permission == 'الموظفين' ? (
                                        <li><a href='staff'>الموظفين</a></li>
                                    ) : null
                                }
                                {
                                    user?.data?.isAdmin || user?.data?.permission == 'الرعاة' ? (
                                        <li>
                                            <a>الرعاة</a>
                                            <ul className="p-2 bg-zinc-900" >
                                                <li><a href='sponsor'>الراعي</a></li>
                                                <li><a href='player_sponsor'>راعي اللاعب</a></li>
                                                <li><a href='sport_sponsor'>راعي الرياضة</a></li>
                                                <li><a href='club_sponsor'>راعي النادي</a></li>
                                            </ul>
                                        </li>
                                    ) : null
                                }

                                {
                                    user?.data?.isAdmin || user?.data?.permission == 'المشتريات' ? (
                                        <li><a href='infra'>المشتريات</a></li>
                                    ) : null
                                }
                                {
                                    user?.data?.isAdmin || user?.data?.permission == 'الأعضاء' ? (
                                        <li><a href='members'>الأعضاء</a></li>
                                    ) : null
                                }
                                {
                                    user?.data?.isAdmin || user?.data?.permission == 'مجالس الادارات' ? (
                                        <li><a href='boards'>مجالس الادارات</a></li>
                                    ) : null
                                }
                                {
                                    user?.data?.isAdmin || user?.data?.permission == 'المحاضر' ? (
                                        <li><a href='lecs'>المحاضر</a></li>
                                    ) : null
                                }
                                {
                                    user?.data?.isAdmin || user?.data?.permission == 'المراسلات' ? (

                                        <li><a href='reporter'>المراسلات</a></li>) : null
                                }
                                {
                                    user?.data?.isAdmin ? (
                                        <li><a href='admin'>الادمن</a></li>) : null
                                }

                            </ul>
                        ) : null
                    }

                </div>
                <a className="btn btn-ghost text-xl" href='/'>
                    <img src='https://cdn-icons-png.flaticon.com/512/7438/7438654.png' className='h-12 w-12 border-2 border-yellow-600 rounded-xl' />
                </a>
            </div>

            <div className="navbar-end hidden lg:flex bg-zinc-900 col-span-3  w-full">
                {
                    user?.data ? <button className="bg-red-500 p-2 rounded-xl flex flex-col items-end " onClick={() => handleLogout()}>Logout</button> : <button className="rounded-xl bg-green-500 p-2 shadow-md" onClick={() => handleLogin()}>Login</button>
                }
                {
                    user?.data?.name ? (
                        <ul className="menu menu-horizontal px-1 bg-zinc-900" dir="rtl">
                            {
                                user?.data?.isAdmin || user?.data?.permission == 'الرياضات' ? (
                                    <li>
                                        <details>
                                            <summary>الرياضات</summary>
                                            <ul className="p-2 bg-yellow-600">
                                                <li className='hover:text-black'><a href='games '>الألعاب</a></li>
                                                <li className='hover:text-black'><a href='players'>الاعبين</a></li>
                                                <li className='hover:text-black'><a href='coaches'>المدربين</a></li>
                                                <li className='hover:text-black'><a href='prizes'>الجوائز</a></li>
                                            </ul>
                                        </details>
                                    </li>) : null}
                            {
                                user?.data?.isAdmin || user?.data?.permission == 'الرعاة' ? (
                                    <li>
                                        <details>
                                            <summary>الرعاة</summary>
                                            <ul className="p-2 bg-yellow-600 w-32">
                                                <li className='hover:text-black'><a href='sponsor'>الراعي</a></li>
                                                <li className='hover:text-black'><a href='player_sponsor'>راعي اللاعب</a></li>
                                                <li className='hover:text-black'><a href='sport_sponsor'>راعي الرياضة</a></li>
                                                <li className='hover:text-black'><a href='club_sponsor'>راعي النادي</a></li>
                                            </ul>
                                        </details>
                                    </li>) : null}
                            {
                                user?.data?.isAdmin || user?.data?.permission == 'الموظفين' ? (
                                    <li><a href='staff'>الموظفين</a></li>
                                ) : null
                            }
                            {
                                user?.data?.isAdmin || user?.data?.permission == 'المشتريات' ? (
                                    <li><a href='infra'>المشتريات</a></li>
                                ) : null
                            }
                            {
                                user?.data?.isAdmin || user?.data?.permission == 'الأعضاء' ? (
                                    <li><a href='members'>الأعضاء</a></li>
                                ) : null
                            }
                            {
                                user?.data?.isAdmin || user?.data?.permission == 'مجالس الادارات' ? (
                                    <li><a href='boards'>مجالس الادارات</a></li>
                                ) : null
                            }
                            {
                                user?.data?.isAdmin || user?.data?.permission == 'المحاضر' ? (
                                    <li><a href='lecs'>المحاضر</a></li>
                                ) : null
                            }
                            {
                                user?.data?.isAdmin || user?.data?.permission == 'المراسلات' ? (

                                    <li><a href='reporter'>المراسلات</a></li>) : null
                            }
                            {
                                user?.data?.isAdmin ? (
                                    <li><a href='admin'>الادمن</a></li>) : null
                            }

                        </ul>
                    ) : null
                }

            </div>


        </div>
    )
}

export default Header