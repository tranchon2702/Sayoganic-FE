import React from "react";

interface FloatingChatButtonProps {
  icon: React.ReactNode;
  link: string;
  bgColor: string;
  pulseColor: string;
  bottom: string;
}

const FloatingChatButton: React.FC<FloatingChatButtonProps> = ({
  icon,
  link,
  bgColor,
  pulseColor,
  bottom,
}) => (
  <a
    href={link}
    target="_blank"
    rel="noopener noreferrer"
    style={{
      position: "fixed",
      right: "24px",
      bottom,
      zIndex: 1000,
      textDecoration: "none",
    }}
  >
    <span className="pulse" style={{ background: pulseColor }}>
      <span
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 56,
          height: 56,
          borderRadius: "50%",
          background: bgColor,
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
        }}
      >
        {icon}
      </span>
    </span>
    <style>
      {`
        .pulse {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          position: relative;
          width: 72px;
          height: 72px;
          animation: pulse 1.5s infinite;
        }
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 ${pulseColor}; }
          70% { box-shadow: 0 0 0 16px ${pulseColor}33; }
          100% { box-shadow: 0 0 0 0 ${pulseColor}; }
        }
      `}
    </style>
  </a>
);

export default FloatingChatButton; 