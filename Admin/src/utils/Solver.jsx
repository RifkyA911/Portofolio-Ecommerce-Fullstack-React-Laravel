import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { refreshScreen } from "./../Redux/Slices/UISlice.js";

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

export const IsScreenResize = (props) => {
  const { monitoring = false } = props;
  const { screenWidth, screenHeight } = useSelector((state) => state.refresh);
  const [screenSize, setScreenSize] = useState({ screenWidth, screenHeight });

  const dispatch = useDispatch();

  useEffect(() => {
    const handleResize = () => {
      const newScreenWidth = window.innerWidth;
      const newScreenHeight = window.innerHeight;

      // Update local state
      setScreenSize({
        screenWidth: newScreenWidth,
        screenHeight: newScreenHeight,
      });

      // Dispatch action to update Redux state
      dispatch(
        refreshScreen({
          screenWidth: newScreenWidth,
          screenHeight: newScreenHeight,
        })
      );
    };

    // Add resize event listener
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [dispatch]);

  if (monitoring) {
    console.log(screenSize);
  }
};

export const IsResponsive = (props) => {
  const { screenWidth, screenHeight } = useSelector((state) => state.refresh);
  const [screenSize, setScreenSize] = useState({ screenWidth, screenHeight });

  const dispatch = useDispatch();

  useEffect(() => {
    if (screenWidth < 1024) {
      if (screenWidth < 768) {
        if (screenWidth < 540) {
          setScreenSize(`40vh`);
        }
        setScreenSize(`70vh`);
      }
      setScreenSize(`110vh`);
    }
  }, [screenWidth, screenHeight]);

  return screenWidth;
};
