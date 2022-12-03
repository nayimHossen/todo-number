import React from "react";

const SelectedCart = ({ number, index }) => {
  return (
    <>
      <div className="border rounded p-2 my-2 bg-white">
        <div className="font-bold flex justify-start gap-10">
          <span>{index + 1}.</span>
          {number}
        </div>
      </div>
    </>
  );
};

export default SelectedCart;
