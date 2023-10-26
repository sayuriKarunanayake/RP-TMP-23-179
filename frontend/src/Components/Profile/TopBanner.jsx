import { HiOutlineUserCircle } from "react-icons/hi2";

const TopBanner = () => {
  return (
    <div className=" w-full p-7 mb-7 grid grid-cols-[20%_80%] bg-slate-100 border-b border-b-gray-300 shadow-xl">
      {/* image */}
      <div className=" w-full h-full flex flex-col items-center justify-center">
        <HiOutlineUserCircle className=" text-gray-700 text-[77px]" />
      </div>
      {/* details */}
      <div>
        <h3 className=" text-2xl font-semibold mb-2">Brian Watson</h3>
        <p>HR Manager</p>
        <p>ABC Company</p>
      </div>
    </div>
  );
};

export default TopBanner;
