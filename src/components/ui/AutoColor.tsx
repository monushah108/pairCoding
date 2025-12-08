import React from "react";
import randomColor from "randomcolor";

interface AutoColorProps {
  name: string;
  time: string;
}

const AutoColor: React.FC<AutoColorProps> = ({ name, time }) => {
  const color = React.useMemo(
    () =>
      randomColor({
        seed: name,
        luminosity: "bright",
      }),
    [name]
  );

  return (
    <div className="flex items-baseline gap-2 mb-1">
      <span className="text-sm capitalize" style={{ color }}>
        {name}{" "}
      </span>
      <span className="text-[10px] text-[#6a6a6a]">{time}</span>
    </div>
  );
};

export default AutoColor;
