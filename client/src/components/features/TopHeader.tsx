import React from "react";
import { useDispatch } from "react-redux";
import { logout } from '../../redux/slicers/userSlice'
import { AppDispatch } from '../../redux/store';
const TopHeader = () => {
  const dispatch = useDispatch<AppDispatch>()
  const user = JSON.parse(localStorage.getItem('user') || '{}')

  const handleLogout = () => {
    console.log("logout");
    dispatch(logout());
    window.location.href = "/login";
  };

  const handleLogin = () => {
    window.location.href = "/login";
  }
  return (
    <div className="navbar bg-gray-100 shadow-xl" dir='ltr'>
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
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
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
        </div>
        <a className="btn btn-ghost text-xl" href="/">
          <img
            src="https://cdn-icons-png.flaticon.com/512/7438/7438654.png"
            className="h-12 w-12 border-2 border-yellow-600 rounded-xl"
          />
        </a>
      </div>

      <div className="navbar-end">
        {user?.data ? (
          <button
            className="btn bg-red-500 p-2 rounded-xl flex flex-col items-end "
            onClick={() => handleLogout()}>
            Logout
          </button>
        ) : (
          <button
            className="btn rounded-xl bg-green-500 p-2 shadow-md"
            onClick={() => handleLogin()}>
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default TopHeader;
