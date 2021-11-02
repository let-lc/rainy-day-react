import { forwardRef, InputHTMLAttributes } from "react";

interface ProgressBarProps extends InputHTMLAttributes<HTMLInputElement> {
  percent: number;
}

const ProgressBar = forwardRef<HTMLInputElement, ProgressBarProps>(
  ({ percent, ...props }, ref) => (
    <input
      ref={ref}
      type="range"
      className="progressbar"
      style={{ backgroundSize: `${percent}% 100%` }}
      {...props}
    />
  )
);

ProgressBar.displayName = "ProgressBar";

export default ProgressBar;
