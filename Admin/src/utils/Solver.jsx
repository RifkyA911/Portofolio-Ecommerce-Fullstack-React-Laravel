import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { refreshScreen } from "./../Redux/Slices/UISlice";
import { DateFormatter } from "./Formatter.js";

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

export const isOutdated = (
  inputDate,
  exception = ["Last Year", "Last Month", "Last Week"],
  typeData = "char"
) => {
  const splitDate = (input, level) => {
    const splittedDate = input.split("-");
    if (level == "year") {
      return splittedDate[0];
    } else if (level == "month") {
      return splittedDate[1];
    } else if (level == "date") {
      return splittedDate[2];
    } else {
      return splittedDate;
    }
  };

  const now = DateFormatter("date");

  const nowYear = parseInt(splitDate(now, "year"));
  const nowMonth = parseInt(splitDate(now, "month"));
  const nowDate = parseInt(splitDate(now, "date"));
  const inputDateYear = parseInt(splitDate(inputDate, "year"));
  const inputDateMonth = parseInt(splitDate(inputDate, "month"));
  const inputDateDate = parseInt(splitDate(inputDate, "date"));

  // console.log(nowYear, nowMonth, nowDate);\
  if (now == DateFormatter("date", inputDate) && !exception.includes("Today")) {
    return "Today";
  } else if (nowYear - inputDateYear == 1 && !exception.includes("Last Year")) {
    return "Last Year";
  } else if (nowDate - inputDateDate == 7 && !exception.includes("Last Week")) {
    return "Last Week";
  } else if (
    nowMonth - inputDateMonth == 1 &&
    !exception.includes("Last Month")
  ) {
    return "Last Month";
  } else if (nowDate - inputDateDate == 1 && !exception.includes("Yesterday")) {
    return "Yesterday";
  } else {
    return null;
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

export const sumData = (inputData) => {
  const totalQuantity = inputData.reduce((accumulator, currentItem) => {
    return accumulator + currentItem.quantity;
  }, 0);

  return totalQuantity;
};
