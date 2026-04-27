import React, { useState } from "react";
import { Bell, CaretDown, Clear, Help, Info, Star, Trash } from "@procore/core-icons";
import { Banner, Button, Dropzone, Flex, Pagination, Tabs, Table, Token, useDropzone } from "@procore/core-react";

interface Template {
  id: number;
  name: string;
  type: string;
  canView?: boolean;
}

const TEMPLATES: Template[] = [
  { id: 1, name: "Safety Onboarding Company Template", type: "Air Handling Unit" },
  { id: 2, name: "Trying References from Company Template", type: "Asset HVAC" },
  { id: 3, name: "Company Template Dates", type: "Brickwork" },
  { id: 4, name: "AHU Commissioning Template", type: "Concrete" },
  { id: 5, name: "[Procore] Project Development", type: "Electrical" },
  { id: 6, name: "[Procore] Preconstruction / Construction Handoff", type: "Environmental" },
  { id: 7, name: "[Procore] Concrete Pour(s) Plan - HC", type: "Finishes" },
  { id: 8, name: "[Procore] Project Closeout", type: "Metalwork" },
  { id: 9, name: "[Procore] 3 Phase Quality Plan", type: "Preconstruction" },
  { id: 10, name: "Environmental Plan", type: "Project Management" },
];

const COMPANY_SETTINGS = [
  "Account Information",
  "App Management",
  "Assist",
  "Certification Analytics",
  "Classifications",
  "Conversations",
  "Currency Settings",
  "Expense Allocations",
  "General Settings",
  "Procore Explore",
  "Root Cause Analysis",
  "Single Sign On Configuration",
  "Trades",
  "Unit of Measure Master List",
  "Webhooks",
  "Work Breakdown Structure",
];

const PROJECT_SETTINGS = ["Dates", "Defaults", "Fieldset", "Project Templates", "Roles"];

const TOOL_SETTINGS: { name: string; active?: boolean; beta?: boolean }[] = [
  { name: "Action Plans", active: true },
  { name: "Abilities" },
  { name: "Assets", beta: true },
  { name: "Assist" },
  { name: "Bidding" },
  { name: "Budget" },
  { name: "Change Management" },
  { name: "Contracts & Change Orders" },
  { name: "Connection Manager" },
  { name: "Coordination Issues" },
  { name: "Correspondence" },
  { name: "Directory" },
  { name: "Daily Log" },
  { name: "Document Management" },
  { name: "Drawings" },
  { name: "Forms" },
  { name: "Incidents" },
  { name: "Inspections" },
  { name: "Invoicing" },
  { name: "Meetings" },
  { name: "Observations" },
  { name: "Punch List" },
  { name: "RFIs" },
  { name: "Specifications" },
  { name: "Submittals" },
  { name: "Tasks" },
  { name: "Timesheets" },
];

export default function CompanyTemplates() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activePage, setActivePage] = useState(1);
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const [showImportModal, setShowImportModal] = useState(false);
  const [attachedFile, setAttachedFile] = useState<File | null>(null);

  const dropzoneState = useDropzone({
    multiple: false,
    accept: ".xlsx,.xls,.csv",
    onDropAccepted: (files) => {
      setAttachedFile(files[0]);
    },
  });

  const visibleTemplates = TEMPLATES.filter((t) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return t.name.toLowerCase().includes(q) || t.type.toLowerCase().includes(q);
  });

  return (
    <div style={{ minHeight: "100vh", background: "#fff", fontFamily: "system-ui, -apple-system, sans-serif" }}>

      {/* ── Global Nav ── */}
      <div style={{
        background: "#1c1c1c",
        display: "flex",
        alignItems: "center",
        height: 48,
        padding: "0 12px",
        position: "sticky",
        top: 0,
        zIndex: 100,
        boxSizing: "border-box",
        gap: 8,
      }}>
        {/* Hamburger + Menu */}
        <button style={{ background: "transparent", border: "none", color: "#ccc", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, padding: "4px 6px", borderRadius: 4, flexShrink: 0 }}>
          <svg width="16" height="14" viewBox="0 0 16 14" fill="none">
            <rect y="0" width="16" height="2" rx="1" fill="#ccc"/>
            <rect y="6" width="16" height="2" rx="1" fill="#ccc"/>
            <rect y="12" width="16" height="2" rx="1" fill="#ccc"/>
          </svg>
          <span style={{ fontSize: 13, fontWeight: 500, color: "#ccc" }}>Menu</span>
        </button>

        {/* PROCORE logo */}
        <span style={{ fontSize: 15, fontWeight: 800, color: "#fff", letterSpacing: "1px", flexShrink: 0, marginRight: 4 }}>PROCORE</span>

        {/* Company / Project selector pill */}
        <button style={{
          background: "#2e2e2e",
          border: "1px solid #444",
          borderRadius: 6,
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "4px 10px 4px 6px",
          cursor: "pointer",
          flexShrink: 0,
          maxWidth: 220,
        }}>
          <div style={{
            width: 32,
            height: 32,
            borderRadius: 4,
            background: "#3a5a8a",
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}>
            <span style={{ fontSize: 8, color: "#adc8f0", fontWeight: 700, textAlign: "center", lineHeight: 1.2 }}>Vertigo<br/>Const.</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", minWidth: 0 }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: "#fff", whiteSpace: "nowrap" }}>Vertigo Construction</span>
            <span style={{ fontSize: 11, color: "#aaa", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: 130 }}>Burnham Park Data C...</span>
          </div>
          <CaretDown size="sm" style={{ color: "#888", flexShrink: 0 }} />
        </button>

        {/* AI Search — centered */}
        <div style={{ flex: 1, maxWidth: 520, margin: "0 auto" }}>
          <div style={{ background: "#2d2d2d", border: "1px solid #3a3a3a", borderRadius: 6, display: "flex", alignItems: "center", padding: "0 10px", height: 34, gap: 8 }}>
            <span style={{ color: "#f47b20", fontSize: 15, lineHeight: 1, flexShrink: 0 }}>✦</span>
            <span style={{ color: "#777", fontSize: 13, flex: 1, whiteSpace: "nowrap" }}>Search or Ask a Question</span>
            <span style={{ color: "#666", fontSize: 11, background: "#3a3a3a", padding: "2px 6px", borderRadius: 3, whiteSpace: "nowrap", letterSpacing: "0.3px", flexShrink: 0 }}>
              Ctrl&nbsp;K
            </span>
          </div>
        </div>

        {/* Right side */}
        <div style={{ display: "flex", alignItems: "center", gap: 2, marginLeft: "auto", flexShrink: 0 }}>
          <button style={{ background: "#2e2e2e", border: "1px solid #444", borderRadius: 6, color: "#ccc", cursor: "pointer", padding: "4px 10px", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "center", lineHeight: 1.4, gap: 1 }}>
            <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: "#ccc" }}>
              Apps <CaretDown size="sm" style={{ color: "#888" }} />
            </span>
            <span style={{ fontSize: 10, color: "#777" }}>Select an App</span>
          </button>
          <button style={{ background: "transparent", border: "none", color: "#aaa", cursor: "pointer", padding: "6px 8px", borderRadius: 4, display: "flex", alignItems: "center" }}>
            <Help size="sm" />
          </button>
          <button style={{ background: "transparent", border: "none", color: "#aaa", cursor: "pointer", padding: "6px 8px", borderRadius: 4, display: "flex", alignItems: "center" }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M9 1C9 1 3 4 3 9.5C3 12.5 5.5 15 9 15C12.5 15 15 12.5 15 9.5C15 4 9 1 9 1Z" stroke="#aaa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="9" cy="9" r="2" stroke="#aaa" strokeWidth="1.5"/>
            </svg>
          </button>
          <button style={{ background: "transparent", border: "none", color: "#aaa", cursor: "pointer", padding: "6px 8px", borderRadius: 4, display: "flex", alignItems: "center" }}>
            <Bell size="sm" />
          </button>
          <button style={{ background: "transparent", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 8, padding: "4px 6px", borderRadius: 4 }}>
            <div style={{ width: 30, height: 30, borderRadius: "50%", background: "#5a7a9a", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <span style={{ fontSize: 10, color: "#fff", fontWeight: 700 }}>VC</span>
            </div>
            <span style={{ fontSize: 11, color: "#ccc", whiteSpace: "nowrap" }}>Vertigo construction</span>
          </button>
        </div>
      </div>

      {/* ── Page Layout ── */}
      <div style={{ display: "flex", minHeight: "calc(100vh - 48px)" }}>

        {/* ── Main Content ── */}
        <div style={{ flex: 1, minWidth: 0, padding: "20px 24px 24px" }}>

          {/* Title + Buttons */}
          <Flex justifyContent="space-between" alignItems="center" style={{ marginBottom: 12 }}>
            <h1 style={{ margin: 0, fontSize: 26, fontWeight: 700, color: "#111" }}>Action Plans Settings</h1>
            <Flex alignItems="center" style={{ gap: 8 }}>
              <Button variant="primary" size="md">Create Template</Button>
              <Button variant="secondary" size="md" onClick={() => setShowImportModal(true)}>Import Template</Button>
            </Flex>
          </Flex>

          {/* Tabs */}
          <Tabs>
            <Tabs.Tab selected role="button" onPress={() => {}}>Templates</Tabs.Tab>
            <Tabs.Tab role="button" onPress={() => {}}>Template Recycle Bin</Tabs.Tab>
            <Tabs.Tab role="button" onPress={() => {}}>Configurations</Tabs.Tab>
            <Tabs.Tab role="button" onPress={() => {}}>Fieldsets</Tabs.Tab>
            <Tabs.Tab role="button" onPress={() => {}}>Custom Fields</Tabs.Tab>
          </Tabs>

          {/* Table Panel */}
          <div style={{ border: "1px solid #e0e0e0", borderRadius: 4, background: "#fff", marginTop: 16 }}>

            {/* Toolbar */}
            <div style={{ padding: "12px 16px", display: "flex", alignItems: "center", gap: 8 }}>
              {/* Search */}
              <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ position: "absolute", left: 10, color: "#888", pointerEvents: "none" }}>
                  <circle cx="7" cy="7" r="5" stroke="#888" strokeWidth="1.5"/>
                  <line x1="11" y1="11" x2="14" y2="14" stroke="#888" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    height: 34,
                    width: 200,
                    border: "1px solid #d0d0d0",
                    borderRadius: 4,
                    paddingLeft: 32,
                    paddingRight: 10,
                    fontSize: 14,
                    color: "#333",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              {/* Add Filter */}
              <button style={{
                height: 34,
                border: "1px solid #d0d0d0",
                borderRadius: 4,
                background: "#fff",
                padding: "0 12px",
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontSize: 14,
                color: "#333",
                cursor: "pointer",
              }}>
                Add Filter
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                  <path d="M1 1L5 5L9 1" stroke="#555" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
            </div>

            {/* Table */}
            <Table style={{ width: "100%", borderTop: "1px solid #e0e0e0" }}>
              <Table.Header>
                <Table.HeaderRow>
                  <Table.HeaderCell snugfit style={{ width: 80, height: 44, padding: "0 8px 0 16px" }} />
                  <Table.HeaderCell style={{ height: 44, padding: "0 16px" }}>Name</Table.HeaderCell>
                  <Table.HeaderCell style={{ width: 260, height: 44, padding: "0 16px" }}>Type</Table.HeaderCell>
                </Table.HeaderRow>
              </Table.Header>
              <Table.Body>
                {visibleTemplates.map((template, idx) => (
                  <Table.BodyRow
                    key={template.id}
                    onMouseEnter={() => setHoveredRow(template.id)}
                    onMouseLeave={() => setHoveredRow(null)}
                    style={idx === visibleTemplates.length - 1 ? { borderBottom: "1px solid #e0e0e0" } : undefined}
                  >
                    <Table.BodyCell snugfit style={{ padding: 0 }}>
                      <div style={{ height: 48, display: "flex", alignItems: "center", padding: "0 8px 0 16px" }}>
                        <Button variant="secondary" size="sm">
                          {template.canView ? "View" : "Edit"}
                        </Button>
                      </div>
                    </Table.BodyCell>
                    <Table.LinkCell href="#" style={{ padding: 0 }}>
                      <div style={{ height: 48, display: "flex", alignItems: "center", padding: "0 16px" }}>{template.name}</div>
                    </Table.LinkCell>
                    <Table.BodyCell style={{ padding: 0 }}>
                      <div style={{ height: 48, display: "flex", alignItems: "center", padding: "0 16px" }}>{template.type}</div>
                    </Table.BodyCell>
                  </Table.BodyRow>
                ))}
              </Table.Body>
            </Table>

            {/* Bottom Pagination */}
            <Flex justifyContent="flex-end" alignItems="center" style={{ padding: "10px 16px", borderTop: "1px solid #e0e0e0" }}>
              <Pagination
                activePage={activePage}
                items={1000}
                perPage={10}
                onSelectPage={(page) => setActivePage(page)}
              />
            </Flex>
          </div>
        </div>

        {/* ── Right Sidebar ── */}
        <div style={{ width: 220, borderLeft: "1px solid #e0e0e0", flexShrink: 0, display: "flex", flexDirection: "column" }}>
          <div style={{ flex: 1, overflowY: "auto", padding: "20px 0 0" }}>

            {/* Company Settings */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ padding: "0 16px 8px", fontSize: 11, fontWeight: 700, color: "#333", letterSpacing: "0.6px", textTransform: "uppercase" }}>
                Company Settings
              </div>
              {COMPANY_SETTINGS.map((link) => (
                <a key={link} href="#" style={{ display: "block", padding: "5px 16px", fontSize: 13, color: "#333", textDecoration: "none", lineHeight: "20px" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#f5f5f5")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  {link}
                </a>
              ))}
            </div>

            {/* Project Settings */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ padding: "0 16px 8px", fontSize: 11, fontWeight: 700, color: "#333", letterSpacing: "0.6px", textTransform: "uppercase" }}>
                Project Settings
              </div>
              {PROJECT_SETTINGS.map((link) => (
                <a key={link} href="#" style={{ display: "block", padding: "5px 16px", fontSize: 13, color: "#333", textDecoration: "none", lineHeight: "20px" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#f5f5f5")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  {link}
                </a>
              ))}
            </div>

            {/* Tool Settings */}
            <div style={{ marginBottom: 8 }}>
              <div style={{ padding: "0 16px 8px", fontSize: 11, fontWeight: 700, color: "#333", letterSpacing: "0.6px", textTransform: "uppercase" }}>
                Tool Settings
              </div>
              {TOOL_SETTINGS.map((item) => (
                <a
                  key={item.name}
                  href="#"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "5px 16px",
                    fontSize: 13,
                    color: item.active ? "#f47b20" : "#333",
                    textDecoration: "none",
                    fontWeight: item.active ? 600 : 400,
                    borderLeft: item.active ? "3px solid #f47b20" : "3px solid transparent",
                    background: item.active ? "#fff5ee" : "transparent",
                    lineHeight: "20px",
                  }}
                  onMouseEnter={(e) => { if (!item.active) e.currentTarget.style.background = "#f5f5f5"; }}
                  onMouseLeave={(e) => { if (!item.active) e.currentTarget.style.background = "transparent"; }}
                >
                  {item.name}
                  {item.beta && (
                    <span style={{ fontSize: 9, fontWeight: 700, color: "#fff", background: "#1a78d0", borderRadius: 3, padding: "1px 4px", letterSpacing: "0.5px" }}>
                      BETA
                    </span>
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* Minimize Sidebar */}
          <div style={{ borderTop: "1px solid #e0e0e0", padding: "12px 16px", flexShrink: 0 }}>
            <button style={{ background: "none", border: "none", cursor: "pointer", color: "#333", fontSize: 13, display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", padding: 0 }}>
              <span>Minimize Sidebar</span>
              <span style={{ color: "#f47b20", fontSize: 16 }}>›</span>
            </button>
          </div>
        </div>

      </div>
      {/* ── Import Template Modal ── */}
      {showImportModal && (
        <div style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.5)",
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <div style={{
            background: "#fff",
            borderRadius: 4,
            width: 688,
            boxShadow: "0 8px 32px rgba(0,0,0,0.24)",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}>

            {/* Header */}
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "16px 20px",
              borderBottom: "1px solid #e0e0e0",
            }}>
              <span style={{ fontSize: 16, fontWeight: 700, color: "#232729" }}>Import Action Plan Template</span>
              <Button
                variant="tertiary"
                size="sm"
                icon={<Clear style={{ width: 16, height: 16 }} />}
                aria-label="Close"
                onClick={() => { setShowImportModal(false); setAttachedFile(null); }}
                style={{ width: 24, height: 24, minWidth: 24, padding: 0 }}
              />
            </div>

            {/* Body */}
            <div style={{ padding: "20px 20px 8px" }}>

              {/* Info banner */}
              <div style={{ marginBottom: 24 }}>
                <Banner variant="info">
                  <Banner.Icon icon={<Info />} />
                  <Banner.Content>
                    <Banner.Title>Download Action Plan Template</Banner.Title>
                    <Banner.Body>
                      Download the Excel file below and fill it out with your information. Then, import the finished file to automatically generate new line items in your action plan.
                    </Banner.Body>
                  </Banner.Content>
                  <Banner.Action>
                    <Button variant="secondary" size="sm">Learn More</Button>
                  </Banner.Action>
                </Banner>
              </div>

              {/* Step 1 */}
              <div style={{ marginBottom: 24 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#232729", marginBottom: 10 }}>
                  1. Download Excel File<span style={{ color: "#c0392b" }}>*</span>
                </div>
                <Button
                  variant="secondary"
                  size="md"
                  onClick={() => {
                    const a = document.createElement("a");
                    a.href = "https://docs.google.com/spreadsheets/d/1NRPpentuoD2sVQSNJWqdqdOrCER5egU2J7Y8Dk2PtHY/export?format=xlsx&gid=1930030310";
                    a.download = "Action_Plan_Template.xlsx";
                    a.click();
                  }}
                >
                  <Flex alignItems="center" style={{ gap: 8 }}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M7 1.5V9.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                      <path d="M4 7L7 10L10 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M1.5 12.5H12.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                    </svg>
                    Download
                  </Flex>
                </Button>
              </div>

              {/* Step 2 */}
              <div style={{ marginBottom: 8 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#232729", marginBottom: 10 }}>
                  2. Import Excel File<span style={{ color: "#c0392b" }}>*</span>
                </div>
                {attachedFile ? (
                  <Token className="import-file-token" style={{ width: 360 }}>
                    <Token.Label style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{attachedFile.name}</Token.Label>
                    <Token.Remove onClick={() => setAttachedFile(null)} />
                  </Token>
                ) : (
                  <Dropzone
                    {...dropzoneState}
                    contentRenderer={({ open }) => (
                      <Flex direction="column" alignItems="center" style={{ gap: 8, padding: "4px 0" }}>
                        <Button variant="secondary" size="md" onClick={open}>Attach File</Button>
                        <span style={{ fontSize: 13, color: "#8a9296" }}>or Drag &amp; Drop</span>
                      </Flex>
                    )}
                  />
                )}
              </div>

            </div>

            {/* Footer */}
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "14px 20px",
              borderTop: "1px solid #e0e0e0",
              marginTop: 12,
            }}>
              <span style={{ fontSize: 12, color: "hsl(200, 8%, 45%)", fontStyle: "italic" }}><span style={{ color: "hsl(360, 70%, 50%)" }}>*</span>Required fields</span>
              <Flex alignItems="center" style={{ gap: 8 }}>
                <Button variant="secondary" size="md" onClick={() => { setShowImportModal(false); setAttachedFile(null); }}>
                  Cancel
                </Button>
                <Button variant="primary" size="md" disabled={!attachedFile} onClick={() => { window.location.href = "/new-action-plan-template"; }}>
                  Import
                </Button>
              </Flex>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
