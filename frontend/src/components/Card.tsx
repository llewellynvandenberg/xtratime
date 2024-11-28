import React from "react";
import "../styles/Card.css";

interface CardProps {
  title: string;
  children: React.ReactNode;
  classN: String;
}

const Card: React.FC<CardProps> = ({ title, classN, children }) => {
  return (
    <div className={`card ${classN}`}>
      <div className="card-header">
        <h4>{title}</h4>
      </div>
      <div className="card-body">{children}</div>
    </div>
  );
};

export default Card;
