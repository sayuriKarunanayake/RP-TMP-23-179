import { Link } from "react-router-dom";
import logo from "../Assets/img/logo.png";

const Navigation = [
  { name: "Home", path: "/" },
  { name: "Jobs", path: "/joblist" },
  { name: "Contact", path: "/contact" },
];

const HomeHeader = () => {
  return (
    <div className=" absolute top-0 left-0 w-full py-3 px-20 bg-[#1976d2] flex items-center justify-between">
      {/* logo */}
      <img src={logo} alt="logo" className=" w-[170px] object-contain" />
      {/* navigation */}
      <div className=" flex items-center gap-5">
      {Navigation.map((navItem) => (
          <Link
            key={navItem.name}
            to={navItem.path}
            className="text-gray-100 hover:text-gray-300 font-medium no-underline"
          >
            {navItem.name}
          </Link>
        ))}
      </div>
     
    </div>
  );
};

export default HomeHeader;
