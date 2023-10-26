import {
  AiOutlineFacebook,
  AiOutlineInstagram,
  AiOutlineYoutube,
  AiOutlineTwitter,
} from "react-icons/ai";

const Footer = () => {
  return (
    <div className=" w-full mt-16 flex items-center justify-between pt-7 pb-4 px-5 bg-slate-200 border-t border-t-gray-200">
      <p className=" text-xs">&copy; 2023 Blocks, Inc. All rights recerved.</p>
      {/* social icons */}
      <div className=" flex items-center gap-5">
        <AiOutlineFacebook className=" text-gray-800 text-2xl" />
        <AiOutlineInstagram className=" text-gray-800 text-2xl" />
        <AiOutlineYoutube className=" text-gray-800 text-2xl" />
        <AiOutlineTwitter className=" text-gray-800 text-2xl" />
      </div>
    </div>
  );
};

export default Footer;
