'use client';

export default function LoadingSpinner() {
  return (
    <div id="intro" className="fixed inset-0 z-100 grid place-content-center bg-black">
      <div className="flex size-20 animate-spin items-center justify-center rounded-full border-4 border-transparent border-t-mainColor1 text-4xl">
        <div className="flex size-16 animate-spin items-center justify-center rounded-full border-4 border-transparent border-t-mainColor4 text-2xl"></div>
      </div>
    </div>
  );
}