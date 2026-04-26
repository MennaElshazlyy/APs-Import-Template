import "@/styles/globals.css";
import type { ComponentType } from "react";

export default function App({ Component, pageProps }: { Component: ComponentType<Record<string, unknown>>; pageProps: Record<string, unknown> }) {
  return <Component {...pageProps} />;
}
