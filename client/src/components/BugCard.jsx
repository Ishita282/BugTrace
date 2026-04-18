import React from "react";
import { useNavigate } from "react-router-dom";

const BugCard = ({ bug }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/bug/${bug._id}`)}
      className="bg-white p-4 rounded shadow cursor-pointer hover:shadow-md"
    >
      <p>{bug._id}</p>
      <h2>{bug.title}</h2>
      <p>{bug.description}</p>
    </div>
  );
};

export default BugCard;
