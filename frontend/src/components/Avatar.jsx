import React from "react";

const Avatar = ({ src, className, onClick }) => {
  return (
    <>
      <img
        className={className}
        src={src}
        alt="Avatar"
        onClick={onClick ? onClick : undefined}
      />
    </>
  );
};

export default Avatar;
