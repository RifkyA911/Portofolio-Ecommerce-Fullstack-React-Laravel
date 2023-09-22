import { useEffect } from "react";
import ProductContent from "../components/content/ProductContent";
import Header from "../layouts/Header";
import Layout from "../layouts/Layout";

const ProductDetailsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <Header />
      <main className="flex flex-col w-full flex-grow max-w-screen-xl ">
        <ProductContent />
      </main>
    </Layout>
  );
};

export default ProductDetailsPage;
