export const PrintDummies = (props) => {
  const { max, span = "dummy" } = props;
  const elements = [];

  for (let i = 1; i <= max; i++) {
    elements.push(
      <div key={i}>
        {span}-{i}
      </div>
    );
  }
  return (
    <>
      <p>Print Dummies:</p>
      {elements}
    </>
  );
};
