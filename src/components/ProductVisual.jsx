import React from 'react';

export function ProductVisual({ iconType, color, code }) {
  return (
    <div
      style={{ backgroundColor: color }}
      className="w-full h-48 flex flex-col items-center justify-center relative border-b border-slate-200 select-none overflow-hidden"
    >
      {iconType === 'book-js' && (
        <div className="w-24 h-32 bg-white rounded-r-md shadow-md border-l-8 border-amber-500 flex flex-col justify-between p-2.5">
          <div className="text-[9px] font-bold uppercase tracking-wider text-slate-400">O&apos;Reilly</div>
          <div className="bg-amber-400 text-slate-900 font-extrabold text-xl px-2 py-1 rounded-xs text-center">
            JS
          </div>
          <div className="text-[10px] font-semibold text-slate-700 leading-tight">
            Definitive Guide
          </div>
        </div>
      )}

      {iconType === 'book-react' && (
        <div className="w-24 h-32 bg-white rounded-r-md shadow-md border-l-8 border-sky-500 flex flex-col justify-between p-2.5">
          <div className="text-[9px] font-bold uppercase tracking-wider text-slate-400">O&apos;Reilly</div>
          <div className="bg-sky-500 text-white font-bold text-sm px-1.5 py-1.5 rounded-xs text-center">
            React.js
          </div>
          <div className="text-[10px] font-semibold text-slate-700 leading-tight">
            UI Cookbook
          </div>
        </div>
      )}

      {iconType === 'book-html' && (
        <div className="w-24 h-32 bg-white rounded-r-md shadow-md border-l-8 border-pink-500 flex flex-col justify-between p-2.5">
          <div className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Pearson</div>
          <div className="bg-pink-500 text-white font-bold text-sm px-1.5 py-1.5 rounded-xs text-center">
            HTML5
          </div>
          <div className="text-[10px] font-semibold text-slate-700 leading-tight">
            Web Design
          </div>
        </div>
      )}

      {iconType === 'calc' && (
        <div className="w-24 h-32 bg-slate-800 rounded-lg shadow-md p-2.5 flex flex-col justify-between border border-slate-700">
          <div className="bg-emerald-200 text-slate-900 h-7 rounded-xs text-xs font-mono font-bold flex items-center justify-end px-1.5">
            540+ FX
          </div>
          <div className="grid grid-cols-3 gap-1.5 mt-2">
            <div className="h-3 bg-slate-600 rounded-xs"></div>
            <div className="h-3 bg-slate-600 rounded-xs"></div>
            <div className="h-3 bg-amber-400 rounded-xs"></div>
            <div className="h-3 bg-slate-400 rounded-xs"></div>
            <div className="h-3 bg-slate-400 rounded-xs"></div>
            <div className="h-3 bg-slate-400 rounded-xs"></div>
            <div className="h-3 bg-slate-400 rounded-xs"></div>
            <div className="h-3 bg-slate-400 rounded-xs"></div>
            <div className="h-3 bg-indigo-400 rounded-xs"></div>
          </div>
        </div>
      )}

      {iconType === 'mouse' && (
        <div className="w-16 h-26 bg-indigo-600 rounded-full shadow-md border-2 border-white flex flex-col items-center pt-3">
          <div className="w-2 h-6 bg-amber-300 rounded-full"></div>
          <div className="w-full border-t border-indigo-400 mt-2"></div>
        </div>
      )}

      {iconType === 'usb' && (
        <div className="flex flex-col items-center">
          <div className="w-9 h-6 border-2 border-slate-400 bg-slate-100 rounded-t-xs"></div>
          <div className="w-14 h-20 bg-rose-600 text-white text-xs font-mono font-bold flex flex-col items-center justify-center rounded-b-lg shadow-md">
            <span>USB</span>
            <span className="text-[10px] text-rose-100 mt-0.5">64GB</span>
          </div>
        </div>
      )}

      {iconType === 'notebook' && (
        <div className="w-24 h-32 bg-orange-500 rounded-r-md shadow-md border-l-6 border-slate-800 p-2.5 flex flex-col justify-between text-white">
          <div className="text-[10px] font-bold uppercase tracking-wider opacity-90">Classmate</div>
          <div className="bg-white/20 rounded p-1.5 text-center font-bold text-xs">
            A4 Spiral
          </div>
          <div className="text-[10px] opacity-90">300 Pages</div>
        </div>
      )}

      {iconType === 'pen' && (
        <div className="flex gap-2.5 items-end justify-center h-28 bg-white/80 px-5 py-3 rounded-lg shadow-xs">
          <div className="w-3.5 h-22 bg-blue-600 rounded-t-full border-t-4 border-amber-300"></div>
          <div className="w-3.5 h-20 bg-slate-800 rounded-t-full border-t-4 border-rose-400"></div>
          <div className="w-3.5 h-22 bg-indigo-600 rounded-t-full border-t-4 border-emerald-300"></div>
        </div>
      )}

      {iconType === 'bag' && (
        <div className="w-22 h-28 bg-indigo-600 rounded-t-2xl rounded-b-md shadow-md flex flex-col items-center justify-end p-2.5 border-t-4 border-amber-400">
          <div className="w-16 h-11 bg-indigo-500 rounded-md border-2 border-indigo-300 flex items-center justify-center text-[10px] font-bold text-white">
            15.6&quot;
          </div>
        </div>
      )}

      {iconType === 'bottle' && (
        <div className="flex flex-col items-center">
          <div className="w-7 h-4 bg-slate-800 rounded-t-sm"></div>
          <div className="w-12 h-24 bg-teal-600 rounded-lg shadow-md text-[10px] text-white flex flex-col items-center justify-center font-mono font-bold border-2 border-teal-400">
            <span>750</span>
            <span>ML</span>
          </div>
        </div>
      )}

      {iconType === 'stand' && (
        <div className="w-24 h-24 bg-white/90 rounded-lg shadow-xs flex flex-col items-center justify-center p-2">
          <div className="w-16 h-12 border-b-4 border-l-4 border-purple-600 -rotate-12"></div>
          <div className="w-18 h-2 bg-slate-700 rounded-full mt-1"></div>
        </div>
      )}

      {iconType === 'organizer' && (
        <div className="w-24 h-24 bg-amber-500 rounded-lg shadow-md p-2 grid grid-cols-2 grid-rows-2 gap-1.5">
          <div className="bg-white/90 rounded-xs"></div>
          <div className="bg-white/75 rounded-xs"></div>
          <div className="bg-white/90 col-span-2 rounded-xs flex items-center justify-center text-[10px] font-bold text-amber-900">
            DESK CADDY
          </div>
        </div>
      )}

      <span className="absolute bottom-2 left-3 text-[11px] font-medium text-slate-600 bg-white/80 px-2 py-0.5 rounded num-text">
        {code}
      </span>
    </div>
  );
}
