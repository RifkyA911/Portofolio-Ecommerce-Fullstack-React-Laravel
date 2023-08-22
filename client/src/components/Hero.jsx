/* eslint-disable react/prop-types */
const Hero = ({ text, src, classname }) => {
  const style = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url(${src})`,
    height: "250px",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    borderRadius: "10%",
  };

  return (
    <a href="#" className={`mt-4 py-8 ${classname}`} style={style}>
      <h1 className="text-white text-2xl font-black">DISCOUNT</h1>
      <h1 className="text-white text-5xl font-black">{text}</h1>
      <p className="text-xl text-yellow-100 mt-2">#SALE</p>
    </a>
  );
};

export default Hero;
