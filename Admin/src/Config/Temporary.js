import { DateFormatter } from "../utils/Formatter";

export const infoMarket = [
  {
    flex: "row",
    name: "Income",
    value: "500",
    color: "bg-gradient-to-r from-indigo-500 to-purple-500",
  },
  {
    flex: "row",
    name: "Sales",
    value: "123",
    color: "bg-gradient-to-r from-blue-500 to-cyan-500",
  },
  {
    flex: "col",
    name: "Order",
    value: "44",
    color:
      "bg-gradient-to-r from-orange-400 from-[-40%] via-yellow-500 to-yellow-400 to-[100%]",
  },
  {
    flex: "col",
    name: "User",
    value: "62",
    color: "bg-gradient-to-r from-green-500 to-lime-400",
  },

  // {
  //   /* <li
  //                 key="rows"
  //                 className="flex basis-2/6 flex-col justify-between"
  //               >
  //                 {infoMarket
  //                   .filter((item) => item.flex === "col")
  //                   .map((workItem) => (
  //                     <div
  //                       key={workItem.name}
  //                       className={`flex rounded-xl justify-center max-h-20 h-20 p-3 mb-2 lg:m-0 ${workItem.color}`}
  //                     >
  //                       <p>{workItem.name}</p>
  //                     </div>
  //                   ))}
  //               </li> */
  // },
];

export const MarketInbox = [
  {
    id: "1",
    name: "Skrixx91",
    role: "user",
    message: "when will my order arrive at my house?",
    img: "84719630_p0.jpg",
  },
  {
    id: "2",
    name: "John Doe",
    role: "user",
    message: "this item is great!",
    img: "85633671_p6.jpg",
  },
  {
    id: "3",
    name: "Jane Doe",
    role: "user",
    message: "do you have system pay method with X Mobile Banking?",
    img: "88129567_p0.jpg",
  },
  {
    id: "4",
    name: "Mrs. Janet Doe",
    role: "user",
    message: "Is this stuff good?",
    img: "89937713_p0.jpg",
  },
  {
    id: "5",
    name: "Mr. Jhonny Doe",
    role: "user",
    message: "Is there have a red color?",
    img: "96898468_p0.jpg",
  },
  {
    id: "6",
    name: "President",
    role: "user",
    message: "test test",
    img: "89437506_p0.jpg",
  },
  {
    id: "7",
    name: "Skrixx91",
    role: "user",
    message: "when will my order arrive at my house?",
    img: "84719630_p0.jpg",
  },
  {
    id: "8",
    name: "John Doe",
    role: "user",
    message: "this item is good!",
    img: "85633671_p6.jpg",
  },
  {
    id: "9",
    name: "Jane Doe",
    role: "user",
    message: "do you have system pay method with X Mobile Banking?",
    img: "88129567_p0.jpg",
  },
  {
    id: "10",
    name: "Mrs. Janet Doe",
    role: "user",
    message: "Is this stuff good?",
    img: "89937713_p0.jpg",
  },
  {
    id: "11",
    name: "Mr. Jhonny Doe",
    role: "user",
    message: "Is there have a red color?",
    img: "96898468_p0.jpg",
  },
  {
    id: "12",
    name: "President",
    role: "user",
    message: "test test",
    img: "89437506_p0.jpg",
  },
];

export const orderData = [
  {
    x: DateFormatter("DD/MM", "2023-10-17T09:15:55.000000Z"),
    y: 100,
  },
  {
    x: DateFormatter("DD/MM", "2023-10-18T09:15:55.000000Z"),
    y: 400,
  },
  {
    x: DateFormatter("DD/MM", "2023-10-19T09:15:55.000000Z"),
    y: 150,
  },
  {
    x: DateFormatter("DD/MM", "2023-10-20T09:15:55.000000Z"),
    y: 450,
  },
  {
    x: DateFormatter("DD/MM", "2023-10-21T09:15:55.000000Z"),
    y: 350,
  },
  {
    x: DateFormatter("DD/MM", "2023-10-22T09:15:55.000000Z"),
    y: 150,
  },
  // ...data order lainnya...
];

export const productData = [
  {
    // x: new Date("2023-09-01").getTime(),
    x: DateFormatter("DD/MM", "2023-10-17T09:15:55.000000Z"),
    y: 10,
  },
  {
    x: DateFormatter("DD/MM", "2023-10-18T09:15:55.000000Z"),
    y: 60,
  },
  {
    x: DateFormatter("DD/MM", "2023-10-19T09:15:55.000000Z"),
    y: 550,
  },
  {
    x: DateFormatter("DD/MM", "2023-10-20T09:15:55.000000Z"),
    y: 250,
  },
  {
    x: DateFormatter("DD/MM", "2023-10-21T09:15:55.000000Z"),
    y: 450,
  },
  {
    x: DateFormatter("DD/MM", "2023-10-22T09:15:55.000000Z"),
    y: 230,
  },
];
