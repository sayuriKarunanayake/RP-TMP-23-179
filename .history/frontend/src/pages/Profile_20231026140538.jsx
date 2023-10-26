import Content from "../Components/Profile/Content";
import TopBanner from "../Components/Profile/TopBanner";
import Footer from "../layout/Footer";
import Header from "../layout/Header";

const Profile = () => {
  return (
    <div className=" w-full min-h-screen flex flex-col">
      {/* header */}
      <Header />
      {/* top banner */}
      <TopBanner />
      {/* content */}
      <Content />
      <div className=" flex-1" />
      {/* footer */}
      <Footer />
    </div>
  );
};

export default Profile;
