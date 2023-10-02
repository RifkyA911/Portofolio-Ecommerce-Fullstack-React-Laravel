import { useState, useEffect } from "react";
// Components
import Skeleton from "@mui/material/Skeleton";
import { DangerAlert, WarningAlert } from "../components/Alert";
import {
  ShowAdminName,
  ShowRole,
  AuthorityToggle,
  ActionButton,
} from "./../components/Admins/AdminsTableBody";
import {
  MyTableEngine,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  MyTablePagination,
} from "../components/Table/MyTableEngine";
// Layout
import { Container, Content } from "../Layout";
// REDUX
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
// UTILS
import { MuiIcon } from "../utils/RenderIcons";

// define fetch data URL by products
const initUrl = import.meta.env.VITE_API_URL_GET_ALL_PRODUCT;

export default function Products() {
  const [products, setProducts] = useState([
    // {
    //   id: "loading",
    //   name: "loading",
    //   category: "loading",
    //   price: "loading",
    //   stock: "loading",
    //   discount: "loading",
    //   pict: "loading",
    //   description: "loading",
    //   created_at: "loading",
    //   updated_at: "loading",
    // },
  ]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(true);

  const [length, setLengthData] = useState();
  const [paginate, setPaginate] = useState(1);
  const [rows, setRows] = useState(10);

  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const URL = `${initUrl}/paginate/${paginate}/${rows}`;

  const fetchProducts = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      // console.table(data.data);
      setLoading(false);
      setProducts(data.data);
      setErrorMessage(null);
      setLengthData(data.message.length);
    } catch (error) {
      setLoading(false);
      let message = "Gagal Fetching Product";
      setErrorMessage(message);
      console.error(message, error);
    }
  };

  useEffect(() => {
    fetchProducts(URL);
  }, []);

  useEffect(() => {
    // Filter data based on the search term
    const filteredData = products.filter((products) =>
      products.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(filteredData);
  }, [searchTerm, products]);

  // Handler ketika nilai rows diubah
  const handleRowsChange = (newRows) => {
    setLoading(true);
    setRows(newRows);
  };

  // Handler ketika nilai paginate diubah
  const handlePaginateChange = (newPaginate) => {
    setLoading(true);
    setPaginate(newPaginate);
    console.log(newPaginate);
  };

  // Panggil fetchData saat komponen pertama kali dimuat atau saat value paginate, rows berubah
  useEffect(() => {
    fetchProducts(URL);
  }, [paginate, rows]);

  return (
    <>
      <Container>
        <Content pageName={"Products"}>
          {!loading && (
            <>
              <div>
                {errorMessage && (
                  <>
                    <DangerAlert
                      message={
                        <h1>
                          <MuiIcon
                            iconName={"FiberManualRecordTwoTone"}
                            fontSize={20}
                          />
                          {errorMessage}
                        </h1>
                      }
                    />
                    {URL}
                    <button
                      onClick={() => {
                        fetchProducts(URL);
                        setLoading(true);
                      }}
                      className="mx-1 grow-0 shrink-0 focus:outline-none bg-gradient-to-r from-lime-500 to-green-400 p-2 rounded-md font-roboto-medium text-white items-center "
                    >
                      <MuiIcon
                        iconName={"FiberManualRecordTwoTone"}
                        fontSize={20}
                      />
                    </button>
                  </>
                )}
              </div>

              <table className="table text-gray-700 font-roboto-medium">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Category</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, index) => (
                    <tr key={product.id}>
                      <td>{product.name}</td>
                      <td>{product.category}</td>
                      <td>{product.price}</td>
                    </tr>
                  ))}
                </tbody>
                {/* <MyTablePagination
                  paginate={paginate}
                  onChangePaginate={handlePaginateChange}
                  rows={rows}
                  onRowsChange={handleRowsChange}
                  length={length}
                /> */}
              </table>
            </>
          )}
        </Content>
      </Container>
    </>
  );
}
