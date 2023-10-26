import { Link } from "react-router-dom";
const HeaderIcons = ({ title }) => {
  return (
    <Link
      to={"/profile"}
      className=" flex flex-col items-center cursor-pointer"
    >
      <p className=" text-gray-100 hover:text-gray-300 font-medium -mt-[3px]">
        {title}
      </p>
    </Link>
  );
};

export default HeaderIcons;
