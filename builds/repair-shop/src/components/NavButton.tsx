import { LucideIcon } from "lucide-react";

import Link from "next/link";

import { Button } from "./ui/button";

type Props = {
  icon: LucideIcon;
  href?: string;
  label: string;
};
function NavButton({ icon: Icon, href, label }: Props) {
  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={label}
      title={label}
      className="rounded-full"
      asChild
    >
      {href ? (
        <Link href={href}>
          <Icon />
        </Link>
      ) : (
        <Icon />
      )}
    </Button>
  );
}
export default NavButton;
