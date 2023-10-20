export const MyTableHeaderMenu = (props) => {
  return (
    <>
      <button
        onClick={() =>
          setDialogOpen({
            ...isDialogOpen,
            print: !isDialogOpen.print,
          })
        }
        className="mx-1 grow-0 shrink-0 focus:outline-none bg-orange-500 hover:bg-gradient-to-r hover:from-orange-500 hover:to-amber-500 py-[6px] px-[6px] rounded-md font-roboto-medium text-white items-center transition-all duration-200 "
      >
        <i className="font-xs">
          <MuiIcon iconName={"PrintSharp"} fontSize={20} />
        </i>
        <span className="font-base px-2">Print</span>
      </button>

      {isDialogOpen.print && (
        <>
          <div
            className="absolute bg-transparent w-full h-full z-[9] cursor-wait rounded-lg backdrop-blur-[0.91px]"
            onClick={() => {
              setDialogOpen({
                ...isDialogOpen,
                print: !isDialogOpen.print,
              });
            }}
          ></div>
          <div className="absolute bg-white w-[140px] top-11 right-[235px] shadow-lg rounded-md border-[1px] outline-5 outline-offset-1 outline-gray-700 z-10 text-xs font-roboto-medium">
            <button
              className="py-2 px-4 w-full hover:bg-slate-200 text-left"
              onClick={() => {
                // handlePrint();
                setDialogOpen({
                  ...isDialogOpen,
                  print: !isDialogOpen.print,
                });
              }}
            >
              Print Per Product
            </button>
            <button
              className="py-2 px-4 w-full hover:bg-slate-200 text-left"
              onClick={() => {
                // handlePrint();
                setDialogOpen({
                  ...isDialogOpen,
                  print: !isDialogOpen.print,
                });
              }}
            >
              Print Batch
            </button>
            <button
              className="py-2 px-4 w-full hover:bg-slate-200 text-left"
              onClick={() => {
                handlePrint();
                setDialogOpen({
                  ...isDialogOpen,
                  print: !isDialogOpen.print,
                });
              }}
            >
              Print Table
            </button>
          </div>
        </>
      )}
    </>
  );
};
