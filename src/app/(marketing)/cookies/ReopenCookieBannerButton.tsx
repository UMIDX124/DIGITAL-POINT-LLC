'use client';

export function ReopenCookieBannerButton() {
  return (
    <button
      type="button"
      className="dpl-btn dpl-btn--ink"
      onClick={() => {
        if (typeof window !== 'undefined') {
          document.dispatchEvent(new CustomEvent('dpl:open-cookie-prefs'));
        }
      }}
    >
      Re-open cookie preferences
    </button>
  );
}

export default ReopenCookieBannerButton;
