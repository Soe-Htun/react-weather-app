import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const DefaultLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-blue-50">
      <Header />
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default DefaultLayout;
