import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Content } from "../Layout";
import { useSelector } from "react-redux";
import { ChatBoard } from "../components/Chat/ChatBoard";
import { ChatList } from "../components/Chat/ChatList";

const initURL = import.meta.env.VITE_API_URL_GET_ALL_MESSAGES;

export default function Chat() {
  const [messages, setMessages] = useState([]);

  // ---- MyTableEngine Header ----
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // ---- MyTableEngine Pagination ----
  const [length, setLengthData] = useState();
  const [paginate, setPaginate] = useState(1);
  const [rows, setRows] = useState(10);

  // REDUX
  const {
    BgColor,
    textTable,
    textColor,
    screenHeigth,
    screenWidth,
    BgTable,
    BgOuterTable,
    BorderRowTable,
    BorderOuterTable,
  } = useSelector((state) => state.UI);
  // useEffect()

  const URL = `${initURL}/paginate/${paginate}/${rows}`;

  const fetchMessages = async (url) => {
    await axios
      .get(url)
      .then((data) => {
        setMessages(data.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchMessages(URL);
  }, []);

  // useEffect(() => {
  //   if (messages !== null) {
  //     const filteredData = messages.filter((messages) => {
  //       console.log(messages.customer_name);
  //       messages.customer_name.toLowerCase().includes(searchTerm.toLowerCase());
  //       setSearchResults(filteredData);
  //     });
  //   }
  // }, [searchTerm, messages]);

  const ChatProps = {
    messages: messages,
    refresh: () => {
      fetchMessages(URL);
      setLoading(true);
    },
    searchTerm: searchTerm,
    setSearchTerm: (e) => setSearchTerm(e.target.value),
  };

  return (
    <>
      <Container>
        <Content pageName={"Chat"}>
          <div className={`lg:px-0 lg:py-1 mx-auto h-full w-full `}>
            <div className="relative mb-12 bg-white sbg-slate-800 min-h-[280px] shadow-sm ">
              <div className="flex content mt-4 ">
                {/* people */}
                <ChatList {...ChatProps} />
                {/* chat */}
                <ChatBoard {...ChatProps} />
              </div>
            </div>
          </div>
        </Content>
      </Container>
    </>
  );
}
