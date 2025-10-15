import React from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => (
  <header className="bg-blue-600 text-white py-4 text-center text-2xl font-semibold shadow">
    <Link to="/">🌤️</Link> Weather App
  </header>
);

export default Header;
