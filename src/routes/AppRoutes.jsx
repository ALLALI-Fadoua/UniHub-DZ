import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home/Home';
import EventsList from '../pages/Events/EventsList';
import EventDetails from '../pages/Events/EventDetails';
import ClubsList from '../pages/Clubs/ClubsList';
import ClubDetails from '../pages/Clubs/ClubDetails';
import Login from '../pages/Auth/Login';
import Signup from '../pages/Auth/Signup';
import AdminLogin from '../pages/Auth/AdminLogin';
import Logout from '../pages/Auth/Logout';
import Profile from '../pages/Profile/Profile';
import MyEvents from '../pages/Profile/MyEvents';
import AdminLayout from '../pages/Admin/AdminLayout';
import Dashboard from '../pages/Admin/Dashboard';
import ManageEvents from '../pages/Admin/ManageEvents';
import EventForm from '../pages/Admin/EventForm';
import ManageClubs from '../pages/Admin/ManageClubs';
import ClubForm from '../pages/Admin/ClubForm';
import ManageUsers from '../pages/Admin/ManageUsers';
import NotFound from '../pages/NotFound/NotFound';
import PrivateRoute from './PrivateRoute';
import AdminRoute from './AdminRoute';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/events" element={<EventsList />} />
      <Route path="/events/:id" element={<EventDetails />} />
      <Route path="/clubs" element={<ClubsList />} />
      <Route path="/clubs/:id" element={<ClubDetails />} />

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/admin/login" element={<AdminLogin />} />

      <Route element={<PrivateRoute />}>
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/events" element={<MyEvents />} />
      </Route>

      <Route element={<AdminRoute />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="events" element={<ManageEvents />} />
          <Route path="events/new" element={<EventForm />} />
          <Route path="events/:id/edit" element={<EventForm />} />
          <Route path="clubs" element={<ManageClubs />} />
          <Route path="clubs/new" element={<ClubForm />} />
          <Route path="clubs/:id/edit" element={<ClubForm />} />
          <Route path="users" element={<ManageUsers />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
