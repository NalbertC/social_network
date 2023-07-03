import clsx from "clsx";
import { useNavigate } from "react-router-dom";

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  const navigate = useNavigate();

  return (
    <div
      className={clsx("flex flex-row items-center", className)}
      onClick={() => navigate("/")}
    >
      <div className="flex flex-row items-center cursor-pointer   gap-2 text-white font-bold text-2xl">
        rolapapo
      </div>
    </div>
  );
}
