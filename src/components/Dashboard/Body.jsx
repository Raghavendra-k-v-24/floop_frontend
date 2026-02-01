// components
import Received from "./Received";
import Given from "./Given";

const Body = ({ activeTab }) => {
  return (
    <div className="w-full flex-1 flex px-3 pb-3 bg-background overflow-auto">
      <div className="w-full flex-1 bg-white rounded-2xl border border-border">
        {activeTab === "received" ? <Received /> : <Given />}
      </div>
    </div>
  );
};

export default Body;
