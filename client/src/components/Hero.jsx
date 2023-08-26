/* eslint-disable react/prop-types */
const Hero = ({ text, src }) => {
  const style = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url(${src})`,
  };

  return (
    <a
      href="#"
      className={`mt-4 py-8 lg:py-16 flex flex-col justify-end items-center h-[250px] lg:h-[300px] bg-center bg-no-repeat bg-cover rounded-3xl`}
      style={style}
    >
      <h1 className="text-white text-2xl lg:text-3xl font-black">DISCOUNT</h1>
      <h1 className="text-white text-5xl lg:text-6xl font-black">{text}</h1>
      <p className="text-xl lg:text-2xl text-yellow-100 mt-2">#SALE</p>
    </a>
  );
};

export default Hero;
