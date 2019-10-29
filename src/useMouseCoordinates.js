import React, { useState, useEffect } from "react";

function useMouseCoordinates() {
  const [coords, setCoords] = useState([0, 0]);

  useEffect(() => {
    function handler({ clientX, clientY }) {
      setCoords([clientX, clientY]);
    }

    window.addEventListener("mousemove", handler);

    return () => window.removeEventListener("mousemove", handler);
  }, []);

  return coords;
}

export default useMouseCoordinates;
