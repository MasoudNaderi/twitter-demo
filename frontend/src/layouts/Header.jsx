import React, { useEffect, useRef, useState } from "react";
import Avatar from "../components/Avatar";

const Header = ({ user, setUser }) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => setOpen(!open);

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <div className="w-full text-gray-200 flex items-center justify-between py-4">
      <h1 className=" text-2xl font-bold ">Home</h1>
      <div className="relative flex items-center justify-center ">
        {/* hamburger button */}
        <button
          onClick={toggleMenu}
          className="p-3 rounded-full bg-gray-200 shadow-md hover:bg-gray-50"
        >
          <svg
            className="w-6 h-6 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        {/* dropdown menu */}
        {open && (
          <div
            ref={menuRef}
            className="absolute right-0 mt-12 w-48 bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <a
              href="#"
              className="flex items-center gap-2 w-full px-4 py-3 text-gray-700 hover:bg-gray-100"
            >
              <Avatar src={user.avatar} className="h-7 w-7 rounded-full" />
              <span>{user.name}</span>
            </a>
            <hr className="border-gray-200" />
            <a
              onClick={handleLogout}
              href="#"
              className="block px-4 py-3 text-red-600 hover:bg-red-100"
            >
              Log Out
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
