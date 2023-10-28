import HomeHeader from "../layout/HomeHeader";

const Home = () => {
  return (
    <div className=" relative w-full h-screen bg-[url('https://img.freepik.com/premium-vector/job-interview-online-service-platform-candidate-hr-manager-business-man-woman-table-vector-illustration-conversation-career-human-resource-concept_2175-919.jpg?w=900')]">
      
      <div className=" w-2/3 h-full pl-20 flex flex-col justify-center bg-gradient-to-r from-white">
        <p className=" ml-1 ">Easiest way to find a perfect job</p>
        <h1 className=" text-6xl font-bold text-left">
          Find Your Next <br /> Dream Job
        </h1>
        <div className=" mt-7 flex items-center gap-7">
          <button className=" py-2 px-7 bg-blue-500 hover:bg-blue-700 border-2  hover:border-blue-700 drop-shadow-lg font-semibold rounded-lg">
          <a href="/signin" className="text-white no-underline">
            Looking for a job
          </a>
          </button>
          <button className=" py-2 px-7 bg-blue-500 hover:bg-blue-600 border-2  hover:border-blue-700 drop-shadow-lg font-semibold rounded-lg">
          <a href="/recruiterLogin" className="text-white no-underline">
            Find Talent
          </a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
