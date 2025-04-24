import React from 'react';

type FloatingCloudProps = {
  text: string;
  top: string;
  left: string;
};

const FloatingCloud: React.FC<FloatingCloudProps> = ({ text, top, left }) => {
  return (
    <div
      className="absolute animate-float transition-all duration-300 ease-in-out hover:scale-105 cursor-pointer"
      style={{ top, left }}
    >
      <div
        className="relative px-6 py-4 min-w-[100px] max-w-[300px] text-center bg-no-repeat bg-contain bg-center text-gray-800 text-sm font-medium drop-shadow-md"
        style={{
          backgroundImage: `url('src/assets/special-3d-rendering-smooth-clouds-flowing-shapes-isolated-transparent-backgrounds-png.webp')`,
        }}
      >
        {text}
      </div>
    </div>
  );
};

export default FloatingCloud;

