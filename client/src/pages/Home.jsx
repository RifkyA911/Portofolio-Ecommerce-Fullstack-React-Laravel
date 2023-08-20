import Hero from "../components/Hero";
import Container from "../layouts/Container";
import Header from "../layouts/Header";
import Layout from "../layouts/Layout";

const Home = () => {
  return (
    <Layout>
      <Header />
      <Container>
        <div className="mx-8">
          <Hero />
          <h1>Hello World!</h1>
        </div>
      </Container>
    </Layout>
  );
};

export default Home;
