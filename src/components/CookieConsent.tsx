'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-2xl"
        >
          <div
            className="rounded-2xl border border-white/10 px-6 py-4 shadow-2xl backdrop-blur-sm"
            style={{ backgroundColor: '#13091e' }}
          >
            <p className="mb-3 text-sm leading-relaxed text-white/80">
              We use cookies to improve your experience and serve personalized ads.{' '}
              <Link
                href="/privacy-policy"
                className="underline underline-offset-2 transition-colors hover:text-white"
                style={{ color: '#c77dff' }}
              >
                Privacy Policy
              </Link>
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={handleAccept}
                className="rounded-lg px-5 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: '#c77dff' }}
              >
                Accept
              </button>
              <button
                onClick={handleDecline}
                className="rounded-lg border border-white/20 bg-white/5 px-5 py-2 text-sm font-medium text-white/70 transition-colors hover:bg-white/10 hover:text-white"
              >
                Decline
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
