import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import SqlQueryApp from "./pages/SqlQueryApp";
import Dashboard from "./pages/Dashboard";
import SetupPage from "./pages/SetupPage";

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex">
        {/* Sidebar (Header) */}
        <Header />

        {/* Main Content */}
        <div className="flex-grow">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/sign-in" element={<Signin />} />
            <Route path="/sign-up" element={<SignUp />} />

            {/* Protected Routes */}
            <Route element={<PrivateRoute />}>
              <Route path="/profile" element={<Profile />} />
              <Route path="/query" element={<SqlQueryApp />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/setup" element={<SetupPage />} />
            </Route>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
