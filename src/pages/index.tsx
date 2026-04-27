import dynamic from "next/dynamic";

const CompanyTemplates = dynamic(() => import("@/components/CompanyTemplates"), {
  ssr: false,
  loading: () => <p style={{ padding: 40 }}>Loading…</p>,
});

export default function Home() {
  return <CompanyTemplates />;
}
