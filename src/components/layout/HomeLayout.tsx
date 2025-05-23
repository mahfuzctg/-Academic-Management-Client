// src/layouts/HomeLayout.tsx
import Footer from "@/pages/Home/Footer";
import NavBar from "@/pages/Home/Navbar";

import { Outlet } from "react-router-dom";

const HomeLayout = () => (
  <>
    <NavBar />
    <main>
      {" "}
      <Outlet />
    </main>
    <Footer />
  </>
);

export default HomeLayout;
