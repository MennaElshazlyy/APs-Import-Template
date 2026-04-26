import dynamic from "next/dynamic";

const ActionPlansList = dynamic(() => import("@/components/ActionPlansList"), {
  ssr: false,
  loading: () => <p style={{ padding: 40 }}>Loading…</p>,
});

export default function Home() {
  return <ActionPlansList />;
}
