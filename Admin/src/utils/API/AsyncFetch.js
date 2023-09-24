async function fetchData(url) {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/admins");
      const data = await response.json();
      setAdmins(data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false); // Set loading to false in case of error too
    }
  }