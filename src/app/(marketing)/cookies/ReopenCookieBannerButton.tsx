'use client';

export function ReopenCookieBannerButton() {
  return (
    <button
      type="button"
      className="btn btn-primary"
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
