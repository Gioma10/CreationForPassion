import { createNavigation } from "next-intl/navigation";
import { routing } from "@/i18n/routing";

// Locale-aware replacements for next/link and next/navigation: links keep the visitor in their language.
export const { Link, getPathname, usePathname, useRouter } = createNavigation(routing);
