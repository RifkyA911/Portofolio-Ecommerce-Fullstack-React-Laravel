import { sideNavigation } from "../Config/PagesLink";
import { useNavigate } from "react-router-dom";

export const refreshPage = () => {
   const navigate = useNavigate();
    navigate(0);
}

export const allowedPaths = sideNavigation.reduce((accumulator, group) => {
  const groupLinks = group.Links.filter((link) => link.href);
  return accumulator.concat(groupLinks.map((link) => link.href));
}, []);
// console.log(allowedPaths);
