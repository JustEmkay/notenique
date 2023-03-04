import { useState, useEffect } from "react";
import {  Outlet } from "react-router-dom";
import BarLoader from "react-spinners/BarLoader";
import Navbar from "./Comps/Navbar";
var u_email = localStorage.getItem("email");

const Test = () => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 800);
  }, []);
  return (
    <div>
      {loading ? (
        <div className="loading">
          <BarLoader color="#000000" height={9} width={200} />
        </div>
      ) : (
        <div>       
          <Navbar />
          <div className="">
            <Outlet />
          </div>

          {/* {Components} */}
        </div>
      )}
    </div>
  );
};

export default Test;
