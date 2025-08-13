"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const PageTitle = ({ title }) => {
  const pathname = usePathname();

  useEffect(() => {
    document.title = title;
  }, [pathname, title]);

  return null;
};

export default PageTitle;
