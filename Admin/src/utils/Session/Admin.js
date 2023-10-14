

export function getUser() {
    let getToken = sessionStorage.getItem("token");
    if (getToken) {
      getToken = JSON.parse(getToken);
    } else {
      getToken = null;
    }
    return getToken;
  }

  
export function logOutUser () {
  console.log('session data are cleared')
  sessionStorage.clear();
};

