import React, { useState } from "react";

import { BallCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";

const Tech = () => {
  const [hoveredTech, setHoveredTech] = useState(null);

  return (
    <div className="flex flex-row flex-wrap justify-center gap-10">
      {technologies.map((technology) => (
        <div
          className="relative w-28 h-28"
          key={technology.name}
          onMouseEnter={() => setHoveredTech(technology.name)}
          onMouseLeave={() => setHoveredTech(null)}
        >
          <BallCanvas icon={technology.icon} />
          {hoveredTech === technology.name && (
            <div className="absolute text-center mt-.5 w-full ">
              {technology.name}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default SectionWrapper(Tech, "");
