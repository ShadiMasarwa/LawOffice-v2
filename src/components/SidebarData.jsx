import React from "react";
import {
  BsFillHouseDoorFill,
  BsFillPersonVcardFill,
  BsFillPeopleFill,
  BsFillPersonPlusFill,
  BsFillFolderFill,
  BsCalendar2WeekFill,
  BsSpeedometer,
  BsListUl,
  BsCurrencyExchange,
} from "react-icons/bs";
export const SidebarData = [
  {
    title: "בית",
    path: "/",
    icon: <BsFillHouseDoorFill />,
    cName: ["nav_text"],
  },
  {
    title: "אנשים",
    path: "showClients",
    icon: <BsFillPeopleFill />,
    cName: ["nav_text"],
  },
  {
    title: "תיקים",
    path: "/showfiles",
    icon: <BsFillFolderFill />,
    cName: ["nav_text"],
  },
  {
    title: "משימות",
    path: "/tasks",
    icon: <BsListUl />,
    cName: ["nav_text"],
  },
  {
    title: "יומן",
    path: "/calendar",
    icon: <BsCalendar2WeekFill />,
    cName: ["nav_text"],
  },
  {
    title: "כספים",
    path: "/finance",
    icon: <BsCurrencyExchange />,
    cName: ["nav_text"],
  },

  {
    title: "ניהול",
    path: "/manage",
    icon: <BsSpeedometer />,
    cName: ["nav_text"],
  },
];
