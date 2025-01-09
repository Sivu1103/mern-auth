import { useNavigate } from "react-router-dom";
import { signOut } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';

export default function Header() {
  const navigate = useNavigate(); // Hook for navigation
  const dispatch = useDispatch();

  const handleIconClick = (section) => {
    navigate(`/${section}`); // Navigate to the respective route
  };

  const handleSignOut = async () => {
      try {
        await fetch('/api/auth/signout');
        dispatch(signOut())
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="flex flex-col w-20 bg-gray-200 shadow-lg p-4">
        <ul className="flex flex-col gap-6">
          {/* Home */}
          <li>
            <button
              onClick={() => handleIconClick("")}
              className="flex items-center justify-center hover:bg-gray-300 p-2 rounded"
              title="Home"
            >
              <img
                src="https://vectorified.com/images/font-awesome-home-icon-5.png"
                alt="Home"
                className="w-8 h-8"
              />
            </button>
          </li>

          <li>
            <button
              onClick={() => handleIconClick("dashboard")}
              className="flex items-center justify-center hover:bg-gray-300 p-2 rounded"
              title="Dashboard"
            >
              <img
                src="https://tse2.mm.bing.net/th?id=OIP.uM3-zPIQ9xCTUBjMOor6PwHaHk&pid=Api&P=0&h=180"
                alt="Dashboard"
                className="w-8 h-8"
              />
            </button>
          </li>

          {/* Data Replication */}
          <li>
            <button
              onClick={() => handleIconClick("data-replication")}
              className="flex items-center justify-center hover:bg-gray-300 p-2 rounded"
              title="Data Replication"
            >
              <img
                src="https://cdn.iconscout.com/icon/premium/png-512-thumb/data-replication-4267103-3536164.png"
                alt="Data Replication"
                className="w-8 h-8"
              />
            </button>
          </li>

          {/* Data Monitoring */}
          <li>
            <button
              onClick={() => handleIconClick("data-monitoring")}
              className="flex items-center justify-center hover:bg-gray-300 p-2 rounded"
              title="Data Monitoring"
            >
              <img
                src="https://cdn.iconscout.com/icon/premium/png-256-thumb/data-monitoring-25-994508.png"
                alt="Data Monitoring"
                className="w-8 h-8"
              />
            </button>
          </li>

          {/* Data Catalogue */}
          <li>
            <button
              onClick={() => handleIconClick("data-catalogue")}
              className="flex items-center justify-center hover:bg-gray-300 p-2 rounded"
              title="Data Catalogue"
            >
              <img
                src="https://cdn.iconscout.com/icon/premium/png-256-thumb/catalog-5363359-4476667.png"
                alt="Data Catalogue"
                className="w-8 h-8"
              />
            </button>
          </li>

          {/* SQL Editor */}
          <li>
            <button
              onClick={() => handleIconClick("query")}
              className="flex items-center justify-center hover:bg-gray-300 p-2 rounded"
              title="SQL Editor"
            >
              <img
                src="https://tse4.mm.bing.net/th?id=OIP.QX3a0zwPeHfbUBfGgPPGmwHaFK&pid=Api&P=0&h=180"
                alt="SQL Editor"
                className="w-8 h-8"
              />
            </button>
          </li>

          <li>
            <button
              onClick={() => handleIconClick("profile")}
              className="flex items-center justify-center hover:bg-gray-300 p-2 rounded"
              title="Profile"
            >
              <img
                src="https://tse3.mm.bing.net/th?id=OIP.Bo5gMo2MDR3GDp28toJnhwHaHk&pid=Api&P=0&h=180"
                alt="Profile"
                className="w-8 h-8"
              />
            </button>
          </li>

          {/* Logout */}
          <li>
            <button
              onClick={handleSignOut}
              className="flex items-center justify-center hover:bg-gray-300 p-2 rounded"
              title="Logout"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/1828/1828479.png"
                alt="Logout"
                className="w-8 h-8"
              />
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
