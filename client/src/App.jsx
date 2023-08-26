import Home from "./pages/Home";
import { Provider } from "react-redux";
import store from "./components/redux/store/store";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}
