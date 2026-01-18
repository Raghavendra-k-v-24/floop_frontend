// images
import Logo from "@/assets/logo.svg";
import Download from "@/assets/download.svg";
import Upload from "@/assets/upload.svg";
import User from "@/assets/user.svg";

// hooks
import { useNavigate } from "react-router";

// components
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Header = ({ activeTab, setActiveTab }) => {
  // hooks
  const navigate = useNavigate();

  // functions
  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    navigate("/");
  };
  return (
    <header className="w-full h-15 bg-background flex justify-between items-center px-5">
      <img src={Logo} alt="Floop" className="w-20 h-20" />
      <Tabs
        defaultValue="received"
        value={activeTab}
        onValueChange={(tab) => {
          setActiveTab(tab);
          localStorage.setItem("activeTab", tab);
        }}
      >
        <TabsList className="w-80 h-10 rounded-full px-2 bg-white border border-border">
          <TabsTrigger
            value="received"
            className="flex items-center text-xs rounded-full data-[state=active]:bg-primary data-[state=active]:text-white data-[state=inactive]: text-black hover:cursor-pointer"
          >
            Received
            <img src={Download} alt="Download" className="w-3.5" />
          </TabsTrigger>
          <TabsTrigger
            value="given"
            className="flex items-center text-xs rounded-full data-[state=active]:bg-primary data-[state=active]:text-white data-[state=inactive]: text-black hover:cursor-pointer"
          >
            Given
            <img src={Upload} alt="Upload" className="w-3.5" />
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <DropdownMenu>
        <DropdownMenuTrigger className="w-max px-4 gap-2 bg-white border border-border h-10 rounded-full flex items-center cursor-pointer">
          <span className="text-xs text-black">Profile</span>
          <Avatar className="w-max ">
            <AvatarImage src={User} className="w-5" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem disabled>Profile</DropdownMenuItem>
          <DropdownMenuItem
            className="bg-red-500 text-white hover:bg-red-500/90 cursor-pointer"
            onClick={handleLogout}
          >
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};

export default Header;
