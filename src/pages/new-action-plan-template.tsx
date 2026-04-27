import dynamic from "next/dynamic";

const NewActionPlanTemplate = dynamic(() => import("@/components/NewActionPlanTemplate"), {
  ssr: false,
  loading: () => <p style={{ padding: 40 }}>Loading…</p>,
});

export default function NewActionPlanTemplatePage() {
  return <NewActionPlanTemplate />;
}
