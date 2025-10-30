'use client';

import { useState } from 'react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';

const IMAGES = [
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1525610553991-2bede1a236e2?auto=format&fit=crop&w=1200&q=80'
];

export default function GalleryGrid() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div>
      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
        <Masonry gutter="16px">
          {IMAGES.map((src) => (
            <motion.button key={src} className="group relative overflow-hidden rounded-3xl" onClick={() => setSelected(src)} whileHover={{ scale: 1.02 }}>
              <Image src={src} alt="Brunch" width={600} height={800} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
            </motion.button>
          ))}
        </Masonry>
      </ResponsiveMasonry>

      <AnimatePresence>
        {selected && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" onClick={() => setSelected(null)}>
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="relative max-h-[90vh] max-w-3xl overflow-hidden rounded-3xl" onClick={(e) => e.stopPropagation()}>
              <Image src={selected} alt="Brunch detail" width={1200} height={900} className="h-full w-full object-cover" />
              <button onClick={() => setSelected(null)} className="absolute right-4 top-4 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-brand shadow">×</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
