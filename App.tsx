
import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Stars } from '@react-three/drei';
import { Experience } from './components/Experience';
import { TreeMorphState } from './types';
import { COLORS } from './constants';
import { Trees, Share2, Info } from 'lucide-react';

const App: React.FC = () => {
  const [morphState, setMorphState] = useState<TreeMorphState>(TreeMorphState.SCATTERED);

  const toggleState = () => {
    setMorphState(prev => 
      prev === TreeMorphState.SCATTERED ? TreeMorphState.TREE_SHAPE : TreeMorphState.SCATTERED
    );
  };

  return (
    <div className="relative w-full h-screen bg-[#021a11] text-[#D4AF37] select-none">
      {/* 3D Canvas */}
      <div className="absolute inset-0 z-0">
        <Canvas shadows gl={{ antialias: true, alpha: false }} dpr={[1, 2]}>
          <color attach="background" args={[COLORS.DARK_EMERALD]} />
          <PerspectiveCamera makeDefault position={[0, 5, 25]} fov={45} />
          
          <Suspense fallback={null}>
            <Experience morphState={morphState} />
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          </Suspense>

          <OrbitControls 
            enablePan={false} 
            maxDistance={40} 
            minDistance={5} 
            autoRotate={morphState === TreeMorphState.TREE_SHAPE}
            autoRotateSpeed={0.5}
          />
        </Canvas>
      </div>

      {/* UI Overlay */}
      <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-between p-8 md:p-12">
        {/* Header */}
        <header className="flex justify-between items-start pointer-events-auto">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-serif font-bold tracking-tight mb-2 drop-shadow-2xl">
            <span className="text-[#FFD700]">Merry </span> <span className="text-[#FFD700]">Christmas</span>
            </h1>
          </div>
          <div className="flex gap-3">
             <button className="p-2.5 bg-emerald-950/40 backdrop-blur-sm border border-[#D4AF37]/20 rounded-full hover:bg-emerald-900/60 hover:border-[#D4AF37]/50 transition-all duration-300 shadow-lg">
               <Share2 size={16} />
             </button>
             <button className="p-2.5 bg-emerald-950/40 backdrop-blur-sm border border-[#D4AF37]/20 rounded-full hover:bg-emerald-900/60 hover:border-[#D4AF37]/50 transition-all duration-300 shadow-lg">
               <Info size={16} />
             </button>
          </div>
        </header>

        {/* Interaction Panel & Footer Quote */}
        <footer className="flex flex-col md:flex-row items-center justify-between gap-8 pointer-events-auto">
          {/* Minimalist Toggle Panel */}
          <div className="flex items-center gap-2 bg-emerald-950/50 backdrop-blur-xl p-1.5 rounded-full border border-[#D4AF37]/20 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
            <div className={`p-2 rounded-full transition-all duration-1000 ${morphState === TreeMorphState.TREE_SHAPE ? 'bg-[#D4AF37] text-emerald-950 shadow-[0_0_15px_rgba(212,175,55,0.4)]' : 'bg-transparent text-[#D4AF37]'}`}>
              <Trees size={18} />
            </div>
            <button 
              onClick={toggleState}
              className="px-5 py-2 bg-[#D4AF37] text-emerald-950 text-[9px] font-bold rounded-full hover:bg-[#FFD700] transition-all transform hover:scale-105 active:scale-95 shadow-lg uppercase tracking-[0.15em]"
            >
              {morphState === TreeMorphState.SCATTERED ? 'Manifest' : 'Dissolve'}
            </button>
          </div>

          {/* Elegant Italian Quote - Modified text, preserved element as requested */}
          <div className="max-w-xs text-center md:text-right hidden sm:block opacity-40 hover:opacity-80 transition-opacity duration-700">
            <p className="text-[10px] leading-relaxed uppercase tracking-[0.25em] italic font-serif">
              "lo vivo aspettando ogni nostro incontro"
            </p>
          </div>
        </footer>
      </div>

      {/* Aesthetic corner accents */}
      <div className="absolute top-0 left-0 w-24 h-24 border-t border-l border-[#D4AF37]/10 m-6 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-24 h-24 border-b border-r border-[#D4AF37]/10 m-6 pointer-events-none"></div>
    </div>
  );
};

export default App;
