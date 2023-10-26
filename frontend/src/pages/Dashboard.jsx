import DashboardHeader from "../layout/DashboardHeader";

const buttons = ["Finds Jobs", "CV", "Job Reccomendations", "Job Scam Checker"];

const Dashboard = () => {
  return (
    <div className="w-full h-screen overflow-hidden bg-[url('https://static.vecteezy.com/system/resources/previews/007/340/656/non_2x/job-interview-illustration-free-vector.jpg')]">
      {/* header */}
      <DashboardHeader />
      {/* content */}
      <div className=" w-full px-12 h-full flex flex-col items-center justify-center">
        <div className=" w-full grid grid-cols-[40%_60%]">
          {/* button container */}
          <div className=" w-full grid grid-cols-2 gap-5">
            {buttons.map((btn) => (
              <button
                key={btn}
                className=" bg-blue-600 hover:bg-blue-700 drop-shadow-md font-semibold p-5 h-20 text-center rounded-lg"
              >
                {btn}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
