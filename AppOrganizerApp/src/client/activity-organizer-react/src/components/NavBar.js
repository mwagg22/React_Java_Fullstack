import { Link,useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext"
import { useContext } from "react";

export default function NavBar() {
  const [userStatus, setUserStatus] = useContext(AuthContext);

  const history = useNavigate();
  return (
    <div>
      <nav className="navbar navbar-expand-xlg navbar-light bg-light ">
        <ul className="ml-auto navbar-nav  border-primary rounded flex-row nav-fill w-100">
        {userStatus?.user ? (
          <li className="nav-item ">
            <button className="btn btn-danger" onClick={() => {setUserStatus(null);
                localStorage.removeItem("token");
                history("/login");
              }}>
              Logout {userStatus.user.sub}
            </button>
          </li>

        ) : (
          <li className="nav-item ">
            <Link to="/login" className="nav-link">Login</Link>

          </li>
        )}

        {userStatus?.user ? (
          <>
        <li className="nav-item "><Link to="/dashboard" className="nav-link">User Dashboard</Link></li> 
        <li className="nav-item "><Link to="/activity/browse" className="nav-link">Browse Activities</Link></li> 
        <li className="nav-item "><Link to="/activity/create" className="nav-link">Create An Activity</Link></li>
        <li className="nav-item "><Link to="/activity/points" className="nav-link">View Points</Link></li> 
        </>):("")}
        <li className="nav-item "><Link to="/home" className="nav-link">About Us</Link></li>
        <li className="nav-item "><Link to="/contact" className="nav-link">Contact</Link></li>
        {!userStatus?.user ? (<>
        <li className="nav-item "><Link to="/authenticate/register" className="nav-link">Register New User</Link></li> </>):("")}
        </ul>
      </nav>
    </div>
  );
}