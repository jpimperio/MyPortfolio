export default function WaveDivider() {
  return (
    <div className="relative -mt-1">
      <svg
        viewBox="0 0 1440 60"
        fill="none"
        className="w-full h-auto"
        preserveAspectRatio="none"
      >
        <path
          d="M0 30C240 60 480 0 720 30C960 60 1200 0 1440 30V60H0V30Z"
          className="fill-deep-800/50"
          opacity={0.5}
        />
        <path
          d="M0 20C240 50 480 10 720 40C960 10 1200 50 1440 20V60H0V20Z"
          className="fill-deep-900"
        />
      </svg>
    </div>
  );
}
