import CartContent from "../components/content/CartContent";
import Container from "../layouts/Container";
import Footer from "../layouts/Footer";
import Header from "../layouts/Header";
import Layout from "../layouts/Layout";

const Cart = () => {
  return (
    <Layout>
      <Header />
      <Container>
        <CartContent />
      </Container>
      <Footer />
    </Layout>
  );
};

export default Cart;
