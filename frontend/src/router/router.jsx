import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import Home from "../home/home.jsx";
import Shop from "../shop/Shop.jsx";
import Blog from "../components/Blog.jsx";
import About from "../components/About.jsx";
import SingleBook from "../components/SingleBook.jsx";
import DashboardLayout from "../dashboard/DashboardLayout.jsx";
import Dashboard from "../dashboard/Dashboard.jsx";
import AddBook from "../dashboard/AddBook.jsx";
import ManageBooks from "../dashboard/ManageBooks.jsx";
import EditBooks from "../dashboard/EditBooks.jsx";
import SignUp from "../components/SignUp.jsx";
import Login from "../components/Login.jsx";
import PrivateRoute from "../PrivateRoute/PrivateRoute.jsx";
import LogOut from "../components/LogOut.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/shop",
        element: <Shop/>
      },
      {
        path: "/blog",
        element: <Blog/>
      },
      {
        path: "/about",
        element: <About/>
      },
      {
        path: "/book/:id",
        element: <SingleBook/>,
        loader: ({params})=> fetch(`http://localhost:3000/book/${params.id}`)
      }
    ],
  },
  {
    path: '/admin/dashboard',
    element: <DashboardLayout/>,
    children: [
      {
        path: '/admin/dashboard',
        element: <PrivateRoute><Dashboard/></PrivateRoute>
      },
      {
        path: '/admin/dashboard/addBook',
        element: <AddBook/>
      },
      {
        path: '/admin/dashboard/manage',
        element: <ManageBooks/>
      },
      {
        path: '/admin/dashboard/edit/:id',
        element: <EditBooks/>,
        loader: ({params})=> fetch(`http://localhost:3000/book/${params.id}`)
      }
    ]
  },
  {
    path: "sign-up",
    element: <SignUp/>,
  },
  {
    path: "login",
    element: <Login/>,
  },
  {
    path: "logout",
    element: <LogOut/>,
  }
]);
export default router;
