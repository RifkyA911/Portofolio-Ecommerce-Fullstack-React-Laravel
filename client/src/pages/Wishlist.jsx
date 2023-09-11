import Footer from "../layouts/Footer";
import Header from "../layouts/Header";
import Layout from "../layouts/Layout";
import Container from "../layouts/Container";
import WishlistContent from "../components/content/WishlistContent";

const Wishlist = () => {
  return (
    <Layout>
      <Header />
      <Container>
        <WishlistContent />
      </Container>
      <Footer />
    </Layout>
  );
};

export default Wishlist;
