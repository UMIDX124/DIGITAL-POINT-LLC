interface GooglePartnerBadgeProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeMap = {
  sm: { width: 100, height: 40 },
  md: { width: 140, height: 56 },
  lg: { width: 180, height: 72 },
};

export function GooglePartnerBadge({ size = 'md', className = '' }: GooglePartnerBadgeProps) {
  const { width, height } = sizeMap[size];

  return (
    <div
      className={`inline-flex items-center justify-center ${className}`}
      style={{
        filter: 'drop-shadow(0 0 12px rgba(66, 133, 244, 0.3))',
      }}
    >
      <svg
        width={width}
        height={height}
        viewBox="0 0 280 112"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Google Partner certified badge"
        role="img"
      >
        {/* Shield shape */}
        <path
          d="M50 8L92 24V56C92 80 74 100 50 108C26 100 8 80 8 56V24L50 8Z"
          fill="#4285F4"
        />
        <path
          d="M50 12L88 26.5V56C88 77.5 71.5 96 50 103.5C28.5 96 12 77.5 12 56V26.5L50 12Z"
          fill="#3367D6"
        />
        {/* Checkmark inside shield */}
        <path
          d="M36 56L46 66L66 42"
          stroke="white"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Google text */}
        {/* G */}
        <path
          d="M118 42.5C118 39.2 117.3 36.5 116 34.3C114.1 31.2 111 29 106.5 29C102.3 29 99 30.8 97 33.7C95.3 36 94.3 39 94.3 42.5C94.3 48.6 97.5 53.2 102.7 55C104 55.4 105.2 55.6 106.5 55.6C109.2 55.6 111.4 54.8 113.2 53.3C115.8 51.2 117.4 48 117.8 44.2H106.5V40.8H122V42.5C122 47.5 120.5 51.8 117.5 54.8C114.8 57.5 111 59 106.5 59C101.5 59 97.3 57 94.3 53.8C91.5 50.8 90 46.8 90 42.5C90 38.2 91.5 34.2 94.3 31.2C97.3 28 101.5 26 106.5 26C111 26 114.8 27.5 117.5 30.2C118.8 31.5 119.8 33 120.5 34.7L118 42.5Z"
          fill="white"
        />
        {/* o */}
        <path
          d="M136 36C131.6 36 128 39.6 128 44C128 48.4 131.6 52 136 52C140.4 52 144 48.4 144 44C144 39.6 140.4 36 136 36ZM136 48.8C133.4 48.8 131.2 46.6 131.2 44C131.2 41.4 133.4 39.2 136 39.2C138.6 39.2 140.8 41.4 140.8 44C140.8 46.6 138.6 48.8 136 48.8Z"
          fill="white"
        />
        {/* o */}
        <path
          d="M156 36C151.6 36 148 39.6 148 44C148 48.4 151.6 52 156 52C160.4 52 164 48.4 164 44C164 39.6 160.4 36 156 36ZM156 48.8C153.4 48.8 151.2 46.6 151.2 44C151.2 41.4 153.4 39.2 156 39.2C158.6 39.2 160.8 41.4 160.8 44C160.8 46.6 158.6 48.8 156 48.8Z"
          fill="white"
        />
        {/* g */}
        <path
          d="M176 36C171.6 36 168 39.6 168 44C168 48.4 171.6 52 176 52C178.4 52 180.4 51 181.6 49.6V51.6C181.6 54.4 179.2 56.4 176 56.4C173.6 56.4 171.8 55 171.2 53.2L168.2 54.4C169.4 57.2 172.2 59.2 176 59.2C181 59.2 184.6 56 184.6 51.2V36.4H181.6V38.4C180.4 37 178.4 36 176 36ZM176 48.8C173.4 48.8 171.2 46.6 171.2 44C171.2 41.4 173.4 39.2 176 39.2C178.6 39.2 180.8 41.4 180.8 44C180.8 46.6 178.6 48.8 176 48.8Z"
          fill="white"
        />
        {/* l */}
        <path
          d="M190 27H193.2V52H190V27Z"
          fill="white"
        />
        {/* e */}
        <path
          d="M206 36C201.6 36 198 39.6 198 44C198 48.4 201.6 52 206 52C209 52 211.4 50.6 212.8 48.4L210 46.8C209.2 48 207.8 48.8 206 48.8C203.8 48.8 202 47.2 201.4 45H213.4C213.4 44.6 213.6 44.2 213.6 44C213.6 39.6 210.4 36 206 36ZM201.4 42.4C202 40 203.8 38.8 206 38.8C208 38.8 209.8 40 210.4 42.4H201.4Z"
          fill="white"
        />

        {/* "Partner" text */}
        <text
          x="140"
          y="80"
          textAnchor="middle"
          fill="white"
          fontSize="18"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="500"
          letterSpacing="3"
        >
          PARTNER
        </text>
      </svg>
    </div>
  );
}
