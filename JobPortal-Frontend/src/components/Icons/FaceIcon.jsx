import React from 'react';

function FaceIcon({ fill = "#FFE4B5", size = "1em", stroke = "#000", ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      height={size}
      width={size}
      {...props}
    >
      <circle cx="256" cy="256" r="240" stroke={stroke} strokeWidth="20" fill={fill} />
      <circle cx="176" cy="200" r="24" fill={stroke} />
      <circle cx="336" cy="200" r="24" fill={stroke} />
      <path
        d="M176 330c30 40 130 40 160 0"
        stroke={stroke}
        strokeWidth="20"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export default FaceIcon;

  