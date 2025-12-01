import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";

export default function MainLayout() {
  return (
    <>
      <header className="sticky top-0 z-10">
        <div className="bg-base-100 shadow-sm">
          <Navbar />
        </div>
      </header>
      <main className="min-h-screen">
        <Outlet />
      </main>
    </>
  );
}
