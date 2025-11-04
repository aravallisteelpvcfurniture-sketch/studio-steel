import { cn } from "@/lib/utils";

export function Wave({ className }: { className?: string }) {
  return (
    <div className={cn("absolute inset-x-0 bottom-0", className)}>
      <svg viewBox="0 0 1440 100" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M0 59.7029C130 -6.29712 214.364 2.70288 344 26.7029C487 53.7029 552.667 92.2029 720 73.7029C887.333 55.2029 932.5 1.70288 1089.5 2.70288C1246.5 3.70288 1363 -13.2971 1440 8.70288V100H0V59.7029Z"
          className="fill-current"
        />
      </svg>
    </div>
  );
}
