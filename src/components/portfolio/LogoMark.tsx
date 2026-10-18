import { useState } from "react";

const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter((w) => /^[A-Za-z]/.test(w) && w.toLowerCase() !== "of")
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");

interface Props {
  src?: string;
  name: string;
  variant?: "medal" | "plate";
  size?: string;
  className?: string;
}

/** A logo on a brass-ringed medallion or an ivory plate. Falls back to a monogram if the file is missing. */
const LogoMark = ({ src, name, variant = "medal", size, className = "" }: Props) => {
  const [failed, setFailed] = useState(!src);
  const img = !failed && (
    <img src={src} alt={`${name} logo`} loading="lazy" onError={() => setFailed(true)} draggable={false} />
  );
  if (variant === "plate")
    return (
      <span className={`plate-logo ${className}`}>
        {img || <span aria-label={name}>{initials(name)}</span>}
      </span>
    );
  return (
    <span className={`medal ${className}`} style={size ? ({ "--s": size } as React.CSSProperties) : undefined}>
      {img || <span className="mono" aria-label={name}>{initials(name)}</span>}
    </span>
  );
};

export default LogoMark;
