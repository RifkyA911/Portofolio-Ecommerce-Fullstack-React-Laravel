import EmblaCarousel from "../components/carousel/EmblaCarousel";
import Content from "../components/content/Content";
import Container from "../layouts/Container";
import Footer from "../layouts/Footer";
import Header from "../layouts/Header";
import Layout from "../layouts/Layout";

const Home = () => {
  const OPTIONS = { loop: true };
  const SLIDE_COUNT = 4;
  const SLIDES = Array.from(Array(SLIDE_COUNT).keys());
  return (
    <Layout>
      <Header />
      <Container>
        <EmblaCarousel slides={SLIDES} options={OPTIONS} />
        <Content />
      </Container>
      <Footer />
    </Layout>
  );
};

export default Home;
