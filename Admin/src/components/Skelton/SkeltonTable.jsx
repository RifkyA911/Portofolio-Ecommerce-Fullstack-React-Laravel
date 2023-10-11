import Skeleton from "@mui/material/Skeleton";

export const SkeltonTable = (props) => {
  return (
    <>
      <div className="p-0 bg-white">
        {Array.from({ length: 16 }).map((_, index) => (
          <Skeleton key={index} className="p-4" />
        ))}
      </div>
    </>
  );
};
