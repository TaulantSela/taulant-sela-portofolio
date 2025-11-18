'use client';

import QRCodeComponent from 'react-qr-code';

type QRCodeProps = {
  url: string;
  size?: number;
  className?: string;
};

export function QRCode({ url, size = 200, className }: QRCodeProps) {
  return (
    <div className={`flex flex-col items-center gap-3 ${className || ''}`}>
      <div className="rounded-2xl border-4 border-white bg-white p-4 shadow-lg dark:border-slate-800 dark:bg-white">
        <QRCodeComponent
          value={url}
          size={size}
          level="H"
          style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
        />
      </div>
      <p className="text-xs text-slate-500 dark:text-white/60">Scan to visit my portfolio</p>
    </div>
  );
}

