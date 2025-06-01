import { Outlet, useParams } from "react-router-dom";

const MainContainer = () => {
  const {city,branch,state}=useParams()
  // console.log(city,branch,state)
  // console.log(city[0]+branch[0]+state[0])
  return (
    
    <main className="flex-1 p-6 ml-0  ">
      <Outlet /> {/* Don't wrap it in <h1> */}
    </main>
  );
};

export default MainContainer