import React from "react";
import { motion } from "framer-motion";

const blackBox = {
  hidden: {
    height: "100vh",
    top: 0,
    y: "100%",
    transition: {
      duration: 1.5,
      ease: [0.87, 0, 0.13, 1],
    },
  },
  enter: {
    y: "-100%",
    height: "100vh",
    transition: {
      duration: 1.5,
      ease: [0.87, 0, 0.13, 1],
    },
  },
};

const rounded = {
  initial: {
    height: "10vh",
  },
  animate: {
    height: 0,
    transition: {
      delay: 0.4,
      duration: 1.5,
      ease: [0.62, 0.2, 0.29, 1.01],
    },
  },
};

const TransitionPage = (): JSX.Element => {
  return (
    <motion.div
      initial="hidden"
      animate="enter"
      variants={blackBox}
      className="transition-page"
    >
      <motion.div
        className="rounded-top"
        initial="initial"
        animate="animate"
        variants={rounded}
      >
        <div className="rounded"></div>
      </motion.div>
    </motion.div>
  );
};

export default TransitionPage;
