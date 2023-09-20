export function getUser() {
    let user = sessionStorage.getItem("user");
    if (user) {
      user = JSON.parse(user);
    } else {
      user = null;
    }
    return user;
  }

  
export function logOutUser () {
  console.log('session data are cleared')
  sessionStorage.clear();
};

