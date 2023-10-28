import Content from "../Components/Profile/Content";
import TopBanner from "../Components/Profile/TopBanner";


import { useParams } from 'react-router-dom';

const Profile = () => {

  const { id } = useParams();

  return (
    <div className=" w-full min-h-screen flex flex-col">
      {/* top banner */}
      <TopBanner id={id}/>
      {/* content */}
      <Content id={id}/>
      <div className=" flex-1" />
   

    </div>
  );
};

export default Profile;
