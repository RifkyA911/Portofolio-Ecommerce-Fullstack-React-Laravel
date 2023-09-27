import { useState, useEffect } from "react";
import { Container, Content } from "../Layout";
import { MyTableEngine } from "./../components/Table/MyTableEngine.jsx";
export default function Products() {
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/products/")
      .then((response) => response.json())
      .then((data) => {
        // console.log(data.data[0]); // Cek data untuk pemeriksaan
        // console.table(data.data);)
        // console.log(data);
        // console.table(products);
        setProducts(data.data);

        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [loading]);

  return (
    <>
      <Container>
        <Content pageName={"Products"}>
          {!loading && (
            <>
              {/* <MyTableEngine inputData={products} /> */}

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
              </table>
            </>
          )}
        </Content>
      </Container>
    </>
  );
}
