// src/layouts/HomeLayout.tsx
import Footer from "@/pages/Home/Footer";
import NavBar from "@/pages/Home/Navbar";
import { type ReactNode } from "react";

const HomeLayout = ({ children }: { children: ReactNode }) => (
  <>
    <NavBar />
    <main>{children}</main>
    <Footer />
  </>
);

export default HomeLayout;
