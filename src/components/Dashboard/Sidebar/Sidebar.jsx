// components
import Metrics from "./Metrics";
import Activity from "./Activity";

const Sidebar = () => {
  return (
    <div className="w-80 shrink-0 flex flex-col p-5 gap-5">
      <Metrics />
      <Activity />
    </div>
  );
};

export default Sidebar;
