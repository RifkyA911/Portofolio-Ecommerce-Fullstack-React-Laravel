import ProductContent from "../components/content/ProductContent";
import Footer from "../layouts/Footer";
import Header from "../layouts/Header";
import Layout from "../layouts/Layout";

const ProductDetails = () => {
  return (
    <Layout>
      <Header />
      <main className="w-full">
        <div className="max-w-screen-xl mx-auto">
          <ProductContent />
        </div>
      </main>
      <Footer />
    </Layout>
  );
};

export default ProductDetails;
