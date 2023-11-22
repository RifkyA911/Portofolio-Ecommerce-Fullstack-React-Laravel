import React, { createContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import RequestAPI from "../Config/API.jsx";
// REDUX
import { useDispatch, useSelector } from "react-redux";
// Config
import { notificationTypes, typeHandler } from "../Config/ObjectProps";

// Layout
import { Container, Content } from "../Layout";
// Components
import { MotionButton } from "../components/Button.jsx";
import { SelectInput } from "../components/Form.jsx";
import { MyPagination } from "../components/Table/MyTableEngine.jsx";
// Utils
import { DateFormatter } from "../utils/Formatter.js";
import { ReactIcons } from "../utils/RenderIcons.jsx";
import { isOutdated } from "../utils/Solver.jsx";

export const NotificationContext = createContext();

function Notification() {
  // Table Body
  const [grouppedDate, setGrouppedDate] = useState([]);
  const [date, setDate] = useState({
    start: "2000-01-01T01:00",
    end: DateFormatter("dateTimeLocale", null),
  });
  const [notifications, setNotifications] = useState([]);

  const [length, setLengthData] = useState();
  const [paginate, setPaginate] = useState(1);
  const [rows, setRows] = useState(10);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  // REDUX
  const { DarkMode, BgColor, textColor, ContentBgColor } = useSelector(
    (state) => state.UI
  );

  const table = "notifications";
  const URL_NOTIFICATIONS = `${table}/paginate/${paginate}/${rows}`;
  const URL_NOTIFICATIONS_FILTER = `${table}/filter`;

  const fetchData = async (url, form = null) => {
    try {
      const { data } = await RequestAPI(url, form ? "POST" : "GET", form);
      // console.log(data.data);
      setLoading(false);
      setNotifications(data.data);
      setLengthData(data.message.length);
      setErrorMessage(null);
    } catch (error) {
      setErrorMessage(`Gagal Fetching '${url}'`);
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData(URL_NOTIFICATIONS);
  }, []);

  // useEffect(() => {
  //   fetchData(URL_NOTIFICATIONS_FILTER);
  // }, [getValues()]);

  useEffect(() => {
    if (notifications) {
      const sortedNotifications = [...notifications].sort(
        (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
      );
      // console.log(sortedNotifications.map((a) => a.updated_at));

      const groupedData = sortedNotifications.reduce((groups, notification) => {
        const date = notification.updated_at;
        const day = date.split("T")[0]; // Mengambil bagian tanggal saja
        groups[day] = [...(groups[day] || []), notification];
        return groups;
      }, {});

      // console.log("groupedData", groupedData);
      setGrouppedDate(Object.entries(groupedData));
    }
  }, [notifications]);

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

  useEffect(() => {
    setLoading(true);
    fetchData(URL_NOTIFICATIONS);
  }, [paginate, rows]);

  const NotificationContextValue = {
    length,
    paginate,
    setPaginate,
    rows,
    setRows,
    // react hook form
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

  return (
    <>
      <NotificationContext.Provider value={NotificationContextValue}>
        <Container className="relative">
          <Content pageName={"Notifications"}>
            {!notifications && !grouppedDate ? (
              <>LOADING </>
            ) : (
              <div className="notifications min-h-screen">
                <progress
                  className="progress progress-accent w-full"
                  value={progress}
                  max="100"
                ></progress>
                <div
                  className={`notifications-filter flex flex-col md:flex-row mb-2 w-full justify-between items-center md:max-h-[80px] md:overflow-y-hidden border-b pb-4  ${textColor} `}
                >
                  <div>
                    <h5 className="text-left font-roboto-bold text-xs pb-2">
                      Types
                    </h5>
                    {Object.keys(notificationTypes).map((key, index) => (
                      <div key={index} className="inline-flex mx-1">
                        <MotionButton className="inline-flex items-center p-2 border rounded-lg text-xs shadow hover:font-bold">
                          <ReactIcons
                            className={`${typeHandler(key, "iconColor")}`}
                            iconName={typeHandler(key, "iconName")}
                            fontSize={22}
                          />
                          <span className="ml-2 font-roboto-medium">{key}</span>
                        </MotionButton>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-row text-[14px] gap-2 font-roboto-medium items-end text-xs mt-6 md:mt-0">
                    <SelectInput
                      required={false}
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
                      required={false}
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
                    <div className={`notifications-header flex flex-col`}>
                      <div
                        className={`${textColor} flex flex-row my-2 w-full justify-between`}
                      >
                        <div className="text-xl font-roboto-regular inline-flex items-center">
                          <h2>
                            {isOutdated(date) ?? DateFormatter("Day", date)}
                          </h2>
                        </div>
                      </div>
                    </div>
                    <div className="notifications-list flex flex-col px-8">
                      {notifications.map((notification, index) => (
                        <div
                          key={index}
                          className={`
                      ${typeHandler(notification.type, "border")}
                      flex flex-row justify-center items-center w-full line-clamp-4 drop-shadow-sm overflow-hidden shadow-sm h-14 rounded-md border-l-8 my-2`}
                        >
                          <div
                            className={`flex flex-row h-full items-center w-2/12 px-2 font-roboto ${
                              DarkMode
                                ? "bg-slate-700 text-white"
                                : "bg-slate-100 text-gray-700"
                            }`}
                          >
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
                            <p className="text-sm font-roboto-medium">
                              {notification.type}
                            </p>
                          </div>
                          <div
                            className={`p-2 w-8/12 h-full text-left bg-gradient-to-b from-white to-gray-50 over`}
                          >
                            <p className="text-sm inline-block overflow-hidden max-h-[45px] line-clamp-2">
                              {notification.message}
                            </p>
                          </div>
                          <div
                            className={`w-2/12 flex flex-col justify-center text-xs align-middle h-full ${
                              DarkMode
                                ? "bg-slate-700 text-white"
                                : "bg-slate-100 text-gray-700"
                            }`}
                          >
                            {DateFormatter("dateTime", notification.updated_at)}
                            <p className="font-roboto-medium py-1">
                              {notification.admin.username}
                            </p>
                          </div>
                        </div>
                      ))}
                      <div className="divider my-0"></div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <MyPagination formContext={NotificationContext} />
          </Content>
        </Container>
      </NotificationContext.Provider>
    </>
  );
}
export default Notification;
