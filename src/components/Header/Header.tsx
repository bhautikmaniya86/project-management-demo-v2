import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="bg-purple-300 text-white px-5 py-4 fixed w-full z-10">
      <h2 className="text-2xl">
        <Link to={`/projects`}>Project Management</Link>
      </h2>
    </div>
  );
};

export default Header;
