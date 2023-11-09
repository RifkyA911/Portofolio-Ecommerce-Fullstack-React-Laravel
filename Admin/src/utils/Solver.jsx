import { useEffect } from "react";

// Fungsi untuk membandingkan objek secara mendalam
export function isObjectsEqual(objA, objB) {
  if (objA === objB) {
    return true;
  }

  if (Object.keys(objA).length !== Object.keys(objB).length) {
    return false;
  }

  for (const key in objA) {
    if (objA[key] !== objB[key]) {
      return false;
    }
  }

  return true;
}

export const IsThisAnImage = (src) => {
  if (src) {
    const typeRegex = /^data:image\/([a-zA-Z]+);base64,/;
    const matches = src.match(typeRegex); // .test
    if (matches && matches.length > 1) {
      const extractedType = matches[1];
      return true;
    }
  } else {
    return false;
  }
};

export const isClickedOutside = (divRef) => {
  function handleClick(event) {
    if (divRef.current && divRef.current.contains(event.target)) {
      // Tangani klik di dalam elemen div
      console.log("ya");
    } else {
      // Tangani klik di luar elemen div
      console.log("luar");
    }
  }

  // Tambahkan event listener untuk mendengarkan semua klik
  document.addEventListener("click", handleClick);

  return () => {
    // Hapus event listener saat komponen unmount
    document.removeEventListener("click", handleClick);
  };
};
