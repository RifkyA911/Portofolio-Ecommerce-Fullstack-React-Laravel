import React, { createContext, useEffect, useState } from "react";
// Layout
import { Container, Content } from "../Layout";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import { setCurrentSidebar } from "../Redux/Slices/NavigationSlice";
// Utils
import { getCurrentEndpoint } from "./../utils/Navigation";
import { MarketInbox } from "./../Config/Temporary.js";
import { DateFormatter } from "../utils/Formatter.js";
import { useForm } from "react-hook-form";
import { SelectInput } from "../components/Form.jsx";
import RequestAPI from "../Config/API.jsx";
import { ReactIcons } from "../utils/RenderIcons.jsx";

export const NotificationContext = createContext();

function Notification() {
  // Table Body
  const [grouppedDate, setGrouppedDate] = useState([]);
  const [date, setDate] = useState({
    start: "2000-01-01T01:00",
    end: DateFormatter("dateTimeLocale", null),
  });
  const [notifications, setNotifications] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(true);

  // REDUX
  const { BgColor, textColor, ContentBgColor } = useSelector(
    (state) => state.UI
  );

  const table = "notifications";
  const URL_NOTIFICATIONS = `${table}/fetch`;
  const URL_NOTIFICATIONS_FILTER = `${table}/filter`;

  const fetchData = async (url, form = null) => {
    try {
      const { data } = await RequestAPI(url, form ? "POST" : "GET", form);
      // console.log(data.data);
      setLoading(false);
      setNotifications(data.data);
      // setLengthData(data.message.length);
      setErrorMessage(null);
    } catch (error) {
      setErrorMessage(`Gagal Fetching '${url}'`);
      console.error(message, error);
    }
  };

  useEffect(() => {
    fetchData(URL_NOTIFICATIONS);
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    setFocus,
    setError,
    control,
    formState: { errors, isValid, dirtyFields },
    watch,
  } = useForm({
    mode: "onChange",
  });

  const NotificationContextValue = {
    register,
    handleSubmit,
    setValue,
    getValues,
    setFocus,
    setError,
    control,
    errors,
    isValid,
    dirtyFields,
    watch,
  };

  const typeHandler = (type, part) => {
    const notificationTypes = {
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
        iconName: "FaFileInvoiceDollar",
        iconColor: "text-orange-500",
      },
      Review: {
        border: "border-yellow-500 text-black",
        iconName: "GiRoundStar",
        iconColor: "text-yellow-500",
      },
      Add: {
        border: "border-blue-500 text-black",
        iconName: "BiSolidCommentAdd",
        iconColor: "text-blue-500",
      },
      Update: {
        border: "border-indigo-500 text-black",
        iconName: "IoMdWarning",
        iconColor: "text-indigo-500",
      },
      Delete: {
        border: "border-red-500 text-black",
        iconName: "RiDeleteBin2Fill",
        iconColor: "text-red-500",
      },
      Info: {
        border: "border-sky-500 text-black",
        iconName: "MdInfo",
        iconColor: "text-sky-500",
      },
      default: {
        border: "border-slate-400 text-black",
        iconName: "IoNotifications",
        iconColor: "text-slate-500",
      },
    };
    return notificationTypes[type]?.[part] || notificationTypes.default[part];
  };

  const data = [
    { id: 1, content: "Item 1", updated_at: "2023-11-18" },
    { id: 2, content: "Item 2", updated_at: "2023-11-19" },
    { id: 3, content: "Item 3", updated_at: "2023-11-18" },
    // Tambahkan data lainnya sesuai kebutuhan
  ];

  useEffect(() => {
    if (notifications) {
      const sortedNotifications = [...notifications].sort(
        (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
      );
      console.log(sortedNotifications.map((a) => a.updated_at));

      const groupedData = sortedNotifications.reduce((groups, notification) => {
        const date = notification.updated_at;
        const day = date.split("T")[0]; // Mengambil bagian tanggal saja
        groups[day] = [...(groups[day] || []), notification];
        return groups;
      }, {});

      console.log("groupedData", groupedData);
      setGrouppedDate(Object.entries(groupedData));
    }
  }, [notifications]);

  // Mengonversi objek hasil pengelompokkan menjadi array
  return (
    <>
      <NotificationContext.Provider value={NotificationContextValue}>
        <Container className="relative">
          <Content pageName={"Notifications"}>
            {!notifications && !grouppedDate ? (
              <>LOADING </>
            ) : (
              <div className="notifications">
                <div
                  className={`${textColor} flex flex-row mb-2 w-full justify-end`}
                >
                  <div className="flex flex-row text-[14px] gap-2 font-roboto-medium items-end text-xs">
                    <SelectInput
                      formContext={NotificationContext}
                      className={`w-full flex gap-2 flex-col `}
                      newStyle="bg-slate-200 text-black shadow-md py-1 px-2 rounded-md cursor-pointer outline-none"
                      label="Start"
                      labelSize="text-xs"
                      name="date_start"
                      type="datetime-local"
                      defaultValue={date.start}
                    />
                    <SelectInput
                      formContext={NotificationContext}
                      className={`w-full flex gap-2 flex-col `}
                      newStyle="bg-slate-200 text-black shadow-md py-1 px-2 rounded-md cursor-pointer outline-none"
                      label="End"
                      labelSize="text-xs"
                      name="date_end"
                      type="datetime-local"
                      defaultValue={date.end}
                    />
                  </div>
                </div>
                {grouppedDate.map(([date, notifications]) => (
                  <div key={date} className="group">
                    {/* {items.map((item) => (
                      <div key={item.id}>{item.type}</div>
                    ))} */}
                    <div className={`notifications-header flex flex-col`}>
                      <div
                        className={`${textColor} flex flex-row my-2 w-full justify-between`}
                      >
                        <div className="text-xl font-roboto-regular inline-flex items-center">
                          <h2>{DateFormatter("date", date)}</h2>
                        </div>
                      </div>
                    </div>
                    <div className="notifications-list flex flex-col px-8">
                      {notifications.map((notification, index) => (
                        <div
                          className={`
                      ${typeHandler(notification.type, "border")}
                      flex flex-row justify-center items-center w-full line-clamp-4 overflow-hidden bg-slate-100 shadow-sm h-14 rounded-sm border-l-8 my-2`}
                        >
                          <div className="flex flex-row h-full items-center w-2/12 px-2 font-roboto">
                            <span className="p-2 mr-2">
                              <ReactIcons
                                className={typeHandler(
                                  notification.type,
                                  "iconColor"
                                )}
                                iconName={typeHandler(
                                  notification.type,
                                  "iconName"
                                )}
                                fontSize={26}
                              />
                            </span>
                            <p className="text-sm font-roboto-medium text-gray-700">
                              {notification.type}
                            </p>
                          </div>
                          <div className="p-2 w-8/12 h-full text-left bg-lime-300">
                            <p className="text-sm">{notification.message}</p>
                          </div>
                          <div className="w-2/12  h-full bg-blue-300">
                            <span className="text-xs">
                              {DateFormatter(
                                "dateTime",
                                notification.updated_at
                              )}
                            </span>
                          </div>
                        </div>
                      ))}
                      <div className="divider my-0"></div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Content>
        </Container>
      </NotificationContext.Provider>
    </>
  );
}
export default Notification;
