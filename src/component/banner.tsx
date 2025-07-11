import { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
export default function Banner() {
  const { scrollY } = useScroll();
  const [scrollDir, setScrollDir] = useState<"up" | "down">("up");
  const [lastY, setLastY] = useState(0);
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > lastY) setScrollDir("down");
    else if (latest < lastY) setScrollDir("up");
    setLastY(latest);
  });
  useEffect(() => {
    setScrollDir(window.scrollY > 0 ? "down" : "up");
  }, []);
  return (
    <div
      key={location.pathname}
      className="h-screen w-full relative overflow-hidden bg-contain bg-center flex items-center justify-center"
    >
      {/* image tilted */}
      <div
        className="absolute w-full h-screen top-0 left-0 select-none -z-[1]"
        style={{
          clipPath: "polygon(0 0, 100% 0%, 100% 70%, 0% 100%)",
        }}
      >
        <motion.div
          initial={{ y: 0 }}
          animate={{
            y: scrollDir === "down" ? 70 : 0,
          }}
          transition={{ type: "spring", stiffness: 80 }}
          className="z-10 bg-black/50 size-full absolute"
        ></motion.div>
        <motion.img
          initial={{ y: 0 }}
          animate={{
            y: scrollDir === "down" ? 70 : 0,
          }}
          transition={{ type: "spring", stiffness: 80 }}
          className="size-full bg-center origin-bottom-left z-0"
          src={'https://res.cloudinary.com/duyurqj38/image/upload/v1752259655/banner-doodle_czkw8q.jpg'}
          alt="banner-image"
        ></motion.img>
      </div>
      <motion.div
        animate={{
          y: scrollDir === "down" ? -100 : 0,
        }}
        transition={{ type: "spring", stiffness: 40 }}
        className="relative z-10 flex flex-col items-center justify-center text-neutral-100 text-center size-fit"
      >
        <h1 className="text-4xl font-bold">Ideas</h1>
        <p className="text-sm">Where all our great things begin</p>
      </motion.div>
    </div>
  );
}
