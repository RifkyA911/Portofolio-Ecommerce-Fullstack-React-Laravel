import decodeJWT from "../JWT/MyJWT";

export function getUser() {
  let getToken = sessionStorage.getItem("token");
  if (getToken) {
    let decodeResult;
    if (getToken) {
      getToken = JSON.parse(getToken); // parse json JWT
      // console.log(getToken)
      decodeResult = decodeJWT(getToken.access_token);
      // console.log(decodeResult)
    } else {
      getToken = null;
      decodeResult = null;
      console.error("failed to decode JWT");
    }
    return decodeResult;
  } else {
    // console.info("no JWT");
    return null;
  }
}

export function logOutUser() {
  console.log("session data are cleared");
  sessionStorage.clear();
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
