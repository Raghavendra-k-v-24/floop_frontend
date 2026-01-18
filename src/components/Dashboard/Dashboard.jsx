// hooks
import { useState } from "react";

// components
import Body from "./Body";
import Header from "./Header";

const Dashboard = () => {
  // constants
  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem("activeTab") || "received";
  });
  return (
    <div className="w-full min-h-screen flex flex-col">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <Body activeTab={activeTab} />
    </div>
  );
};

export default Dashboard;
