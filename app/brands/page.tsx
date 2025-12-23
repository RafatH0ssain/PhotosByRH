"use client";
import { motion } from "framer-motion";

export default function GalleryPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 pb-20">
      <h1 className="font-anton text-5xl mb-10 uppercase">Corporate Portfolio</h1>
      <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <motion.div 
            key={item}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="w-full bg-neutral-900 rounded-lg overflow-hidden"
            style={{ height: item % 2 === 0 ? '400px' : '250px' }}
          >
            <img src="D:\Pictures\photosbyrh\public\Brand(s)\Brands (1).jpeg" className="w-full h-full object-cover" />
            <img src="D:\Pictures\photosbyrh\public\Brand(s)\Brands (2).jpeg" className="w-full h-full object-cover" />
            <img src="D:\Pictures\photosbyrh\public\Brand(s)\Brands (3).jpeg" className="w-full h-full object-cover" />
            <img src="D:\Pictures\photosbyrh\public\Brand(s)\Brands (4).jpeg" className="w-full h-full object-cover" />
            <img src="D:\Pictures\photosbyrh\public\Brand(s)\Brands (5).jpeg" className="w-full h-full object-cover" />
            <img src="D:\Pictures\photosbyrh\public\Brand(s)\Brands (6).jpeg" className="w-full h-full object-cover" />
            <img src="D:\Pictures\photosbyrh\public\Brand(s)\Brands (7).jpeg" className="w-full h-full object-cover" />
            <img src="D:\Pictures\photosbyrh\public\Brand(s)\Brands (8).jpeg" className="w-full h-full object-cover" />
            <img src="D:\Pictures\photosbyrh\public\Brand(s)\Brands (9).jpeg" className="w-full h-full object-cover" />
            <img src="D:\Pictures\photosbyrh\public\Brand(s)\Brands (10).jpeg" className="w-full h-full object-cover" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}