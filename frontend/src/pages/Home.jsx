import HomeHeader from "../layout/HomeHeader";

const Home = () => {
  return (
    <div className=" relative w-full h-screen bg-[url('https://fjwp.s3.amazonaws.com/blog/wp-content/uploads/2021/09/10045333/Job-Searching-Online-11-Best-Practices-You-Need-to-Know-2-2.jpg')]">
      <HomeHeader />
      <div className=" w-2/3 h-full pl-20 flex flex-col justify-center bg-gradient-to-r from-white">
        <p className=" ml-1 ">Easiest way to find a perfect job</p>
        <h1 className=" text-6xl font-bold text-left">
          Find Your Next <br /> Dream Job
        </h1>
        <div className=" mt-7 flex items-center gap-7">
          <button className=" py-2 px-7 bg-blue-600 hover:bg-blue-700 border-2 border-blue-600 hover:border-blue-700 drop-shadow-lg font-semibold rounded-lg">
            Looking for a job
          </button>
          <button className=" py-2 px-7 bg-blue-500 hover:bg-blue-600 border-2 border-blue-600 hover:border-blue-700 drop-shadow-lg font-semibold rounded-lg">
            Find Talent
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;