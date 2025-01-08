import { Outlet } from "react-router-dom"
import SideBar from "./Sidebar"



const DashboardLayout = () => {
  return (
    <div>
      <SideBar />
      <Outlet />
    </div>
  )
}

export default DashboardLayout
