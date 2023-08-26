import EmblaCarousel from "../components/Carousel/EmblaCarousel";
import Content from "../components/Content";
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
