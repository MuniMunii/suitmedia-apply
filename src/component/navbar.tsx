import { useScroll } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent } from "framer-motion";
import siteLogo from "../assets/site-logo.webp";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
type IsActiveNav =
  | "work"
  | "about"
  | "services"
  | "ideas"
  | "careers"
  | "contact";
export default function Navbar() {
  const [showNavbar, setShowNavbar] = useState(true);
  const [isActive, setIsActive] = useState<IsActiveNav>("ideas");
  const { scrollY } = useScroll();
  const navbarRef = useRef(0);
  const location = useLocation();
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > navbarRef.current && latest > 50) {
      setShowNavbar(false);
    } else {
      setShowNavbar(true);
    }
    navbarRef.current = latest;
  });
  useEffect(() => {
    const extractPath = location.pathname.split("/");
    if (extractPath[extractPath.length - 1] as IsActiveNav) {
      setIsActive(extractPath[extractPath.length - 1] as IsActiveNav);
    } else {
      setIsActive("ideas");
    }
  }, [location.pathname]);
  useEffect(()=>{console.log(isActive)},[isActive])
  return (
    <motion.div
      initial={{ y: 0, opacity: 1 }}
      animate={{ opacity: showNavbar ? 1 : 0, y: showNavbar ? 0 : -100 }}
      transition={{
        opacity: { ease: "easeInOut", duration: 0.45 },
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
      className="fixed top-0 left-0 bg-orange-500 w-full h-fit flex justify-between px-24 py-3 items-center z-[99]"
    >
      <Link href="/">
        <img
          src={siteLogo}
          alt="site-logo"
          className="w-28 brightness-0 invert-[1]"
        />
      </Link>
      <div className="flex flex-row gap-6 text-white items-center">
        <Link className={`border-b-4 pb-2 ${isActive==='work' ? "border-b-white" : "border-transparent"}`} to="/page/work">
          Work
        </Link>
        <Link className={`border-b-4 pb-2 ${isActive==='about' ? "border-b-white" : "border-transparent"}`} to="/page/about">
          About
        </Link>
        <Link className={`border-b-4 pb-2 ${isActive==='services' ? "border-b-white" : "border-transparent"}`} to="/page/services">
          Services
        </Link>
        <Link className={`border-b-4 pb-2 ${isActive==='ideas' ? "border-b-white" : "border-transparent"}`} to="/">
          Ideas
        </Link>
        <Link className={`border-b-4 pb-2 ${isActive==='careers' ? "border-b-white" : "border-transparent"}`} to="/page/careers">
          Careers
        </Link>
        <Link className={`border-b-4 pb-2  ${isActive==='contact' ? "border-b-white" : "border-transparent"}`} to="/page/contact">
          Contact
        </Link>
      </div>
    </motion.div>
  );
}
