import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { IoMenu } from "react-icons/io5";

const Navbar = () => {
  const [menu, setMenu] = useState(false);
  function handleMenu() {
    setMenu(!menu);
  }
  return (
    <div>
    <div className="flex justify-between p-4 shadow-xl ">
      <div>Hello</div>

      <div className="flex gap-4 hidden md:flex">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        {/* <NavLink to="/footer">Footer</NavLink> */}
        <NavLink to="/login">Log in</NavLink>
        <NavLink to="/signin">Sign in</NavLink>
      </div>

      <div className="sm:flex md:hidden">
        <button onClick={handleMenu} className="text-2xl">
          <IoMenu />
        </button>
      </div>
    </div>
    <div className="flex justify-end float-end ">
        {menu&&
        <div className='flex gap-4 flex-col justify-center items-center p-4 bg-red-500 fixed w-70 h-[90%]'>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/about">About</NavLink>
      {/* <NavLink to="/footer">Footer</NavLink> */}
      <NavLink to="/login">Log in</NavLink>
      <NavLink to="/signin">Sign in</NavLink>
    </div>
    }
    </div>
    </div>
  );
};

export default Navbar;
