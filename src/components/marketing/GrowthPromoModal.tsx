"use client";

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';

export function GrowthPromoModal() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [mounted, setMounted] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Open the modal after a brief delay
    const timer = setTimeout(() => {
      if (dialogRef.current && !dialogRef.current.open && !isDismissed) {
        dialogRef.current.showModal();
      }
    }, 1200);

    return () => clearTimeout(timer);
  }, [isDismissed]);

  const handleClose = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    if (dialogRef.current && dialogRef.current.open) {
      dialogRef.current.close();
    }
    setIsDismissed(true);
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    // Native <dialog> triggers click on backdrop
    if (e.target === dialogRef.current) {
      handleClose(e);
    }
  };

  if (!mounted || isDismissed) return null;

  return (
    <dialog
      ref={dialogRef}
      className="dpl-promo-dialog"
      onClick={handleBackdropClick}
      onClose={() => handleClose()}
    >
      <style>{`
        /* Dialog container */
        .dpl-promo-dialog {
          background: transparent !important;
          border: none !important;
          border-radius: 0 !important;
          padding: 0 !important;
          max-width: 30rem !important;
          width: 90% !important;
          max-height: 80vh !important;
          box-shadow: none !important;
          position: fixed !important;
          top: 50% !important;
          left: 50% !important;
          transform: translate(-50%, -50%) !important;
          margin: 0 !important;
          z-index: 1000 !important;
          overflow: visible !important;
          box-sizing: border-box !important;
          display: flex !important;
          flex-direction: column !important;
          justify-content: center !important;
          align-items: center !important;
        }

        .dpl-promo-dialog::backdrop {
          background: rgba(0, 0, 0, 0.5) !important; /* Low opacity black background */
          backdrop-filter: none !important; /* Removed heavy blur */
        }

        .dpl-promo-dialog__wrapper {
          position: relative !important;
          display: inline-block !important;
          max-width: 100% !important;
          max-height: 80vh !important;
        }

        .dpl-promo-dialog__close-btn {
          position: absolute !important;
          top: 0.75rem !important;
          right: 0.75rem !important;
          width: 32px !important;
          height: 32px !important;
          background: rgba(0, 0, 0, 0.7) !important;
          border: 1px solid rgba(255, 255, 255, 0.3) !important;
          color: #f5f5f7 !important;
          cursor: pointer !important;
          border-radius: 50% !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          transition: background-color 0.15s ease, color 0.15s ease, border-color 0.15s ease !important;
          z-index: 1020 !important; /* High z-index to sit on top of wrapper content */
          pointer-events: auto !important;
        }

        .dpl-promo-dialog__close-btn:hover {
          background: #FF8800 !important;
          color: #000 !important;
          border-color: #FF8800 !important;
        }

        .dpl-promo-dialog__link {
          display: flex !important;
          justify-content: center !important;
          align-items: center !important;
          width: 100% !important;
          height: 100% !important;
          cursor: pointer !important;
          outline: none !important;
        }

        .dpl-promo-dialog__img {
          display: block !important;
          max-width: 100% !important;
          max-height: 90vh !important;
          width: auto !important;
          height: auto !important;
          object-fit: contain !important;
          border-radius: 12px !important; /* Rounded corners on image */
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7) !important; /* Drop shadow on image */
        }
      `}</style>

      <div className="dpl-promo-dialog__wrapper">
        <Link
          href="/pricing#growth-suite"
          onClick={() => {
            setIsDismissed(true);
          }}
          className="dpl-promo-dialog__link"
        >
          <img
            src="/digitalpiontpopup.png"
            alt="Growth & Visibility Suite: SEO, GMB, Citations, Social Media Management All-in-One Package"
            className="dpl-promo-dialog__img"
          />
        </Link>

        <button
          onClick={(e) => handleClose(e)}
          className="dpl-promo-dialog__close-btn"
          aria-label="Close promotion modal"
        >
          <X size={18} />
        </button>
      </div>
    </dialog>
  );
}
