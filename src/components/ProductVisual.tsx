import React from 'react';

interface ProductVisualProps {
  iconType: string;
  color: string;
  code: string;
}

export function ProductVisual({ iconType, color, code }: ProductVisualProps) {
  return (
    <div
      style={{ backgroundColor: color }}
      className="w-full h-44 flex flex-col items-center justify-center relative border-b border-stone-200 select-none"
    >
      <div className="w-20 h-24 bg-white border border-stone-300 rounded shadow-xs flex flex-col items-center justify-center p-2 text-stone-700">
        {iconType === 'book-js' && (
          <div className="text-center">
            <div className="text-[10px] uppercase tracking-wider text-stone-500">O&apos;Reilly</div>
            <div className="text-lg font-bold text-amber-600 mt-1">JS</div>
            <div className="text-[10px] text-stone-600 mt-1">ES6+ Guide</div>
          </div>
        )}
        {iconType === 'book-react' && (
          <div className="text-center">
            <div className="text-[10px] uppercase tracking-wider text-stone-500">O&apos;Reilly</div>
            <div className="text-sm font-bold text-sky-700 mt-1">React.js</div>
            <div className="text-[10px] text-stone-600 mt-1">Cookbook</div>
          </div>
        )}
        {iconType === 'book-html' && (
          <div className="text-center">
            <div className="text-[10px] uppercase tracking-wider text-stone-500">Pearson</div>
            <div className="text-sm font-bold text-emerald-700 mt-1">HTML5</div>
            <div className="text-[10px] text-stone-600 mt-1">&amp; CSS3</div>
          </div>
        )}
        {iconType === 'calc' && (
          <div className="w-full h-full flex flex-col justify-between p-1">
            <div className="bg-stone-200 h-5 rounded-xs text-[10px] font-mono flex items-center justify-end px-1">
              991CW
            </div>
            <div className="grid grid-cols-3 gap-1">
              <div className="h-2 bg-stone-400 rounded-xs"></div>
              <div className="h-2 bg-stone-400 rounded-xs"></div>
              <div className="h-2 bg-amber-500 rounded-xs"></div>
              <div className="h-2 bg-stone-300 rounded-xs"></div>
              <div className="h-2 bg-stone-300 rounded-xs"></div>
              <div className="h-2 bg-stone-300 rounded-xs"></div>
            </div>
          </div>
        )}
        {iconType === 'mouse' && (
          <div className="w-10 h-16 border-2 border-stone-500 rounded-full flex flex-col items-center pt-2">
            <div className="w-1 h-4 bg-stone-500 rounded-full"></div>
          </div>
        )}
        {iconType === 'usb' && (
          <div className="flex flex-col items-center">
            <div className="w-6 h-4 border-2 border-stone-400 bg-stone-100"></div>
            <div className="w-9 h-11 bg-stone-700 text-white text-[9px] font-mono flex items-center justify-center rounded-b">
              64GB
            </div>
          </div>
        )}
        {iconType === 'notebook' && (
          <div className="w-full h-full border-l-4 border-stone-600 pl-1 flex flex-col justify-center gap-1.5">
            <div className="h-1 bg-stone-300 w-full"></div>
            <div className="h-1 bg-stone-300 w-4/5"></div>
            <div className="h-1 bg-stone-300 w-full"></div>
            <div className="text-[9px] font-semibold text-stone-600 mt-1">A4 300P</div>
          </div>
        )}
        {iconType === 'pen' && (
          <div className="flex gap-1.5 items-center justify-center h-full">
            <div className="w-2 h-16 bg-blue-700 rounded-t-sm"></div>
            <div className="w-2 h-16 bg-stone-800 rounded-t-sm"></div>
            <div className="w-2 h-16 bg-blue-600 rounded-t-sm"></div>
          </div>
        )}
        {iconType === 'bag' && (
          <div className="w-12 h-15 bg-stone-700 rounded-t-lg rounded-b-sm flex flex-col items-center justify-end p-1.5">
            <div className="w-8 h-6 bg-stone-500 rounded-xs border border-stone-400"></div>
          </div>
        )}
        {iconType === 'bottle' && (
          <div className="flex flex-col items-center">
            <div className="w-5 h-2.5 bg-stone-800 rounded-t-xs"></div>
            <div className="w-8 h-14 bg-teal-700 rounded-xs text-[8px] text-white flex items-center justify-center font-mono">
              750ml
            </div>
          </div>
        )}
        {iconType === 'stand' && (
          <div className="w-12 h-12 relative flex items-end justify-center">
            <div className="w-12 h-1.5 bg-stone-500"></div>
            <div className="w-10 h-8 border-b-2 border-l-2 border-stone-600 -rotate-12 mb-1"></div>
          </div>
        )}
        {iconType === 'organizer' && (
          <div className="w-12 h-12 border-2 border-stone-500 grid grid-cols-2 grid-rows-2 gap-0.5 p-0.5 bg-stone-100">
            <div className="bg-stone-300"></div>
            <div className="bg-stone-200"></div>
            <div className="bg-stone-200 col-span-2"></div>
          </div>
        )}
      </div>
      <span className="absolute bottom-2 right-3 text-[11px] text-stone-500 num-text">
        {code}
      </span>
    </div>
  );
}
