export const sideNavigation = [
  {
    GroupID: 0,
    GroupName: "Dashboard",
    Links: [
      {
        id: 0,
        name: "Dashboard",
        href: "/",
        icon: "DesktopWindowsOutlined",
      },
      {
        id: 1,
        name: "Notification",
        href: "/notification",
        icon: "NotificationsNone",
      },
      {
        id: 2,
        name: "Statistic",
        href: "/statistic",
        icon: "BarChart",
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
        icon: "Sms",
      },
      {
        id: 1,
        name: "Products",
        href: "/products",
        icon: "Store",
      },
      {
        id: 2,
        name: "Orders",
        href: "/orders",
        icon: "LocalShipping",
      },
      {
        id: 3,
        name: "Invoices",
        href: "/invoices",
        icon: "ReceiptLong",
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
        icon: "PeopleAlt",
      },
      {
        id: 1,
        name: "My Profile",
        href: "/myprofile",
        icon: "ManageAccounts",
      },
      {
        id: 2,
        name: "Settings",
        href: "/settings",
        icon: "Settings",
      },
    ],
  },
];
