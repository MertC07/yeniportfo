import { notFound } from "next/navigation";

// Any path the proxy rewrote into a locale but no route matches lands
// here, so the localized not-found boundary renders instead of an error.
export default function CatchAll() {
  notFound();
}
