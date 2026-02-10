import { cn } from "@/lib/utils";
import { BrainCircuit } from "lucide-react";
import Link from "next/link";

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("flex items-center gap-2 text-lg font-bold text-foreground", className)}>
      <div className="bg-primary text-primary-foreground p-2 rounded-md">
        <BrainCircuit className="h-5 w-5" />
      </div>
      <span>CogniSwap</span>
    </Link>
  );
}
