// font
import "@fontsource/inter/100.css";
import "@fontsource/inter/200.css";
import "@fontsource/inter/300.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/inter/800.css";
import "@fontsource/inter/900.css";

// components
import { Toaster } from "@/components/ui/sonner";
import { Outlet } from "react-router";

const App = () => {
  return (
    <div className="w-full h-screen">
      <Outlet />
      <Toaster position="bottom-right" richColors />
    </div>
  );
};

export default App;
