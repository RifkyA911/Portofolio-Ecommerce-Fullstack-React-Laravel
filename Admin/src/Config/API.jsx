import axios from "axios";
import { getAccessToken, getUser, refreshAccessToken } from "./Session";

const table = "admin";
const SERVER_BASE_URL = import.meta.env.VITE_API_URL;
const superAuthorizationPassword = import.meta.env
  .VITE_SUPER_AUTHORIZATION_PASSWORD;
const loginEmail = import.meta.env.VITE_SUPER_ADMIN_EMAIL;
const loginPassword = import.meta.env.VITE_SUPER_ADMIN_PASSWORD;

export const getApiUrl = (endpointType, data) => {
  // console.log("data", data);

  const apiEndpoints = {
    session: {
      auth: `${SERVER_BASE_URL}/api/auth`,
    },
    id: {
      product: import.meta.env.VITE_API_ID_PRODUCT,
      category: import.meta.env.VITE_API_ID_CATEGORY,
      admin: import.meta.env.VITE_API_ID_ADMIN,
      customer: import.meta.env.VITE_API_ID_CUSTOMER,

      order: import.meta.env.VITE_API_ID_ORDER,
      order_item: import.meta.env.VITE_API_ID_ORDER_ITEM,
      shipment: import.meta.env.VITE_API_ID_SHIPMENT,
      payment: import.meta.env.VITE_API_ID_PAYMENT,

      notification: import.meta.env.VITE_API_ID_NOTIFICATION,
      cart: import.meta.env.VITE_API_ID_CART,
      wishlist: import.meta.env.VITE_API_ID_WHISLIS,
      review: import.meta.env.VITE_API_ID_REVIEW,
      message: import.meta.env.VITE_API_ID_MESSAGE,
    },
    all: {
      products: import.meta.env.VITE_API_ALL_PRODUCTS,
      categories: import.meta.env.VITE_API_ALL_CATEGORIES,
      admins: import.meta.env.VITE_API_ALL_ADMINS,
      customers: import.meta.env.VITE_API_ALL_CUSTOMERS,

      orders: import.meta.env.VITE_API_ALL_ORDERS,
      order_items: import.meta.env.VITE_API_ALL_ORDER_ITEMS,
      shipments: import.meta.env.VITE_API_ALL_SHIPMENTS,
      payments: import.meta.env.VITE_API_ALL_PAYMENTS,

      notifications: import.meta.env.VITE_API_ALL_NOTIFICATIONS,
      carts: import.meta.env.VITE_API_ALL_CARTS,
      wishlists: import.meta.env.VITE_API_ALL_WHISLIS,
      reviews: import.meta.env.VITE_API_ALL_REVIEWS,
      messages: import.meta.env.VITE_API_ALL_MESSAGES,
    },
  };

  const URL_Segments = endpointType.split("/");
  // console.log(URL_Segments);

  // AUTH
  if (apiEndpoints.session.hasOwnProperty(URL_Segments[0])) {
    if (URL_Segments[1] == "login" || URL_Segments[1] == "logout") {
      return `${apiEndpoints.session.auth}/${table}/${URL_Segments[1]}`;
    } else if (URL_Segments[1] == "refresh") {
      return `${apiEndpoints.session.auth}/${URL_Segments[1]}`;
    }
  }
  // QUERY BY ID
  else if (apiEndpoints.id.hasOwnProperty(URL_Segments[0])) {
    if (
      URL_Segments[1] == "store" ||
      URL_Segments[1] == "refresh" ||
      URL_Segments[1] == "authority" ||
      URL_Segments[1] == "image" ||
      URL_Segments[1] == "cek"
    ) {
      return `${apiEndpoints.id[URL_Segments[0]]}/${URL_Segments[1]}`;
    } else {
      return `${apiEndpoints.id[URL_Segments[0]]}/${data.id ? data.id : ""}`;
    }
  }
  // QUERY ALL
  else if (apiEndpoints.all.hasOwnProperty(URL_Segments[0])) {
    if (URL_Segments[1] == "paginate") {
      return `${apiEndpoints.all[URL_Segments[0]]}/${URL_Segments[1]}/${
        URL_Segments[2]
      }/${URL_Segments[3]}${URL_Segments[4] ? "/" + URL_Segments[4] : ""}${
        URL_Segments[5] ? "/" + URL_Segments[5] : ""
      }`;
    } else if (
      URL_Segments[1] == "fetch" ||
      URL_Segments[1] == "update" ||
      URL_Segments[1] == "delete" ||
      URL_Segments[1] == "search" ||
      URL_Segments[1] == "filter" ||
      URL_Segments[1] == "print"
    ) {
      return `${apiEndpoints.all[URL_Segments[0]]}/${URL_Segments[1]}`;
    } else {
      return apiEndpoints.all[URL_Segments[0]];
    }
  }

  return SERVER_BASE_URL;
};

const RequestAPI = async (endpoint, method, form = null, params = null) => {
  let access_token = getAccessToken();
  // console.log(endpoint);
  // console.log(getApiUrl(endpoint, form));
  try {
    const url = `${getApiUrl(endpoint, form)}`;
    const axiosConfig = {
      method: method ?? "GET",
      url: url,
      params: params,
      data: {
        ...form,
        superAuthorizationPassword: superAuthorizationPassword,
        token: access_token,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAccessToken()}`,
      },
      // onDownloadProgress: (progressEvent) => {
      //   console.log(progressEvent);
      //   const total = parseFloat(
      //     progressEvent.currentTarget.responseHeaders["Content-Length"]
      //   );
      //   const current = progressEvent.currentTarget.response.length;

      //   let percentCompleted = Math.floor((current / total) * 100);
      //   console.log("completed: ", percentCompleted);
      // },
    };
    // console.log(axiosConfig);
    const response = await axios(axiosConfig);

    if (
      // method == "POST" ||
      method == "PUT" ||
      method == "PATCH" ||
      method == "DELETE"
    ) {
      console.log("refreshed token :", method);
      await refreshAccessToken();
    }
    return response;
  } catch (error) {
    // Handle errors (e.g., network issues, API errors)
    console.error("API request failed:", error);
    throw error;
  }
};

export const ServerPublic = (endpointType, data = null) => {
  const ServerFolder = {
    pictures: {
      img: import.meta.env.VITE_SERVER_PUBLIC_IMG,
      admins: import.meta.env.VITE_SERVER_PUBLIC_ADMIN,
      users: import.meta.env.VITE_SERVER_PUBLIC_USER,
      products: import.meta.env.VITE_SERVER_PUBLIC_PRODUCT,
    },
  };

  if (
    endpointType == "admin" &&
    endpointType == "user" &&
    endpointType == "product"
  ) {
    endpointType = endpointType + "s";
  }

  // PUBLIC SERVER
  if (ServerFolder.pictures.hasOwnProperty(endpointType)) {
    return ServerFolder.pictures[endpointType];
  }
};

export default RequestAPI;
