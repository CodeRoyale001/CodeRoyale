import React from "react";

const CodeRoyaleLogo: React.FC = () => (
  <div className="relative flex group">
    {/* CODE container */}
    <div className="relative z-10 w-24 text-center">
      <span className="font-bold text-xl tracking-wide transition-colors duration-300 text-primary-foreground group-hover:text-primary">
        CODE
      </span>
    </div>
    {/* ROYALE container */}
    <div className="relative z-10 w-24 text-center">
      <span className="font-bold text-xl tracking-wide transition-colors duration-300 text-primary group-hover:text-primary-foreground">
        ROYALE
      </span>
    </div>
    {/* Sliding background */}
    <div className="absolute top-0 left-0 w-24 h-full bg-primary rounded-sm transition-all duration-300 group-hover:left-24"></div>
  </div>
);

export default CodeRoyaleLogo;
