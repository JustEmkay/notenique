import React from "react";
import {Outlet, Link, useMatch, useResolvedPath } from "react-router-dom";

const Navbar = () => {
 

  return (
    <nav className="flex flex-wrap text-4xl justify-between border-b-2 border-black py-4 px-10">
      <div>
        <label className="font-extrabold"><Link to="/test/home">Notenique.</Link></label>
      </div>
      <div className="flex flex-wrap gap-1 text-sm font-bold">
        <CustomLink to="/test/note">Notes</CustomLink>
        <CustomLink to="/test/node">Mindmap</CustomLink>
        <CustomLink to="/test/todo">ToDo</CustomLink>
        <CustomLink to="/test/profile">Profile</CustomLink>
      </div>
    </nav>
  );
  function CustomLink({ to, children, ...props }) {
    const resolvedPath = useResolvedPath(to);
    const isActive = useMatch({ path: resolvedPath.pathname, end: true });
    
    // function handleClick() {
    //   window.location.reload();
    // }
    return (
      <button
        className={
          isActive
            ? "middle none center rounded-lg border-2 py-3 px-6 font-sans font-bold uppercase transition-all border-black bg-black text-white "
            : "middle none center rounded-lg border-2 py-3 px-6 font-sans font-bold uppercase text-black transition-all hover:bg-gray-500/10"
        }
        // onClick={handleClick}
      >
        <Link to={to} {...props}>
          {children}
        </Link>
      </button>
    );
  }
};

export default Navbar;
