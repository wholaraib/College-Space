import Feed from "./Feed";
import { Sidebar } from "./Sidebar";
const Home = () => {
  return (
    <>
    <div className="flex">
      <Sidebar/>
      <Feed/>
    </div>
    </>
  );
};

export default Home;
