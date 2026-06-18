"use client";

import React, { useEffect, useState } from "react";
import App from "../src/App";

export default function Page() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center font-mono text-xs text-zinc-500">
        Loading premium assets...
      </div>
    );
  }

  return <App />;
}
