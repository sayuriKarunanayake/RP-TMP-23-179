import { HiOutlineUserCircle } from "react-icons/hi2";
import HeaderIcons from "../Components/layout/HeaderIcons";
import logo from "../Assets/img/logo.png";

const headerIcons = [
  {
    title: "Home",
  },
  {
    title: "Jobs",
  },
  {
    title: "Message",
  },
  {
    title: "Notifications",
  },
  {
    title: "More",
  },
];

const Header = () => {
  return (
    <div className=" w-full sticky top-0 left-0 z-50 py-3 px-5 bg-[#1976d2] flex items-center justify-between">
      {/* left side */}
      <img src={logo} alt="logo" className=" w-[117px] object-contain" />

      {/* right side */}
      <div className=" flex items-center gap-7">
        {headerIcons.map((icon) => (
          <HeaderIcons key={icon.title} title={icon.title} />
        ))}
        {/* user profile */}
        <div className=" ml-3 flex items-center gap-2 cursor-pointer">
          <HiOutlineUserCircle className=" text-gray-100 text-[37px]" />
          <p className=" text-gray-100 font-medium">Brian</p>
        </div>
      </div>
    </div>
  );
};

export default Header;
