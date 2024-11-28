import React, { useState } from "react";
import styled from "styled-components";

type HighlightProps = {
  position: "left" | "right";
};

// Styled container for the toggle
const ToggleContainer = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  border: 2px solid #ddd;
  border-radius: 20px;
  background-color: #ccc;
  overflow: hidden;
  width: 200px;
  cursor: pointer;
`;

// Styled highlight to indicate selection
const Highlight = styled.div<HighlightProps>`
  position: absolute;
  height: 100%;
  width: 50%;
  background-color: #007bff;
  transition: transform 0.3s ease;
  transform: ${(props) =>
    props.position === "left" ? "translateX(0)" : "translateX(100%)"};
`;

// Styled component for each option
const Option = styled.div`
  flex: 1;
  text-align: center;
  padding: 10px;
  color: white;
  z-index: 1;
`;

// Add props type
type RoleToggleProps = {
  role: "student" | "teacher";
  setRole: React.Dispatch<React.SetStateAction<"student" | "teacher">>;
};

const RoleToggle: React.FC<RoleToggleProps> = ({ role, setRole }) => {
  const toggleRole = () => setRole(role === "student" ? "teacher" : "student");

  return (
    <ToggleContainer onClick={toggleRole}>
      <Highlight position={role === "student" ? "left" : "right"} />
      <Option>Student</Option>
      <Option>Teacher</Option>
    </ToggleContainer>
  );
};

export default RoleToggle;
