import type { ReactNode } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import TasksPage from './pages/TasksPage';
import LoginPage from './pages/LoginPage';
import AddTaskPage from './pages/AddTaskPage';

type PrivateRouteProps = {
  children: ReactNode;
};

function PrivateRoute({ children }: PrivateRouteProps) {
  const user = localStorage.getItem('user');

  return user ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <Routes>
      {/* Login Page */}
      <Route path="/login" element={<LoginPage />} />

      {/* Dashboard Page */}
      <Route
        path="/"
        element={
          <PrivateRoute>
            <TasksPage />
          </PrivateRoute>
        }
      />

      {/* Add Task Page */}
      <Route
        path="/add-task"
        element={
          <PrivateRoute>
            <AddTaskPage />
          </PrivateRoute>
        }
      />

      {/* Redirect unknown routes */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}