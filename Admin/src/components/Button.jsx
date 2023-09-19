import React from "react";

export const SuccessButton = (props) => {
  const { message } = props;
  // Konten komponen
  return (
    <>
      <button className="btn btn-info">Info</button>
      <button className="btn btn-success">Success</button>
      <button className="btn btn-warning">Warning</button>
      <button className="btn btn-error">Error</button>
    </>
  );
};
