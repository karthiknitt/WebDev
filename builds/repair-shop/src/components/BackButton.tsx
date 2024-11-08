"use client";
import { Button } from "./ui/button";
import { ButtonHTMLAttributes } from "react";
import { useRouter } from "next/navigation";

type Props = {
  title: string;
  variant?:
    | "ghost"
    | "link"
    | "secondary"
    | "destructive"
    | "outline"
    | "default"
    | null
    | undefined;

  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function BackButton({ title, variant, className, ...props }: Props) {
  const router = useRouter();
  return (
    <Button
      variant={variant}
      title={title}
      className={className}
      onClick={() => router.back()}
    >
      {title}
    </Button>
  );
}
