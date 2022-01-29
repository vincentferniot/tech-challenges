import { Outlet } from 'react-router-dom';
import './Layout.css';

export default function Layout() {
  return (
    <div className="Layout">
      <main>
        <h1>Welcome to new surveys</h1>
        <Outlet />
      </main>
    </div>
  );
}
