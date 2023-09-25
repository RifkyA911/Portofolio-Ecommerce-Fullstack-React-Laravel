async function fetchData(url) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      // console.log(data)
      return {
        response: 200,
        message: "fetching data success",
        error: null,
        data: data.data,
        loading: false,
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      return {
        response: 400,
        message: "fetching data success",
        error: error,
        data: data.data,
        loading: false,
      }
    }
  }

  export default fetchData;