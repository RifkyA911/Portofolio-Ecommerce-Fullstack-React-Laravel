import { sideNavigation } from "../Config/PagesLink";
import { useLocation, useNavigate } from "react-router-dom";

export const refreshPage = () => {
   const navigate = useNavigate();
    navigate(0);
}

export const allowedPaths = sideNavigation.reduce((accumulator, group) => {
  const groupLinks = group.Links.filter((link) => link.href);
  return accumulator.concat(groupLinks.map((link) => link.href));
}, []);
// console.log(allowedPaths);

export const getCurrentUri = () => {
  const location = useLocation();
  // console.log(location.pathname);
  return location.pathname
}


export const getCurrentEndpoint = () => {
  // Pisahkan string menjadi kata-kata
  const location = useLocation();
  // console.log(location.pathname);
  const routeParts = location.pathname.split("/");
  const lastPart = routeParts[routeParts.length - 1];
  // Uppercase huruf pertama
  const formattedString = lastPart.charAt(0).toUpperCase() + lastPart.slice(1);

  // console.log(formattedString); // Output: "My Profile"
  return formattedString;
}