import { motion, AnimatePresence } from "framer-motion";

import { MuiIcon } from "../utils/RenderIcons";

export const AreaDropZone = (props) => {
  const {
    className,
    typeFile = "picture",
    height = "h-96",
    width = "w-96",
    iconName = "CloudUploadRounded",
    iconSize = 48,
    span,
  } = props;
  return (
    <>
      <div className="flex flex-col justify-center items-center my-4 text-center ">
        <div
          className={
            className ??
            `flex flex-col justify-center font-poppins-medium items-center border-dashed border-2 rounded-md border-indigo-300 ${height} ${width}`
          }
        >
          {span ?? `Drag & drop a file ${typeFile} on here`}
          <motion.span
            transition={{
              y: {
                duration: 0.4,
                yoyo: Infinity,
                ease: "easeOut",
              },
            }}
            animate={{
              y: 10, // Nilai y saat animasi dimulai
            }}
          >
            <MuiIcon iconName={iconName} fontSize={iconSize} />
          </motion.span>
        </div>
      </div>
    </>
  );
};
