import { useContext } from "react"
import { AuthContext } from "../../contexts/AuthProvider"
import { useLocation, useNavigate } from "react-router-dom"

const LogOut = () => {
    const {logout} = useContext(AuthContext)
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/';
    const handleLogOut = () => {
        logout().then(()=>{
            alert("Logged Out Successfully");
            navigate(from, {replace: true});
        })
    }
  return (
    <div className="h-screen bg-teal-100 flex items-center justify-center">
      <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={handleLogOut}>Log Out</button>
    </div>
  )
}

export default LogOut
