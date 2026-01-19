'use client';

import { useState, useEffect, useRef } from 'react';

// --- High Fidelity Rich Mockups ---
const EssayMockup = () => (
  <div className="w-full h-full bg-white relative flex flex-col font-serif overflow-hidden group">
    {/* Editor Chrome */}
    <div className="h-8 border-b border-slate-100 flex items-center justify-between px-4 bg-slate-50">
      <div className="flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-slate-300"></span>
        <span className="w-2 h-2 rounded-full bg-slate-300"></span>
      </div>
      <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">EssayPass Editor</div>
    </div>
    <div className="p-6 relative z-10 flex-1">
       {/* Official Badge Style */}
       <div className="absolute top-3 right-4 rotate-12 z-20 transition-transform group-hover:scale-110 duration-300">
          <div className="bg-white/90 backdrop-blur shadow-lg border border-green-100 rounded-full w-14 h-14 flex flex-col items-center justify-center relative">
              <span className="text-2xl font-black text-green-600 leading-none">A+</span>
              <div className="absolute -bottom-2 bg-green-600 text-white text-[6px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wide shadow-sm">
                  Verified
              </div>
          </div>
       </div>
       <h3 className="font-bold text-slate-900 text-sm mb-3 leading-snug">The Economic Implications of Remote Work</h3>
       <div className="space-y-3 text-[10px] leading-relaxed text-slate-600">
          <p>
            The shift to remote work has <span className="relative bg-blue-50 text-blue-700 px-0.5 rounded border-b border-blue-200 cursor-help transition-colors hover:bg-blue-100">fundamentally altered
            </span> the urban economic landscape.
            Traditional CBDs have seen a significant decline.
          </p>
          <div className="pl-3 border-l-2 border-slate-200 py-0.5 my-2">
             <p className="italic text-slate-500 text-[9px]">&quot;Suburban revitalization indicates a structural shift in local expenditure.&quot;</p>
          </div>
          <p>
            Conversely, <span className="bg-yellow-50 text-yellow-800 px-0.5 rounded border-b border-yellow-200">expenditure on local goods rose 15%</span> (Johnson, 2023).
          </p>
       </div>
    </div>
    {/* Gradient overlay for depth */}
    <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-20 pointer-events-none"></div>
  </div>
);

const ReferencesMockup = () => (
  <div className="w-full h-full bg-white flex flex-col relative overflow-hidden">
    <div className="px-4 py-3 border-b border-slate-100 flex justify-between items-center bg-white z-10 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
        <div className="font-bold text-slate-800 text-[10px] flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
            References (APA 7th)
        </div>
        <div className="flex items-center gap-1 bg-green-50 px-2 py-0.5 rounded text-green-700 border border-green-100">
            <svg className="w-2.5 h-2.5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
            <span className="text-[8px] font-bold uppercase tracking-wide">Matched</span>
        </div>
    </div>
    <div className="p-5 space-y-3 font-serif relative z-0">
        <div className="group relative pl-3 border-l-2 border-transparent hover:border-blue-400 transition-colors">
            <div className="text-[9px] text-slate-800 leading-snug mb-1">
                <span className="font-semibold">Anderson, C. L. (2023).</span> <i>The digital nomad economy.</i> Journal of Econ.
            </div>
            <div className="flex gap-1.5 opacity-60 group-hover:opacity-100 transition-opacity">
                <div className="h-1 w-12 bg-slate-200 rounded-full"></div>
            </div>
        </div>
        <div className="group relative pl-3 border-l-2 border-transparent hover:border-blue-400 transition-colors">
            <div className="text-[9px] text-slate-800 leading-snug mb-1">
                 <span className="font-semibold">Chen, Y. (2022).</span> <i>Urban resilience.</i> HBR, 100(4).
            </div>
            <div className="flex gap-1.5 opacity-60 group-hover:opacity-100 transition-opacity">
                <div className="h-1 w-8 bg-slate-200 rounded-full"></div>
                <div className="h-1 w-4 bg-slate-200 rounded-full"></div>
            </div>
        </div>
        {/* Ghost items for skeleton effect */}
        <div className="pl-3 opacity-30 space-y-1.5">
             <div className="h-2 w-3/4 bg-slate-100 rounded"></div>
             <div className="h-2 w-1/2 bg-slate-100 rounded"></div>
        </div>
    </div>
  </div>
);

const DashboardMockup = () => (
  <div className="w-full h-full bg-slate-50 p-6 flex items-center justify-center font-sans relative overflow-hidden">
    {/* Abstract Background */}
    <div className="absolute inset-0 opacity-50">
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-100 rounded-full blur-2xl -mr-10 -mt-10"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-100 rounded-full blur-2xl -ml-10 -mb-10"></div>
    </div>

    <div className="relative z-10 w-full max-w-[200px] bg-white rounded-xl shadow-sm border border-slate-100 p-4">
        {/* Insight Header */}
        <div className="flex items-center gap-2 mb-3 border-b border-slate-50 pb-2">
            <div className="w-6 h-6 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
            </div>
            <div className="text-[9px] font-bold text-slate-900 uppercase">AI Analysis</div>
        </div>
        {/* Metric Bars */}
        <div className="space-y-3">
            <div>
                <div className="flex justify-between text-[8px] font-bold text-slate-500 mb-1">
                    <span>ARGUMENT FLUIDITY</span>
                    <span className="text-emerald-500">98/100</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-400 w-[98%] rounded-full"></div>
                </div>
            </div>
            <div>
                <div className="flex justify-between text-[8px] font-bold text-slate-500 mb-1">
                    <span>CITATION ACCURACY</span>
                    <span className="text-blue-500">100%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 w-full rounded-full"></div>
                </div>
            </div>
        </div>
    </div>
  </div>
);

const StrategyMockup = () => (
  <div className="w-full h-full bg-white p-5 flex flex-col relative font-sans">
     <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30"></div>

     <div className="relative z-10 flex flex-col items-center justify-center h-full gap-4">
         {/* Logic Flow Nodes */}
         <div className="flex items-center gap-2">
             <div className="bg-white border border-slate-200 shadow-sm px-3 py-1.5 rounded-lg text-[9px] font-bold text-slate-600 flex items-center gap-1.5">
                 <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span> Thesis
             </div>
         </div>
         <div className="h-4 w-px bg-slate-300"></div>
         <div className="flex gap-4">
             <div className="bg-white border border-blue-200 shadow-sm shadow-blue-50 px-3 py-2 rounded-lg flex flex-col items-center gap-1 w-20">
                 <div className="w-full h-1 bg-blue-100 rounded-full"></div>
                 <div className="w-2/3 h-1 bg-blue-100 rounded-full"></div>
                 <div className="text-[8px] font-bold text-blue-600 mt-1">Argument A</div>
             </div>
             <div className="bg-white border border-slate-200 shadow-sm px-3 py-2 rounded-lg flex flex-col items-center gap-1 w-20 opacity-60">
                 <div className="w-full h-1 bg-slate-100 rounded-full"></div>
                 <div className="w-2/3 h-1 bg-slate-100 rounded-full"></div>
                 <div className="text-[8px] font-bold text-slate-400 mt-1">Argument B</div>
             </div>
         </div>
         <div className="h-4 w-px bg-slate-300"></div>
         <div className="bg-slate-900 text-white px-3 py-1.5 rounded-lg text-[9px] font-bold shadow-md">
             Conclusion
         </div>
     </div>
  </div>
);

// --- Refined Carousel Component ---
interface CarouselCard {
  id: number;
  title: string;
  tag: string;
}

interface CarouselProps {
  items: CarouselCard[];
  title: string;
}

const DeliveryCarousel: React.FC<CarouselProps> = ({ items }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isAutoScrolling = useRef(false);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (!isPaused) {
      interval = setInterval(() => {
        const next = (activeIndex + 1) % items.length;
        setActiveIndex(next);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isPaused, items.length, activeIndex]);

  useEffect(() => {
    if (scrollRef.current && itemRefs.current[activeIndex]) {
      const container = scrollRef.current;
      const target = itemRefs.current[activeIndex];
      if (target) {
        const containerCenter = container.offsetWidth / 2;
        const targetCenter = target.offsetLeft + (target.offsetWidth / 2);
        const newScrollLeft = targetCenter - containerCenter;

        if (Math.abs(container.scrollLeft - newScrollLeft) > 5) {
            isAutoScrolling.current = true;
            container.scrollTo({ left: newScrollLeft, behavior: 'smooth' });
            const timeout = setTimeout(() => { isAutoScrolling.current = false; }, 600);
            return () => clearTimeout(timeout);
        }
      }
    }
  }, [activeIndex]);

  const handleScroll = () => {
    if (!scrollRef.current || isAutoScrolling.current) return;
    const container = scrollRef.current;
    const center = container.scrollLeft + (container.offsetWidth / 2);

    let closestIndex = activeIndex;
    let minDiff = Infinity;

    itemRefs.current.forEach((ref, idx) => {
        if (ref) {
            const itemCenter = ref.offsetLeft + (ref.offsetWidth / 2);
            const diff = Math.abs(center - itemCenter);
            if (diff < minDiff) {
                minDiff = diff;
                closestIndex = idx;
            }
        }
    });

    if (closestIndex !== activeIndex) {
        setActiveIndex(closestIndex);
    }
  };

  const renderMockup = (id: number) => {
    switch (id) {
      case 1: return <EssayMockup />;
      case 2: return <ReferencesMockup />;
      case 3: return <DashboardMockup />;
      case 4: return <StrategyMockup />;
      default: return null;
    }
  };

  const cardWidth = "w-[75vw] sm:w-[500px]";
  const cardHeight = "h-[260px] sm:h-[300px]";

  return (
    <div
        className="relative w-full flex flex-col items-center gap-6 group z-10"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => { setIsPaused(true); isAutoScrolling.current = false; }}
        onTouchEnd={() => setIsPaused(false)}
    >
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="w-full flex overflow-x-auto snap-x snap-mandatory gap-0 px-[50%] no-scrollbar items-center py-10"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {items.map((item, index) => {
          const isActive = index === activeIndex;
          return (
            <div
              key={item.id}
              ref={el => { itemRefs.current[index] = el; }}
              onClick={() => setActiveIndex(index)}
              className={`
                flex-shrink-0 snap-center transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer
                ${cardWidth} ${cardHeight} mx-[-20px] sm:mx-[-40px]
                ${isActive ? 'z-20 scale-100 opacity-100' : 'z-10 scale-[0.85] opacity-50 blur-[0.5px] grayscale-[0.2] hover:opacity-80'}
              `}
            >
               <div className={`
                 w-full h-full rounded-2xl overflow-hidden flex flex-row bg-white
                 ${isActive ? 'shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] border border-white/20 ring-1 ring-white/10' : 'shadow-lg border border-transparent'}
                 transition-all duration-500
               `}>
                   {/* Left Text Content */}
                   <div className="flex-1 pl-6 sm:pl-8 pr-4 flex flex-col justify-center relative z-10 min-w-0 bg-white">
                       <div className={`font-extrabold leading-tight tracking-tight text-slate-900 truncate transition-all duration-500 ${isActive ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl opacity-80'}`}>
                         {item.title}
                       </div>
                       <div className="mt-4 flex">
                            <span className={`font-bold uppercase tracking-wider px-3 py-1 rounded text-[10px] sm:text-[11px] transition-colors ${isActive ? 'bg-blue-50 text-blue-700 border border-blue-100' : 'bg-slate-100 text-slate-500 border border-slate-200'}`}>
                                {item.tag}
                            </span>
                       </div>
                   </div>

                   {/* Right Visual Content */}
                   <div className="w-[45%] h-full relative border-l border-slate-100 bg-slate-50/50 overflow-hidden">
                       <div className="absolute top-0 left-0 w-[111%] h-[111%] origin-top-left transform scale-[0.9] pointer-events-none select-none">
                           {renderMockup(item.id)}
                       </div>
                   </div>
               </div>
            </div>
          );
        })}
      </div>

      {/* Pagination Indicators & Navigation */}
      <div className="flex items-center gap-4 mt-[-10px] relative z-20">
          <button
             onClick={(e) => { e.stopPropagation(); setActiveIndex((prev) => (prev - 1 + items.length) % items.length); }}
             className="text-slate-300 hover:text-slate-600 transition-colors p-2 hidden sm:block"
          >
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
          </button>

          <div className="flex gap-2.5">
              {items.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-1.5 rounded-full transition-all duration-300 ${idx === activeIndex ? 'w-6 bg-blue-600' : 'w-1.5 bg-slate-300'}`}
                  ></div>
              ))}
          </div>

          <button
             onClick={(e) => { e.stopPropagation(); setActiveIndex((prev) => (prev + 1) % items.length); }}
             className="text-slate-300 hover:text-slate-600 transition-colors p-2 hidden sm:block"
          >
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
          </button>
      </div>
    </div>
  );
};

export default DeliveryCarousel;
