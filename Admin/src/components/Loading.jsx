export const LoadingDaisyUI = (props) => {
  const { type = "loading-ring", size = "loading-lg", max = 5 } = props;

  // Membuat array dengan nomor dari 0 hingga max - 1
  const elements = Array.from({ length: max }, (_, index) => index);

  return (
    <>
      {elements.map((index) => (
        <span key={index} className={`loading ${type} ${size}`}></span>
      ))}
    </>
  );
};
