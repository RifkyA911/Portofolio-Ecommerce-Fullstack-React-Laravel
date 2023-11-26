export const sideNavigation = [
  {
    GroupID: 0,
    GroupName: "Dashboard",
    Links: [
      {
        id: 0,
        name: "Dashboard",
        href: "/",
        icon: "RiHomeSmileFill",
      },
      {
        id: 1,
        name: "Notification",
        href: "/notification",
        icon: "FaRegBell",
      },
      {
        id: 2,
        name: "Statistic",
        href: "/statistic",
        icon: "MdOutlineBarChart",
      },
    ],
  },
  {
    GroupID: 1,
    GroupName: "Market",
    Links: [
      {
        id: 0,
        name: "Chat",
        href: "/chat",
        icon: "BsChatDotsFill",
      },
      {
        id: 1,
        name: "Products",
        href: "/products",
        icon: "IoMdListBox",
      },
      {
        id: 2,
        name: "Orders",
        href: "/orders",
        icon: "FaTruck",
      },
      {
        id: 3,
        name: "Invoices",
        href: "/invoices",
        icon: "MdReceiptLong",
      },
    ],
  },
  {
    GroupID: 2,
    GroupName: "Management",
    Links: [
      {
        id: 0,
        name: "Admins",
        href: "/admins",
        icon: "FaUsersCog",
      },
      {
        id: 1,
        name: "My Profile",
        href: "/myprofile",
        icon: "FaUserCog",
      },
      {
        id: 2,
        name: "Settings",
        href: "/settings",
        icon: "FaCog",
      },
      // {
      //   id: 3,
      //   name: "Customers",
      //   href: "/customers",
      //   icon: "Groups",
      // },
    ],
  },
];
