import React, { useState } from "react";
import {
  Card,
  Typography,
  List,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  ListItem,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon
} from "@heroicons/react/24/solid";
import { FaGraduationCap } from "react-icons/fa6";

export function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Card
      className={`h-[calc(105vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 ${
        isExpanded ? "" : "w-[4rem]"
      }`}
      style={{ backgroundColor: "#001524", borderRadius: 0 }}
    >
      <div
        className="mb-2 p-4"
        onClick={toggleSidebar}
        style={{ cursor: "pointer" }}
      >
        <Typography variant="h3" color="white">
          <div className="flex justify-evenly items-center">
            <FaGraduationCap size={35} color="white" />
            Campus Pulse
          </div>
        </Typography>
      </div>
      {isExpanded && (
        <List className="text-[#9BCF53]">
          <ListItem className="hover:scale-105 transition-transform">
            <ListItemPrefix>
              <PresentationChartBarIcon className="h-5 w-5" />
            </ListItemPrefix>
            Home
          </ListItem>
          <ListItem className="hover:scale-105 transition-transform">
            <ListItemPrefix>
              <ShoppingBagIcon className="h-5 w-5" />
            </ListItemPrefix>
            Academics
          </ListItem>
          <ListItem className="hover:scale-105 transition-transform">
            <ListItemPrefix>
              <InboxIcon className="h-5 w-5" />
            </ListItemPrefix>
            Events
            <ListItemSuffix>
              <Chip
                value="14"
                size="sm"
                variant="ghost"
                color="blue-gray"
                className="rounded-full"
              />
            </ListItemSuffix>
          </ListItem>
          <ListItem className="hover:scale-105 transition-transform">
            <ListItemPrefix>
              <UserCircleIcon className="h-5 w-5" />
            </ListItemPrefix>
            Notice
          </ListItem>
          <button className="flex items-center text-[#001524] py-1 px-3 rounded-md bg-gray-400 hover:bg-gray-300 focus:outline-none focus:ring focus:ring-blue-gray-600">
            <ListItemPrefix>
              <Cog6ToothIcon className="h-5 w-5" />
            </ListItemPrefix>
            Signup
          </button>
        </List>
      )}
    </Card>
  );
}
export default Sidebar;
