import Login from "../app/general/Login";
import { IconDashboard, IconUsers } from "../app/general/components/Icons";

import Text from "../app/pages/DashboardSuperAdmin";
import MyDocuments from "../app/pages/MyDocuments";
import SearchDocuments from "../app/pages/SearchDocuments";
import Archive from "../app/pages/Archive";
import Admin from "../app/pages/Admin";
import ChangePassword from "../app/pages/ChangePassword";
import DocumentScan from "../app/pages/DocumentScan";
import Projects from "../app/pages/Projects";


export const adminRoutes = [
  {
    path: "/",
    name: "main",
    icon: IconDashboard,
    component: MyDocuments,
    menu: true,
    sort: 1,
    sidePanelVisible: true,
    fullScreen: false,
  },
  {
    path: "/search",
    name: "search",
    icon: IconDashboard,
    component: SearchDocuments,
    menu: true,
    sort: 2,
    sidePanelVisible: true,
    fullScreen: false,
  },
  {
    path: "/archive",
    name: "archive",
    icon: IconDashboard,
    component: Archive,
    menu: true,
    sort: 2,
    sidePanelVisible: true,
    fullScreen: false,
  },
  {
    path: "/admin",
    name: "admin",
    icon: IconDashboard,
    component: Admin,
    menu: true,
    sort: 3,
    sidePanelVisible: true,
    fullScreen: false,
  },
  {
    path: "/change-password",
    name: "change-password",
    icon: IconDashboard,
    component: ChangePassword,
    menu: true,
    sort: 3,
    sidePanelVisible: true,
    fullScreen: false,
  },
  {
    path: "/document-scan",
    name: "document-scan",
    icon: IconDashboard,
    component: DocumentScan,
    menu: true,
    sort: 4,
    sidePanelVisible: true,
    fullScreen: false,
  },
  {
    path: "/projects",
    name: "projects",
    icon: IconDashboard,
    component: Projects,
    menu: true,
    sort: 4,
    sidePanelVisible: true,
    fullScreen: false,
  },
  {
    path: "/text",
    name: "text",
    icon: IconDashboard,
    component: Text,
    menu: true,
    sort: 5,
    sidePanelVisible: true,
    fullScreen: false,
  },

];

export const loginRoutes = [
  {
    path: "/",
    name: "main",
    icon: IconUsers,
    component: Login,
    menu: true,
    sort: 0,
    sidePanelVisible: true,
    fullScreen: true,
  },
];
