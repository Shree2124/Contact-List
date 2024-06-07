import React from "react";

const Errors = ({error}) => {
  return <div>
    <h3 className="text-red-400">{error}</h3>
  </div>;
};

export default Errors;
