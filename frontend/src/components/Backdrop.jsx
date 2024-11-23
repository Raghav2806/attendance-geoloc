import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classes from "./Backdrop.module.css";

export default function Backdrop() {
  const icons = [
    { icon: "book", size: "large", style: { top: "10%", left: "15%" } },
    { icon: "pencil-alt", size: "medium", style: { top: "40%", left: "30%" } },
    { icon: "chalkboard-teacher", size: "small", style: { top: "70%", left: "20%" } },
    { icon: "laptop", size: "large rotate", style: { top: "50%", left: "80%" } },
    { icon: "user-graduate", size: "medium", style: { top: "20%", left: "70%" } },
    { icon: "building-columns", size: "large", style: { top: "70%", left: "80%" } }, 
    { icon: "percentage", size: "small", style: { top: "40%", left: "10%" } }, 
    { icon: "brain", size: "medium", style: { top: "75%", left: "50%" } },    
    { icon: "square-root-variable", size: "medium", style: { top: "15%", left: "50%" } },    
  ];

  return (
    <div className={classes.backdrop}>
      {icons.map((item, index) => (
        <FontAwesomeIcon
          key={index}
          icon={item.icon}
          className={`${classes.icon} ${classes[item.size]}`}
          style={item.style}
        />
      ))}
    </div>
  );
}
