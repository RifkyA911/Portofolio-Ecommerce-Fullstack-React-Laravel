import { useState } from "react";

export const TestFetch = (props) => {
  const [state, set] = useState(null);

  async function Fetch(url) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      //yoursetState (data.data);
      set(data.data);
    } catch (error) {
      console.error(`Error fetching data:`, error);
    }
  }

  useEffect(() => {
    Fetch(`${import.meta.env.VITE_API_ALL_PRODUCT}/1/10`);
  }, []);
  return (
    <>
      {state ? (
        <>
          {state.map((data, index) => (
            <p key={index}>{data.name}</p>
          ))}
        </>
      ) : (
        <>No Data</>
      )}
      <div></div>
    </>
  );
};
