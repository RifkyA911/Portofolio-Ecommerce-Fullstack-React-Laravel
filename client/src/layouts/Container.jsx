// eslint-disable-next-line react/prop-types
const Container = ({ children }) => {
  return (
    <main className="w-full">
      <div className="max-w-screen-xl mx-auto">
        <div className="mx-8 relative">{children}</div>
      </div>
    </main>
  );
};

export default Container;
