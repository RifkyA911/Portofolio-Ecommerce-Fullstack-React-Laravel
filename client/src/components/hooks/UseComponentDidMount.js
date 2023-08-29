import { useEffect, useRef } from "react";

const useComponentDidMount = () => {
  const ref = useRef();
  useEffect(() => {
    ref.current = true;
  }, []);
  return ref.current;
};

export default useComponentDidMount;
