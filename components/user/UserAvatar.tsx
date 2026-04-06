"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

interface UserAvatarProps {
  /** User's display name */
  name?: string | null;
  /** User's email for avatar fallback */
  email?: string | null;
  /** User's avatar image URL */
  image?: string | null;
  /** Size variant */
  size?: "sm" | "default" | "lg";
  /** Show name next to avatar */
  showName?: boolean;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Reusable user avatar with dropdown menu.
 * Includes profile, settings, and logout options.
 */
export default function UserAvatar({
  name,
  email,
  image,
  size = "default",
  showName = false,
  className,
}: UserAvatarProps) {
  const router = useRouter();
  const {signOut} = useAuth()

  // Get initials for avatar fallback
  const initials = name
    ? name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : email?.[0]?.toUpperCase() || "?";

  const handleLogout = async () => {
    try {
      // Call logout API endpoint
const {error} = await signOut()
      // Clear local storage
      if(error){
        toast.error(error.message)
        return;
      }
      localStorage.clear();
      // Redirect to landing page
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
      // Redirect anyway
      // router.push("/");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={`flex items-center gap-2 rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${className}`}
      >
        <Avatar size={size}>
          {image && <AvatarImage src={image} alt={name || "User avatar"} />}
          <AvatarFallback className="bg-primary/10 text-primary font-medium">
            {initials}
          </AvatarFallback>
        </Avatar>
        {showName && name && (
          <span className="text-sm font-medium text-foreground hidden sm:inline">
            {name}
          </span>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={8}>
        {name && email && (
          <>
            <DropdownMenuGroup>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{name}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {email}
                  </p>
                </div>
              </DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
          </>
        )}
        <DropdownMenuItem render={<Link href="/settings" />}>
          <i className="ri-settings-3-line mr-2 text-base" />
          Settings
        </DropdownMenuItem>
        <DropdownMenuItem render={<Link href="/pricing" />}>
          <i className="ri-vip-crown-line mr-2 text-base" />
          Upgrade Plan
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleLogout}
          className="text-destructive focus:text-destructive"
        >
          <i className="ri-logout-box-line mr-2 text-base" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
