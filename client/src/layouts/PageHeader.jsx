import IconHeader from "../components/IconHeader";

// eslint-disable-next-line react/prop-types
const PageHeader = ({ data, children, title, indicator }) => {
  return (
    <>
      <h1 className="font-bold text-xl">{title}</h1>
      <IconHeader data={data} indicator={indicator}>
        {children}
      </IconHeader>
    </>
  );
};

export default PageHeader;
