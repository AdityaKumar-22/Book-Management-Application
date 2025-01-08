import { Sidebar } from "flowbite-react";
import { useContext } from "react";
import { HiArrowSmRight, HiChartPie, HiInbox, HiOutlineCloud, HiOutlineCloudUpload, HiShoppingBag, HiTable, HiUser, HiViewBoards } from "react-icons/hi";
import { AuthContext } from "../../contexts/AuthProvider";
const SideBar = () => {
  const {user} = useContext(AuthContext)
  return (
    <div>
      <Sidebar aria-label="Sidebar with logo branding example">
      <Sidebar.Logo href="#" img={user?.photoURL} imgAlt="Flowbite logo">
        {user?.displayName || "Guest"}
      </Sidebar.Logo>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item href="/admin/dashboard" icon={HiChartPie}>
            Dashboard
          </Sidebar.Item>
          <Sidebar.Item href="/admin/dashboard/addBook" icon={HiOutlineCloudUpload}>
            Add new book
          </Sidebar.Item>
          <Sidebar.Item href="/admin/dashboard/manage" icon={HiInbox}>
            Manage Books
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiUser}>
            Users
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiShoppingBag}>
            Products
          </Sidebar.Item>
          <Sidebar.Item href="/logout" icon={HiArrowSmRight}>
            Logout
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiTable}>
            Sign Up
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
    </div>
  )
}

export default SideBar
