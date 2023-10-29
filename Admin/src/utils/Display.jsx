import React, { useState, useEffect } from "react";

export const ImageDisplay = (props) => {
  const { base64ImageData } = props;
  const [imageSrc, setImageSrc] = useState("");
  const [imageType, setImageType] = useState("");

  const decodeAndDisplayImage = () => {
    if (base64ImageData) {
      const typeRegex = /^data:image\/([a-zA-Z]+);base64,/;
      const matches = base64ImageData.match(typeRegex);

      if (matches && matches.length > 1) {
        const extractedType = matches[1];
        setImageType(extractedType);
        setImageSrc(base64ImageData);
      }
    }
  };

  useEffect(() => {
    decodeAndDisplayImage();
    // console.log("ImageDisplay", base64ImageData);
  }, [base64ImageData]);

  return (
    <div>
      {imageType && (
        <img
          src={imageSrc}
          alt="Avatar Tailwind CSS Component"
          className="w-96 rounded-full max-w-3xl shadow-lg"
          loading="lazy"
        />
      )}
    </div>
  );
};
