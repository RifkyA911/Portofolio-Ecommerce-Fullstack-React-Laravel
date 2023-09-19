import { sideNavigation } from "../Config/PagesLink";

export const allowedPaths = sideNavigation.reduce((accumulator, group) => {
  const groupLinks = group.Links.filter((link) => link.href);
  return accumulator.concat(groupLinks.map((link) => link.href));
}, []);
// console.log(allowedPaths);
