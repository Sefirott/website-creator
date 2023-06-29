import { useState, useRef, MouseEvent, useEffect } from "react";

function Toolbar() {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const dragRef = useRef<HTMLDivElement>(null);
  const dragStartCoords = useRef({ x: 0, y: 0 });
  const dragOffset = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseUp = () => {
      setIsDragging(false);
    };

    const handleMouseMove = (e: any) => {
      if (!isDragging) return;

      const deltaX = e.clientX - dragStartCoords.current.x;
      const deltaY = e.clientY - dragStartCoords.current.y;

      dragOffset.current = { x: deltaX, y: deltaY };
      setPosition((prevPosition) => ({
        x: prevPosition.x + deltaX,
        y: prevPosition.y + deltaY,
      }));

      dragStartCoords.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isDragging]);

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    dragStartCoords.current = { x: e.clientX, y: e.clientY };
    dragOffset.current = { x: 0, y: 0 };
  };

  return (
    <div
      className="toolbar"
      style={{ position: "absolute", top: position.y, left: position.x }}
      ref={dragRef}
      onMouseDown={handleMouseDown}
    >
    </div>
  );
}

export default Toolbar;
