import React from "react";
import { useNavigate } from "react-router-dom";
import BasicIcons from "./BasicIcons"
const BackButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="flex rounded"
    >
      <BasicIcons name="back" className="w-9 h-9"/>
    </button>
  );
};

export default BackButton;
