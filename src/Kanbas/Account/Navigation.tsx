import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AccountNavigation() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const links = currentUser ? ["Profile"] : ["Signin", "Signup"];
  const { pathname } = useLocation();
  const active = (path: string) => (pathname.includes(path) ? "active" : "");

  return (
    <div id="wd-account-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((link) => (
        <Link key={link} to={`/Kanbas/Account/${link}`} className={`list-group-item border-0 text-danger ${active(link)}`}> {link} </Link>
      ))}
      {currentUser && (currentUser.role === "ADMIN" || currentUser.role === "FACULTY") && (
        <Link to={`/Kanbas/Account/Users`} className={`list-group-item border-0 text-danger ${active("Users")}`}> Users </Link>)}
    </div>
  );
}
