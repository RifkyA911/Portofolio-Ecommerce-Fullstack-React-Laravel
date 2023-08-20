import Content from "../components/Content";
import Hero from "../components/Hero";
import Container from "../layouts/Container";
import Footer from "../layouts/Footer";
import Header from "../layouts/Header";
import Layout from "../layouts/Layout";

const Home = () => {
  return (
    <Layout>
      <Header />
      <Container>
        <Hero />
        <Content />
      </Container>
      <Footer />
    </Layout>
  );
};

export default Home;
