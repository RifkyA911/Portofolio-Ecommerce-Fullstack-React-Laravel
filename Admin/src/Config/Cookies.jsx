import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./Session";

export function getCookie(name) {
  if (name == "token") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Check if the cookie starts with the specified name
      if (cookie.startsWith(`${name}=`)) {
        // Return the value of the cookie
        return cookie.substring(name.length + 1);
      }
    }
  } else {
    const cookieName = `${name}=`;
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i].trim();
      if (cookie.indexOf(cookieName) === 0) {
        return decodeURIComponent(
          cookie.substring(cookieName.length, cookie.length)
        );
      }
    }
  }
  // Return null if the cookie is not found
  return null;
}

// Fungsi untuk mengatur nilai cookie
export function setCookie(name, value, days = 30) {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${encodeURIComponent(
    value
  )};expires=${expires.toUTCString()};path=/`;
}

export function deleteCookie(cookieName) {
  document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT;`;
}

// export const cookieManager = (segments, config = null) => {
//   // Contoh penggunaan: Menyimpan informasi pengguna dan pengaturan dalam cookie
//   const user = getUser();
//   const userCookies = JSON.parse(getCookie("user_settings")) ?? null;
//   // console.log(userCookies);
//   if (segments == "user_settings") {
//     function themeChanger() {
//       if (config?.theme == "toggle") {
//         return userCookies.user.settings.theme == "dark" ? "light" : "dark";
//       } else {
//         return userCookies.user?.settings?.theme ?? "light";
//       }
//     }

//     const combinedData = {
//       user: {
//         email: user.email,
//         settings: {
//           theme: themeChanger(),
//           language: "en",
//         },
//       },
//     };
//     // console.log(combinedData);
//     // Mengubah objek menjadi string JSON
//     const jsonString = JSON.stringify(combinedData);

//     // Menyimpan string JSON dalam cookie
//     setCookie("user_settings", jsonString, 30);
//   }
// };
