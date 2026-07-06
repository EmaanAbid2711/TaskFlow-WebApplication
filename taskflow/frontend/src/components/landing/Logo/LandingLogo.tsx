import { Link } from "react-router-dom";

interface LandingLogoProps {
  className?: string;
}

function LandingLogo({
  className = "",
}: LandingLogoProps) {
  return (
    <Link
      to="/"
      className={`inline-block ${className}`}
    >
      <h1 className="m-0 text-[28px] font-bold tracking-[-0.5px] text-[#0052CC]">
        TaskFlow
      </h1>
    </Link>
  );
}

export default LandingLogo;