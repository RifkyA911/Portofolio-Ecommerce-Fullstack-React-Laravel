// eslint-disable-next-line react/prop-types
const Container = ({ children }) => {
  return (
    <main className="w-full">
      <div className="mx-8">{children}</div>
    </main>
  );
};

export default Container;
