import React from "react";
import "../styles/Offcanvas.css";

interface OffcanvasProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Offcanvas: React.FC<OffcanvasProps> = ({ isOpen, onClose, children }) => {
  return (
    <div className={`offcanvas ${isOpen ? "open" : ""}`}>
      <div className="overlay" onClick={onClose}></div>
      <div className="content">
        <button className="close-button" onClick={onClose}>
          Close
        </button>
        {children}
      </div>
    </div>
  );
};

export default Offcanvas;
