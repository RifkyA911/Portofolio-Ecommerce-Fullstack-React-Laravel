export const notificationTypes = {
  Chat: {
    border: "border-green-500 text-black",
    iconName: "HiMiniChatBubbleOvalLeftEllipsis",
    iconColor: "text-green-500",
  },
  Order: {
    border: "border-sky-500 text-black",
    iconName: "MdAddBusiness",
    iconColor: "text-sky-500",
  },
  Invoice: {
    border: "border-orange-500 text-black",
    iconName: "IoReceiptSharp",
    iconColor: "text-orange-500",
  },
  Review: {
    border: "border-amber-500 text-black",
    iconName: "GiRoundStar",
    iconColor: "text-amber-500",
  },
  Add: {
    border: "border-blue-400 text-black",
    iconName: "BiSolidCommentAdd",
    iconColor: "text-blue-400",
  },
  Update: {
    border: "border-indigo-500 text-black",
    iconName: "FaSquarePen",
    iconColor: "text-indigo-500",
  },
  Delete: {
    border: "border-red-500 text-black",
    iconName: "RiDeleteBin2Fill",
    iconColor: "text-red-500",
  },
  Info: {
    border: "border-cyan-400 text-black",
    iconName: "MdInfo",
    iconColor: "text-cyan-400",
  },
  default: {
    border: "border-slate-400 text-black",
    iconName: "IoNotifications",
    iconColor: "text-slate-500",
  },
};

export const typeHandler = (type, part) => {
  return notificationTypes[type]?.[part] || notificationTypes.default[part];
};
