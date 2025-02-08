"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils";

interface TabItem {
  id: string;
  label: string;
  content?: React.ReactNode;
}

interface TabsProps {
  items: TabItem[];
  className?: string;
  defaultTab?: string;
  onChange?: (id: string) => void;
}

export function Tabs({ items, className, defaultTab, onChange }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || items[0].id);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getLeftPosition = (tabId: string) => {
    if (isMobile) {
      const index = items.findIndex((item) => item.id === tabId);
      // Center the 8px wide lamp within the 25% wide button
      const buttonWidth = 80;
      const lampWidth = 8;
      const centerOffset = (buttonWidth - lampWidth) / 2;
      return `calc(${index * 1}% + ${centerOffset}%)`;
    } else {
      const index = items.findIndex((item) => item.id === tabId);
      // Center the 8px wide lamp within the 33% wide button
      const buttonWidth = 100;
      const lampWidth = 8;
      const centerOffset = (buttonWidth - lampWidth) / 2;
      return `calc(${index * 1}% + ${centerOffset}%)`;
    }
  };

  return (
    <>
      <div
        className={cn(
          "flex items-center w-max gap-3 bg-white/5 border border-gray-500/20 backdrop-blur-lg py-1 px-1 rounded-full",
          className
        )}
      >
        {items.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id);
              onChange?.(tab.id);
            }}
            className={cn(
              "relative cursor-pointer text-sm text-white px-6 py-2 rounded-full transition-colors w-full",
              activeTab === tab.id &&
                "bg-zinc-500 bg-opacity-20 backdrop-blur-[10px]"
            )}
          >
            <span className="inline">{tab.label}</span>
            {/* LAMP STARTED */}
            {activeTab === tab.id && (
              <motion.div
                layoutId="lamp"
                className="absolute transform -top-2 w-8 h-1 bg-primary-800 rounded-t-md"
                initial={false}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
                style={{ left: getLeftPosition(tab.id) }}
              >
                <motion.div className="absolute w-10 h-12 bg-primary-800 rounded-full blur shadow-lg opacity-10 -top-3" />
                <motion.div className="absolute w-12 h-12 bg-primary-800 rounded-full blur shadow-lg opacity-20 -top-3 -left-1" />
                <motion.div className="absolute w-8 h-8 bg-primary-800 rounded-full blur shadow-lg opacity-10 -top-2" />
                <motion.div className="absolute w-6 h-6 bg-primary-800 rounded-full blur shadow-lg opacity-10 -top-1" />
              </motion.div>
            )}
            {/* LAMP ENDED */}
          </button>
        ))}
      </div>
      {items.find((item) => item.id === activeTab)?.content}
    </>
  );
}
