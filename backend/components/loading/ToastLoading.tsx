import React from "react";

function ToastLoading({
  text = `s'il vous plait attendre`,
  children,
}: {
  text?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="w-full h-fit bg-zinc-100 border border-zinc-400 max-w-xs fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[9999] flex flex-col p-3">
      <span className="animate-pulse text-sm">chargement...</span>
      <span className="text-sm">{text}...</span>
      {children}
    </div>
  );
}

export default ToastLoading;
