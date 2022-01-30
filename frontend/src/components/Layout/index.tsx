import { Outlet, Link } from 'react-router-dom';
import './Layout.css';

export default function Layout() {
  return (
    <div className="Layout">
      <main>
        <Link to="/"><h1>Welcome to new surveys</h1></Link>
        <Outlet />
      </main>
    </div>
  );
}
