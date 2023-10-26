import { VscAccount } from "react-icons/vsc";
import { Link } from "react-router-dom";
import logo from "../assets/img/logo.png";

const Navigation = ["Home", "Jobs", "More"];

const DashboardHeader = () => {
  return (
    <div className=" w-full p-5 flex items-center justify-between bg-[#1976b2]">
      {/* left side of header */}
      <img src={logo} alt="logo" className=" w-[117px] object-contain" />
      <div className="flex">
        {/* right side of header */}
        <div className="flex items-center justify-center font-medium text-gray-100 gap-10">
          {Navigation.map((ele, index) => (
            <Link
              to={"/dashboard"}
              key={index}
              className=" hover:text-gray-300"
            >
              {ele}
            </Link>
          ))}
        </div>
        {/* right side User Icon */}
        <VscAccount className=" ml-12 text-gray-100 hover:text-gray-300 text-2xl cursor-pointer" />
      </div>
    </div>
  );
};

export default DashboardHeader;
