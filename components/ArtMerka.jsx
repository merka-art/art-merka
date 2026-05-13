"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function ArtMerka() {
  const [count, setCount] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    console.log("ArtMerka mounted on client ✔");
  }, []);

  return (
    <main
      ref={sectionRef}
      style={{
        minHeight: "100vh",
        background: "#050505",
        color: "#F5F5F0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "serif",
      }}
    >
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ fontSize: "3rem", marginBottom: "1rem" }}
      >
        Art Merka
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        style={{ opacity: 0.6, marginBottom: "2rem" }}
      >
        Client Component confirmed.
      </motion.p>

      <button
        onClick={() => setCount(c => c + 1)}
        style={{
          padding: "12px 24px",
          border: "1px solid #D4AF37",
          background: "transparent",
          color: "#D4AF37",
          cursor: "pointer",
          letterSpacing: "0.2em",
        }}
      >
        COUNT: {count}
      </button>
    </main>
  );
}