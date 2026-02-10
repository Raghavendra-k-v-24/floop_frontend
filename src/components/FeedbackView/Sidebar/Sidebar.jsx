// components
import Feedback from "./Feedback";
import Activity from "./Activity";

const Sidebar = () => {
  return (
    <div className="w-80 shrink-0 flex flex-col p-5 py-10 gap-5">
      <Activity />
      <Feedback />
    </div>
  );
};

export default Sidebar;
