import React, { useEffect, useState } from "react";
import { Bell, CaretDown, CaretsInVertical, Clear, Help, Plus } from "@procore/core-icons";
import { Breadcrumbs, Button, Checkbox, Flex, Switch, Toast } from "@procore/core-react";

const SECTIONS = [
  {
    id: 1,
    title: "Preparatory Phase",
    items: [
      {
        id: "1.1",
        title: "Submittals",
        criteria:
          "All pertinent submittals have been submitted and approved.\nReference: Submittals that need to completed for this phase of work.\nRecords: Completed Submittals",
        date: "07 / 21 / 2024",
      },
      {
        id: "1.2",
        title: "Mock-Up",
        criteria:
          "Mock-up has been constructed and reviewed by all involved parties.\nReference: Spec Section in Div. 01\nRecord: Photo of mock-up and mock-up review pdf",
        date: "07 / 21 / 2024",
      },
      {
        id: "1.3",
        title: "Pre-Installation Meeting",
        criteria: "Meeting has been held.\nRecord: Meeting record associated",
        date: "07 / 21 / 2024",
      },
    ],
  },
  {
    id: 2,
    title: "Initial Phase",
    items: [
      {
        id: "2.1",
        title: "Delivery Inspections",
        criteria:
          "Record: Photo of materials, delivery ticket, and completed delivery Inspection (specific to your company)",
        date: "07 / 21 / 2024",
      },
    ],
  },
  {
    id: 3,
    title: "Follow-Up Phase",
    items: [
      {
        id: "3.1",
        title: "Recurring Inspection",
        criteria:
          "Follow applicable standards for frequency and witnessing of recurring Inspections.\nRecord: Completed Scope-specific Inspection (specific to your company and applicable trade)",
        date: "07 / 21 / 2024",
      },
    ],
  },
];

export default function NewActionPlanTemplate() {
  const [showToast, setShowToast] = useState(true);
  const [reorderSections, setReorderSections] = useState(false);
  const [collapsedSections, setCollapsedSections] = useState<number[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => setShowToast(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const toggleSection = (id: number) => {
    setCollapsedSections((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f5f6f7", fontFamily: "system-ui, -apple-system, sans-serif", display: "flex", flexDirection: "column" }}>

      {/* ── Global Nav ── */}
      <div style={{ background: "#1c1c1c", display: "flex", alignItems: "center", height: 48, padding: "0 12px", position: "sticky", top: 0, zIndex: 100, boxSizing: "border-box", gap: 8, flexShrink: 0 }}>
        <button style={{ background: "transparent", border: "none", color: "#ccc", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, padding: "4px 6px", borderRadius: 4, flexShrink: 0 }}>
          <svg width="16" height="14" viewBox="0 0 16 14" fill="none">
            <rect y="0" width="16" height="2" rx="1" fill="#ccc"/>
            <rect y="6" width="16" height="2" rx="1" fill="#ccc"/>
            <rect y="12" width="16" height="2" rx="1" fill="#ccc"/>
          </svg>
          <span style={{ fontSize: 13, fontWeight: 500, color: "#ccc" }}>Menu</span>
        </button>
        <span style={{ fontSize: 15, fontWeight: 800, color: "#fff", letterSpacing: "1px", flexShrink: 0, marginRight: 4 }}>PROCORE</span>
        <button style={{ background: "#2e2e2e", border: "1px solid #444", borderRadius: 6, display: "flex", alignItems: "center", gap: 8, padding: "4px 10px 4px 6px", cursor: "pointer", flexShrink: 0 }}>
          <div style={{ width: 32, height: 32, borderRadius: 4, background: "#3a5a8a", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 8, color: "#adc8f0", fontWeight: 700, textAlign: "center", lineHeight: 1.2 }}>Vertigo<br/>Const.</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: "#fff", whiteSpace: "nowrap" }}>Company Name</span>
            <span style={{ fontSize: 10, color: "#aaa" }}>Project Name</span>
          </div>
          <CaretDown size="sm" style={{ color: "#888" }} />
        </button>
        <button style={{ background: "#2e2e2e", border: "1px solid #444", borderRadius: 6, color: "#ccc", cursor: "pointer", padding: "4px 10px", display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 1, flexShrink: 0 }}>
          <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: "#ccc" }}>Project Tools <CaretDown size="sm" style={{ color: "#888" }} /></span>
          <span style={{ fontSize: 10, color: "#777" }}>Tool Name</span>
        </button>
        <div style={{ flex: 1, maxWidth: 520, margin: "0 auto" }}>
          <div style={{ background: "#2d2d2d", border: "1px solid #3a3a3a", borderRadius: 6, display: "flex", alignItems: "center", padding: "0 10px", height: 34, gap: 8 }}>
            <span style={{ color: "#777", fontSize: 13, flex: 1 }}>Search Project</span>
            <span style={{ color: "#666", fontSize: 11, background: "#3a3a3a", padding: "2px 6px", borderRadius: 3, letterSpacing: "0.3px" }}>Ctrl K</span>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 2, marginLeft: "auto", flexShrink: 0 }}>
          <button style={{ background: "transparent", border: "none", color: "#aaa", cursor: "pointer", padding: "6px 8px", display: "flex", alignItems: "center", gap: 4 }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor"><path d="M7 1l1.5 3.5L12 5l-2.5 2.5.5 3.5L7 9.5 4 11l.5-3.5L2 5l3.5-.5z"/></svg>
            <span style={{ fontSize: 12, color: "#aaa" }}>Favorites</span>
          </button>
          <button style={{ background: "transparent", border: "none", color: "#aaa", cursor: "pointer", padding: "6px 8px", display: "flex", alignItems: "center" }}><Help size="sm" /></button>
          <button style={{ background: "transparent", border: "none", color: "#aaa", cursor: "pointer", padding: "6px 8px", display: "flex", alignItems: "center" }}><Bell size="sm" /></button>
          <div style={{ width: 30, height: 30, borderRadius: "50%", background: "#5a7a9a", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <span style={{ fontSize: 10, color: "#fff", fontWeight: 700 }}>DC</span>
          </div>
        </div>
      </div>

      {/* ── Page Wrapper ── */}
      <div style={{ display: "flex", flex: 1, position: "relative" }}>

        {/* ── Main Content ── */}
        <div style={{ flex: 1, padding: "16px 24px 100px", maxWidth: "calc(100% - 40px)" }}>

          {/* Breadcrumbs */}
          <Breadcrumbs variant="list" style={{ marginBottom: 8 }}>
            <Breadcrumbs.Crumb><a href="/company-templates" style={{ color: "hsl(200, 8%, 45%)", textDecoration: "none", fontSize: 13 }}>Action Plans Settings</a></Breadcrumbs.Crumb>
            <Breadcrumbs.Crumb><a href="/company-templates" style={{ color: "hsl(200, 8%, 45%)", textDecoration: "none", fontSize: 13 }}>Templates</a></Breadcrumbs.Crumb>
            <Breadcrumbs.Crumb active><span style={{ fontSize: 13 }}>New Action Plan Template</span></Breadcrumbs.Crumb>
          </Breadcrumbs>

          {/* Page Header */}
          <Flex justifyContent="space-between" alignItems="center" style={{ marginBottom: 16 }}>
            <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: "#111" }}>New Action Plan Template</h1>
            <Button variant="secondary" size="md">Delete</Button>
          </Flex>

          {/* ── Card: General Information ── */}
          <div style={{ background: "#fff", border: "1px solid #e0e0e0", borderRadius: 4, marginBottom: 16 }}>
            <div style={{ padding: "16px 20px", borderBottom: "1px solid #e0e0e0" }}>
              <span style={{ fontSize: 16, fontWeight: 700, color: "#232729" }}>General Information</span>
            </div>
            <div style={{ padding: "16px 20px" }}>

              {/* Row 1: Name, Type, Location, Private */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr auto", gap: 16, marginBottom: 20, alignItems: "start" }}>
                {/* Name */}
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#232729", marginBottom: 6 }}>
                    Name<span style={{ color: "hsl(360, 70%, 50%)" }}>*</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Enter Name"
                    style={{ width: "100%", height: 34, border: "1px solid #d0d0d0", borderRadius: 4, padding: "0 10px", fontSize: 14, color: "#333", outline: "none", boxSizing: "border-box" }}
                  />
                </div>
                {/* Type */}
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#232729", marginBottom: 6 }}>
                    Type<span style={{ color: "hsl(360, 70%, 50%)" }}>*</span>
                  </div>
                  <div style={{ position: "relative" }}>
                    <select style={{ width: "100%", height: 34, border: "1px solid #d0d0d0", borderRadius: 4, padding: "0 32px 0 10px", fontSize: 14, color: "#888", outline: "none", background: "#fff", appearance: "none", boxSizing: "border-box", cursor: "pointer" }}>
                      <option value="" disabled selected>Select Type</option>
                    </select>
                    <CaretDown size="sm" style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "#555" }} />
                  </div>
                </div>
                {/* Location */}
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#232729", marginBottom: 6 }}>Location</div>
                  <div style={{ fontSize: 13, color: "hsl(200, 8%, 60%)", paddingTop: 8 }}>configurable on project</div>
                </div>
                {/* Private */}
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#232729", marginBottom: 6 }}>Private</div>
                  <Checkbox />
                </div>
              </div>

              {/* Description */}
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#232729", marginBottom: 6 }}>Description</div>
                <div style={{ border: "1px solid #d0d0d0", borderRadius: 4, overflow: "hidden" }}>
                  {/* Toolbar */}
                  <div style={{ display: "flex", alignItems: "center", gap: 2, padding: "6px 8px", borderBottom: "1px solid #e0e0e0", background: "#fafafa", flexWrap: "wrap" }}>
                    {["B", "I", "U"].map((f) => (
                      <button key={f} style={{ width: 26, height: 26, border: "1px solid transparent", borderRadius: 3, background: "none", cursor: "pointer", fontSize: f === "B" ? 14 : 13, fontWeight: f === "B" ? 700 : 400, fontStyle: f === "I" ? "italic" : "normal", textDecoration: f === "U" ? "underline" : "none", color: "#333", display: "flex", alignItems: "center", justifyContent: "center" }}>{f}</button>
                    ))}
                    <div style={{ width: 1, height: 18, background: "#d0d0d0", margin: "0 2px" }} />
                    {[
                      <svg key="al" width="14" height="12" viewBox="0 0 14 12" fill="none"><rect y="0" width="14" height="2" rx="1" fill="#555"/><rect y="5" width="10" height="2" rx="1" fill="#555"/><rect y="10" width="14" height="2" rx="1" fill="#555"/></svg>,
                      <svg key="ac" width="14" height="12" viewBox="0 0 14 12" fill="none"><rect y="0" width="14" height="2" rx="1" fill="#555"/><rect x="2" y="5" width="10" height="2" rx="1" fill="#555"/><rect y="10" width="14" height="2" rx="1" fill="#555"/></svg>,
                      <svg key="ar" width="14" height="12" viewBox="0 0 14 12" fill="none"><rect y="0" width="14" height="2" rx="1" fill="#555"/><rect x="4" y="5" width="10" height="2" rx="1" fill="#555"/><rect y="10" width="14" height="2" rx="1" fill="#555"/></svg>,
                    ].map((icon, i) => (
                      <button key={i} style={{ width: 26, height: 26, border: "1px solid transparent", borderRadius: 3, background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>{icon}</button>
                    ))}
                    <div style={{ width: 1, height: 18, background: "#d0d0d0", margin: "0 2px" }} />
                    {[
                      <svg key="ul" width="14" height="12" viewBox="0 0 14 12" fill="none"><circle cx="2" cy="2" r="1.5" fill="#555"/><rect x="5" y="1" width="9" height="2" rx="1" fill="#555"/><circle cx="2" cy="6" r="1.5" fill="#555"/><rect x="5" y="5" width="9" height="2" rx="1" fill="#555"/><circle cx="2" cy="10" r="1.5" fill="#555"/><rect x="5" y="9" width="9" height="2" rx="1" fill="#555"/></svg>,
                      <svg key="ol" width="14" height="12" viewBox="0 0 14 12" fill="none"><text x="0" y="11" fontSize="10" fill="#555">1.</text><rect x="6" y="1" width="8" height="2" rx="1" fill="#555"/><rect x="6" y="5" width="8" height="2" rx="1" fill="#555"/></svg>,
                    ].map((icon, i) => (
                      <button key={i} style={{ width: 26, height: 26, border: "1px solid transparent", borderRadius: 3, background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>{icon}</button>
                    ))}
                    <div style={{ width: 1, height: 18, background: "#d0d0d0", margin: "0 2px" }} />
                    {["✂", "⎘", "⧉"].map((icon, i) => (
                      <button key={i} style={{ width: 26, height: 26, border: "1px solid transparent", borderRadius: 3, background: "none", cursor: "pointer", fontSize: 13, color: "#555", display: "flex", alignItems: "center", justifyContent: "center" }}>{icon}</button>
                    ))}
                    <div style={{ width: 1, height: 18, background: "#d0d0d0", margin: "0 2px" }} />
                    <div style={{ display: "flex", alignItems: "center", border: "1px solid #d0d0d0", borderRadius: 3, padding: "0 6px", height: 24, fontSize: 12, color: "#333", gap: 4, cursor: "pointer" }}>
                      14px <CaretDown size="sm" style={{ color: "#555" }} />
                    </div>
                    <div style={{ width: 1, height: 18, background: "#d0d0d0", margin: "0 2px" }} />
                    <button style={{ width: 26, height: 26, border: "1px solid transparent", borderRadius: 3, background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 2 }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: "#333", textDecoration: "underline 2px #e44" }}>A</span>
                      <CaretDown size="sm" style={{ color: "#555" }} />
                    </button>
                    <button style={{ width: 26, height: 26, border: "1px solid transparent", borderRadius: 3, background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 2 }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: "#333", background: "#ff0", padding: "0 2px" }}>A</span>
                      <CaretDown size="sm" style={{ color: "#555" }} />
                    </button>
                    <div style={{ width: 1, height: 18, background: "#d0d0d0", margin: "0 2px" }} />
                    <button style={{ width: 26, height: 26, border: "1px solid transparent", borderRadius: 3, background: "none", cursor: "pointer", fontSize: 16, color: "#555", display: "flex", alignItems: "center", justifyContent: "center" }}>↩</button>
                    <button style={{ width: 26, height: 26, border: "1px solid transparent", borderRadius: 3, background: "none", cursor: "pointer", fontSize: 16, color: "#555", display: "flex", alignItems: "center", justifyContent: "center" }}>↪</button>
                  </div>
                  {/* Editor area */}
                  <div contentEditable suppressContentEditableWarning style={{ minHeight: 120, padding: 12, fontSize: 14, color: "#333", outline: "none" }} />
                </div>
              </div>

              {/* Plan Manager / Approvers / Receivers */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
                {["Plan Manager", "Action Plan Approvers", "Completed Action Plan Receivers"].map((label) => (
                  <div key={label}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#232729", marginBottom: 4 }}>{label}</div>
                    <div style={{ fontSize: 13, color: "hsl(200, 8%, 60%)" }}>configurable on project</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Card: Sections and Items ── */}
          <div style={{ background: "#fff", border: "1px solid #e0e0e0", borderRadius: 4, marginBottom: 16 }}>
            <div style={{ padding: "14px 20px", borderBottom: "1px solid #e0e0e0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 16, fontWeight: 700, color: "#232729" }}>Sections and Items</span>
              <Flex alignItems="center" style={{ gap: 8 }}>
                <Switch checked={reorderSections} onChange={(e) => setReorderSections(e.target.checked)} />
                <span style={{ fontSize: 13, color: "#333" }}>Reorder Sections</span>
              </Flex>
            </div>

            {/* Table */}
            <div style={{ overflowX: "auto" }}>
              {/* Header */}
              <div style={{ display: "grid", gridTemplateColumns: "36px 32px 48px 210px 1fr 190px 170px 140px", alignItems: "center", borderBottom: "1px solid #e0e0e0", background: "#fafafa", padding: "0 8px" }}>
                <div style={{ padding: "10px 4px" }}>
                  <CaretsInVertical size="sm" style={{ color: "#555" }} />
                </div>
                <div style={{ padding: "10px 4px" }}><Checkbox /></div>
                <div style={{ padding: "10px 4px", fontSize: 13, fontWeight: 600, color: "#505759" }}>#</div>
                <div style={{ padding: "10px 4px", fontSize: 13, fontWeight: 600, color: "#505759" }}>Title</div>
                <div style={{ padding: "10px 4px", fontSize: 13, fontWeight: 600, color: "#505759" }}>Acceptance Criteria</div>
                <div style={{ padding: "10px 4px", fontSize: 13, fontWeight: 600, color: "#505759" }}>References</div>
                <div style={{ padding: "10px 4px", fontSize: 13, fontWeight: 600, color: "#505759" }}>Due Date</div>
                <div style={{ padding: "10px 4px", fontSize: 13, fontWeight: 600, color: "#505759" }}>Assignees</div>
              </div>

              {/* Sections */}
              {SECTIONS.map((section) => {
                const collapsed = collapsedSections.includes(section.id);
                return (
                  <div key={section.id}>
                    {/* Section Row */}
                    <div style={{ display: "grid", gridTemplateColumns: "36px 32px 48px 210px 1fr 190px 170px 140px", alignItems: "center", borderBottom: "1px solid #e0e0e0", padding: "0 8px", background: "#fff" }}>
                      <div style={{ padding: "10px 4px", cursor: "pointer" }} onClick={() => toggleSection(section.id)}>
                        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" style={{ transform: collapsed ? "rotate(-90deg)" : "none", transition: "transform 0.15s" }}>
                          <path d="M1 1L5 5L9 1" stroke="#555" strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>
                      </div>
                      <div style={{ padding: "10px 4px" }}><Checkbox /></div>
                      <div style={{ padding: "10px 4px", fontSize: 13, color: "#333" }}>{section.id}</div>
                      <div style={{ padding: "6px 4px" }}>
                        <input defaultValue={section.title} style={{ width: "100%", height: 30, border: "1px solid #d0d0d0", borderRadius: 3, padding: "0 8px", fontSize: 13, color: "#333", outline: "none", boxSizing: "border-box" }} />
                      </div>
                      <div /><div /><div /><div />
                    </div>

                    {/* Items */}
                    {!collapsed && section.items.map((item) => (
                      <div key={item.id} style={{ display: "grid", gridTemplateColumns: "36px 32px 48px 210px 1fr 190px 170px 140px", alignItems: "start", borderBottom: "1px solid #e0e0e0", padding: "0 8px", background: "#fff" }}>
                        <div />
                        <div style={{ padding: "10px 4px" }}><Checkbox /></div>
                        <div style={{ padding: "10px 4px", fontSize: 13, color: "#505759" }}>{item.id}</div>
                        <div style={{ padding: "6px 4px" }}>
                          <input defaultValue={item.title} style={{ width: "100%", height: 30, border: "1px solid #d0d0d0", borderRadius: 3, padding: "0 8px", fontSize: 13, color: "#333", outline: "none", boxSizing: "border-box" }} />
                        </div>
                        <div style={{ padding: "6px 4px" }}>
                          <div style={{ fontSize: 13, color: "#333", lineHeight: 1.5, whiteSpace: "pre-line" }}>{item.criteria}</div>
                        </div>
                        <div style={{ padding: "6px 4px" }}>
                          <Flex direction="column" style={{ gap: 6 }}>
                            <Button variant="secondary" size="sm" icon={<Plus />}>Add Procore Item</Button>
                            <Button variant="secondary" size="sm" icon={<Plus />}>Add Document</Button>
                          </Flex>
                        </div>
                        <div style={{ padding: "6px 4px" }}>
                          <div style={{ display: "flex", alignItems: "center", border: "1px solid #d0d0d0", borderRadius: 3, padding: "0 8px", height: 30, gap: 4, fontSize: 13, color: "#333" }}>
                            <span style={{ flex: 1 }}>{item.date}</span>
                            <button style={{ background: "none", border: "none", cursor: "pointer", color: "#888", padding: 0, display: "flex", alignItems: "center" }}>
                              <Clear size="sm" />
                            </button>
                          </div>
                        </div>
                        <div style={{ padding: "6px 4px" }}>
                          <Button variant="secondary" size="sm" icon={<Plus />}>Edit Assignee</Button>
                        </div>
                      </div>
                    ))}

                    {/* Add Item */}
                    {!collapsed && (
                      <div style={{ padding: "10px 16px", borderBottom: "1px solid #e0e0e0" }}>
                        <Button variant="secondary" size="sm" icon={<Plus />}>Add Item</Button>
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Add Item + Add Section */}
              <div style={{ padding: "12px 16px", display: "flex", gap: 8 }}>
                <Button variant="secondary" size="sm" icon={<Plus />}>Add Item</Button>
                <Button variant="secondary" size="sm" icon={<Plus />}>Add Section</Button>
              </div>
            </div>
          </div>
        </div>

        {/* ── Right floating sidebar ── */}
        <div style={{ width: 40, position: "sticky", top: 48, height: "calc(100vh - 48px)", display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 12, gap: 4, borderLeft: "1px solid #e0e0e0", background: "#fff", flexShrink: 0 }}>
          {[
            { label: "Assist", icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.5" stroke="#555" strokeWidth="1.5"/><path d="M8 5v4M8 11v.5" stroke="#555" strokeWidth="1.5" strokeLinecap="round"/></svg> },
            { label: "Conver...", icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 2h12v9H9l-3 3v-3H2z" stroke="#555" strokeWidth="1.5" strokeLinejoin="round"/></svg> },
            { label: "Kickoff", icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 2L10 6H14L11 9L12 13L8 11L4 13L5 9L2 6H6Z" stroke="#555" strokeWidth="1.3" strokeLinejoin="round"/></svg> },
          ].map(({ label, icon }) => (
            <button key={label} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 2, padding: "6px 0", width: "100%" }}>
              {icon}
              <span style={{ fontSize: 9, color: "#555", textAlign: "center", lineHeight: 1.2 }}>{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Toast ── */}
      {showToast && (
        <div style={{ position: "fixed", bottom: 64, left: "50%", transform: "translateX(-50%)", zIndex: 9999 }}>
          <Toast variant="success" style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 16px", minWidth: 340 }}>
            <Toast.Text>The file was successfully imported.</Toast.Text>
            <Toast.Dismiss onClick={() => setShowToast(false)} />
          </Toast>
        </div>
      )}

      {/* ── Sticky Footer ── */}
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: "#fff", borderTop: "1px solid #e0e0e0", padding: "12px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", zIndex: 200 }}>
        <span style={{ fontSize: 12, color: "hsl(200, 8%, 45%)", fontStyle: "italic" }}>
          <span style={{ color: "hsl(360, 70%, 50%)" }}>*</span>Required fields
        </span>
        <Flex alignItems="center" style={{ gap: 8 }}>
          <Button variant="secondary" size="md" onClick={() => { window.location.href = "/company-templates"; }}>Cancel</Button>
          <Button variant="secondary" size="md">Save Draft</Button>
          <Button variant="primary" size="md">Publish</Button>
        </Flex>
      </div>

    </div>
  );
}
