import React, { ReactNode } from "react";
import Header from "../components/Header";

interface DefaultLayoutProps {
  children?: ReactNode;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-blue-50">
      <Header />
      <main className="p-4">
        {children} {/* render children instead of Outlet */}
      </main>
    </div>
  );
};

export default DefaultLayout;
