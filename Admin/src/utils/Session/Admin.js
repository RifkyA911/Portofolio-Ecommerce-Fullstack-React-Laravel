import decodeJWT from "../JWT/decode";

export function getUser() {
    let getToken = sessionStorage.getItem("token");
    let decodeResult 
    if (getToken) {
      getToken = JSON.parse(getToken); // parse json JWT
      // console.log(getToken)
      decodeResult = decodeJWT(getToken.access_token)
      // console.log(decodeResult)
    } else {
      getToken = null;
      decodeResult = null;
      console.error('failed to decode JWT')
    }
    return decodeResult;
  }

export function logOutUser () {
  console.log('session data are cleared')
  sessionStorage.clear();
};

