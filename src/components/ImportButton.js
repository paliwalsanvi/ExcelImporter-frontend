import React from "react";
import "../styles/button.css"; 

const Button = ({ text }) => {
  return <button className="button">{text}</button>;
};

export default Button;
