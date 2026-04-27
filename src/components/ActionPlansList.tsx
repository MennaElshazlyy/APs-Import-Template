import React, { useState, useEffect, useRef } from "react";
import {
  ArrowDown,
  Bell,
  Blueprint,
  CaretDown,
  CaretUp,
  Cog,
  Comments,
  GridStroked,
  Help,
  Home,
  Star,
  Trash,
} from "@procore/core-icons";
import {
  Button,
  Flex,
  Menu,
  OverlayTrigger,
  Pagination,
  Pill,
  ProgressBar,
  Search,
  Tabs,
  Table,
  Toast,
  ToolHeader,
} from "@procore/core-react";
import type { PillColor } from "@procore/core-react";

type Status = "in_progress" | "draft" | "closed";

interface ActionPlan {
  id: number;
  name: string;
  type: string;
  status: Status;
  progress: { completed: number; total: number };
  location: string;
  planManager: string;
  canDelete?: boolean;
}

const ACTION_PLANS: ActionPlan[] = [
  { id: 156, name: "[Procore] 3 Phase Quality Plan", type: "Quality", status: "draft", progress: { completed: 0, total: 12 }, location: "Building A", planManager: "Sarah Johnson" },
  { id: 155, name: "[Procore] 3 Phase Quality Plan", type: "Quality", status: "draft", progress: { completed: 1, total: 12 }, location: "Floor 1", planManager: "Emily Davis" },
  { id: 154, name: "Plan B", type: "Concrete2", status: "in_progress", progress: { completed: 2, total: 3 }, location: "Parking Structure", planManager: "Abdallah Alaraby" },
  { id: 152, name: "[Procore] 3 Phase Quality Plan", type: "Quality", status: "closed", progress: { completed: 13, total: 13 }, location: "Building B", planManager: "Mike Chen", canDelete: true },
  { id: 151, name: "[Procore] 3 Phase Quality Plan", type: "Quality", status: "in_progress", progress: { completed: 4, total: 13 }, location: "Floor 2", planManager: "Sarah Johnson" },
  { id: 150, name: "[Procore] 3 Phase Quality Plan", type: "Quality", status: "draft", progress: { completed: 0, total: 12 }, location: "Site Office", planManager: "Emily Davis" },
  { id: 149, name: "[Procore] 3 Phase Quality Plan", type: "Quality", status: "draft", progress: { completed: 0, total: 12 }, location: "Building A", planManager: "Matt Baum" },
];

interface MenuPlanItem {
  name: string;
  inRevision: boolean;
}
interface MenuPlanGroup {
  header: string;
  items: MenuPlanItem[];
}

const MENU_GROUPS: MenuPlanGroup[] = [
  {
    header: "Quality",
    items: [
      { name: "[Procore] 3 Phase Quality Plan", inRevision: true },
      { name: "[Procore] 3 Phase Quality Plan", inRevision: true },
      { name: "[Procore] 3 Phase Quality Plan", inRevision: false },
      { name: "[Procore] Concrete Pour(s) Plan - HC", inRevision: true },
    ],
  },
  {
    header: "Preconstruction",
    items: [
      { name: "[Procore] Preconstruction / Construction Handoff", inRevision: true },
      { name: "[Procore] Preconstruction / Construction Handoff", inRevision: false },
    ],
  },
  {
    header: "Project Execution",
    items: [
      { name: "[Procore] Project Closeout", inRevision: true },
      { name: "[Procore] Project Development", inRevision: true },
      { name: "Trying References from Company Template", inRevision: true },
    ],
  },
  {
    header: "Air Handling Unit",
    items: [
      { name: "AHU Commissioning Template", inRevision: true },
      { name: "Test", inRevision: true },
    ],
  },
  {
    header: "Pumping System",
    items: [
      { name: "Company Level Pumping System Commissioning Template", inRevision: true },
    ],
  },
  {
    header: "Environmental",
    items: [
      { name: "Environmental Plan", inRevision: false },
      { name: "Environmental Plan", inRevision: true },
      { name: "Notes", inRevision: true },
    ],
  },
  {
    header: "Concrete",
    items: [
      { name: "Inspection Request", inRevision: true },
      { name: "test", inRevision: true },
    ],
  },
  {
    header: "Test PT",
    items: [],
  },
  {
    header: "Brickwork",
    items: [
      { name: "ITP 01", inRevision: true },
      { name: "ITP 01 project", inRevision: false },
      { name: "uu", inRevision: false },
      { name: "uu", inRevision: true },
    ],
  },
];

const STATUS_LABEL: Record<Status, string> = {
  in_progress: "IN PROGRESS",
  draft: "DRAFT",
  closed: "CLOSED",
};

const STATUS_COLOR: Record<Status, PillColor> = {
  in_progress: "blue",
  draft: "gray",
  closed: "green",
};

const FILTER_OPTIONS: Record<string, string[]> = {
  Type: ["Asset HVAC", "Brickwork", "Concrete", "Concrete2", "Electrical", "Environmental", "Metalwork", "Preconstruction", "Quality"],
  Location: ["Building A", "Building B", "Floor 1", "Floor 2", "Parking Structure", "Site Office"],
  "Plan Manager": ["Abdallah Alaraby", "Emily Davis", "Matt Baum", "Mike Chen", "Sarah Johnson"],
  Status: ["Closed", "Draft", "In Progress"],
};

const FILTER_NAMES = ["Type", "Location", "Plan Manager", "Status"];

export default function ActionPlansList() {
  const [activePage, setActivePage] = useState(1);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuSearch, setMenuSearch] = useState("");
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const [planToDelete, setPlanToDelete] = useState<ActionPlan | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [plans, setPlans] = useState(ACTION_PLANS);

  const [searchQuery, setSearchQuery] = useState("");

  // Filter state
  const [openPanel, setOpenPanel] = useState<string | null>(null);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [filterSelections, setFilterSelections] = useState<Record<string, string[]>>({});
  const [filterSearches, setFilterSearches] = useState<Record<string, string>>({});
  const [appliedSelections, setAppliedSelections] = useState<Record<string, string[]>>({});
  const filterAreaRef = useRef<HTMLDivElement>(null);
  const prevOpenPanel = useRef<string | null>(null);

  const total = 185;
  const perPage = 100;

  // Close all filter panels on outside click
  useEffect(() => {
    function onMouseDown(e: MouseEvent) {
      if (filterAreaRef.current && !filterAreaRef.current.contains(e.target as Node)) {
        setOpenPanel(null);
      }
    }
    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, []);

  // Commit selections to appliedSelections when a filter panel closes
  useEffect(() => {
    const prev = prevOpenPanel.current;
    if (prev && prev !== "addFilter" && prev !== openPanel) {
      setAppliedSelections((cur) => ({ ...cur, [prev]: filterSelections[prev] ?? [] }));
    }
    prevOpenPanel.current = openPanel;
  }, [openPanel]); // eslint-disable-line react-hooks/exhaustive-deps

  const filteredMenuGroups = menuSearch.trim() === ""
    ? MENU_GROUPS
    : MENU_GROUPS
        .map((group) => ({
          ...group,
          items: group.items.filter((item) =>
            item.name.toLowerCase().includes(menuSearch.toLowerCase())
          ),
        }))
        .filter((group) =>
          group.items.length > 0 ||
          group.header.toLowerCase().includes(menuSearch.toLowerCase())
        );

  function addFilter(name: string) {
    setActiveFilters((prev) => (prev.includes(name) ? prev : [...prev, name]));
    setOpenPanel(name);
  }

  function removeFilter(name: string) {
    setActiveFilters((prev) => prev.filter((f) => f !== name));
    setFilterSelections((prev) => { const next = { ...prev }; delete next[name]; return next; });
    setFilterSearches((prev) => { const next = { ...prev }; delete next[name]; return next; });
    setAppliedSelections((prev) => { const next = { ...prev }; delete next[name]; return next; });
    setOpenPanel((cur) => (cur === name ? null : cur));
  }

  function clearAll() {
    setActiveFilters([]);
    setFilterSelections({});
    setFilterSearches({});
    setAppliedSelections({});
    setOpenPanel(null);
  }

  function toggleOption(filterName: string, opt: string) {
    setFilterSelections((prev) => {
      const cur = prev[filterName] ?? [];
      return {
        ...prev,
        [filterName]: cur.includes(opt) ? cur.filter((o) => o !== opt) : [...cur, opt],
      };
    });
  }

  function toggleSelectAll(filterName: string) {
    const opts = FILTER_OPTIONS[filterName];
    const cur = filterSelections[filterName] ?? [];
    setFilterSelections((prev) => ({
      ...prev,
      [filterName]: cur.length === opts.length ? [] : [...opts],
    }));
  }

  const STATUS_FILTER_MAP: Record<Status, string> = {
    in_progress: "In Progress",
    draft: "Draft",
    closed: "Closed",
  };

  const visiblePlans = plans.filter((plan) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matches =
        plan.name.toLowerCase().includes(q) ||
        plan.type.toLowerCase().includes(q) ||
        plan.planManager.toLowerCase().includes(q) ||
        plan.location.toLowerCase().includes(q) ||
        STATUS_FILTER_MAP[plan.status].toLowerCase().includes(q) ||
        String(plan.id).includes(q);
      if (!matches) return false;
    }
    for (const filterName of activeFilters) {
      const selected = appliedSelections[filterName] ?? [];
      if (selected.length === 0) continue;
      if (filterName === "Type" && !selected.includes(plan.type)) return false;
      if (filterName === "Location" && !selected.includes(plan.location)) return false;
      if (filterName === "Plan Manager" && !selected.includes(plan.planManager)) return false;
      if (filterName === "Status" && !selected.includes(STATUS_FILTER_MAP[plan.status])) return false;
    }
    return true;
  });

  function renderFilterPanel(filterName: string) {
    const opts = FILTER_OPTIONS[filterName];
    const search = filterSearches[filterName] ?? "";
    const selected = filterSelections[filterName] ?? [];
    const filtered = opts.filter((o) => o.toLowerCase().includes(search.toLowerCase()));
    const allSelected = selected.length === opts.length;
    const someSelected = selected.length > 0 && !allSelected;

    return (
      <Menu style={{
        position: "absolute",
        top: "calc(100% + 4px)",
        left: 0,
        zIndex: 1000,
        width: 248,
        background: "#fff",
        border: "1px solid #d0d0d0",
        borderRadius: 6,
        boxShadow: "0 4px 20px rgba(0,0,0,0.14)",
      }}>
        {/* Search */}
        <div style={{ padding: "10px 12px", borderBottom: "1px solid #eee" }}>
          <div style={{ position: "relative" }}>
            <input
              type="text"
              placeholder="Search"
              value={search}
              autoFocus
              onChange={(e) =>
                setFilterSearches((prev) => ({ ...prev, [filterName]: e.target.value }))
              }
              style={{
                width: "100%",
                boxSizing: "border-box",
                border: "2px solid #1a78d0",
                borderRadius: 4,
                padding: "7px 30px 7px 10px",
                fontSize: 14,
                outline: "none",
                color: "#333",
              }}
            />
            {search && (
              <button
                onClick={() => setFilterSearches((prev) => ({ ...prev, [filterName]: "" }))}
                style={{
                  position: "absolute",
                  right: 8,
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#888",
                  fontSize: 16,
                  lineHeight: 1,
                  padding: 0,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                ×
              </button>
            )}
          </div>
        </div>

        {/* Select All */}
        {filtered.length > 0 && (
          <label style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "10px 16px",
            cursor: "pointer",
            fontWeight: 700,
            fontSize: 14,
            color: "#111",
            borderBottom: "1px solid #eee",
            userSelect: "none",
          }}>
            <input
              type="checkbox"
              checked={allSelected}
              ref={(el) => { if (el) el.indeterminate = someSelected; }}
              onChange={() => toggleSelectAll(filterName)}
              style={{ width: 16, height: 16, cursor: "pointer", flexShrink: 0 }}
            />
            Select All
          </label>
        )}

        {/* Options list */}
        <div style={{ maxHeight: 240, overflowY: "auto" }}>
          {filtered.length === 0 ? (
            <div style={{ padding: "16px 14px", color: "#999", fontSize: 14, fontStyle: "italic" }}>
              No items.
            </div>
          ) : (
            <Menu.Options scrollable={false}>
              {filtered.map((opt) => (
                <Menu.Item key={opt}>
                  <label style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    cursor: "pointer",
                    fontSize: 14,
                    color: "#333",
                    userSelect: "none",
                    width: "100%",
                  }}>
                    <input
                      type="checkbox"
                      checked={selected.includes(opt)}
                      onChange={() => toggleOption(filterName, opt)}
                      style={{ width: 16, height: 16, cursor: "pointer", flexShrink: 0 }}
                    />
                    {opt}
                  </label>
                </Menu.Item>
              ))}
            </Menu.Options>
          )}
        </div>
      </Menu>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f5f5f5", fontFamily: "system-ui, -apple-system, sans-serif" }}>

      {/* ── Global Nav Bar ── */}
      <div style={{
        background: "#1c1c1c",
        display: "flex",
        alignItems: "center",
        height: 48,
        padding: "0 8px",
        position: "sticky",
        top: 0,
        zIndex: 100,
        boxSizing: "border-box",
        gap: 0,
      }}>
        {/* Home button */}
        <button style={{
          background: "#f47b20",
          border: "none",
          borderRadius: 4,
          width: 36,
          height: 36,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          flexShrink: 0,
          marginRight: 6,
        }}>
          <Home size="sm" style={{ color: "white" }} />
        </button>

        {/* Company + Project stacked */}
        <button style={{ background: "transparent", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 8, padding: "4px 10px", borderRadius: 4, whiteSpace: "nowrap" }}>
          <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 28, height: 28, borderRadius: "50%", background: "#111", border: "1px solid #333", flexShrink: 0, overflow: "hidden" }}>
            <span style={{ fontSize: 9, color: "#ccc", fontWeight: 700, lineHeight: 1, textAlign: "center" }}>Baum<br/>Construction</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: "#fff" }}>Baum.com Construction</span>
              <CaretDown size="sm" style={{ color: "#888" }} />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <span style={{ fontSize: 11, color: "#aaa" }}>123456 - Hotel California</span>
              <CaretDown size="sm" style={{ color: "#888" }} />
            </div>
          </div>
        </button>

        {/* Divider */}
        <span style={{ width: 1, height: 24, background: "#444", margin: "0 6px", flexShrink: 0 }} />

        {/* Project Tools | Action Plans */}
        <button style={{ background: "transparent", border: "none", color: "#aaa", cursor: "pointer", display: "flex", alignItems: "center", gap: 4, padding: "4px 8px", borderRadius: 4, fontSize: 12, whiteSpace: "nowrap" }}>
          Project Tools
          <CaretDown size="sm" style={{ color: "#888" }} />
        </button>
        <button style={{ background: "transparent", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 4, padding: "4px 8px", borderRadius: 4, fontSize: 13, fontWeight: 600, color: "#fff", whiteSpace: "nowrap" }}>
          Action Plans
          <CaretDown size="sm" style={{ color: "#888" }} />
        </button>

        {/* AI Search */}
        <div style={{ flex: 1, maxWidth: 480, margin: "0 12px" }}>
          <div style={{ background: "#2d2d2d", border: "1px solid #3a3a3a", borderRadius: 6, display: "flex", alignItems: "center", padding: "0 10px", height: 32, gap: 8 }}>
            <span style={{ color: "#f47b20", fontSize: 14, lineHeight: 1 }}>✦</span>
            <span style={{ color: "#777", fontSize: 13, flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              Which pay applications are still pending approval?
            </span>
            <span style={{ color: "#666", fontSize: 11, background: "#3a3a3a", padding: "2px 6px", borderRadius: 3, whiteSpace: "nowrap", letterSpacing: "0.5px" }}>
              Cmd&nbsp;K
            </span>
          </div>
        </div>

        {/* Right side */}
        <div style={{ display: "flex", alignItems: "center", gap: 2, marginLeft: "auto" }}>
          <button style={{ background: "transparent", border: "none", color: "#aaa", cursor: "pointer", padding: "4px 8px", borderRadius: 4, display: "flex", alignItems: "center", gap: 4, fontSize: 12, whiteSpace: "nowrap" }}>
            <Star size="sm" />
            <span>Favorites</span>
          </button>
          <button style={{ background: "transparent", border: "none", color: "#aaa", cursor: "pointer", padding: "4px 10px", borderRadius: 4, display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "center", lineHeight: 1.3 }}>
            <span style={{ display: "flex", alignItems: "center", gap: 3, fontSize: 12, color: "#ccc" }}>
              <span>Apps</span>
              <CaretDown size="sm" style={{ color: "#888" }} />
            </span>
            <span style={{ fontSize: 10, color: "#777" }}>Select an App</span>
          </button>
          <button style={{ background: "transparent", border: "none", color: "#aaa", cursor: "pointer", padding: "6px", borderRadius: 4, display: "flex", alignItems: "center" }}>
            <Help size="sm" />
          </button>
          <button style={{ background: "transparent", border: "none", color: "#aaa", cursor: "pointer", padding: "6px", borderRadius: 4, display: "flex", alignItems: "center" }}>
            <Comments size="sm" />
          </button>
          <button style={{ background: "transparent", border: "none", color: "#aaa", cursor: "pointer", padding: "6px", borderRadius: 4, display: "flex", alignItems: "center" }}>
            <Bell size="sm" />
          </button>
          <button style={{ background: "#555", border: "none", borderRadius: "50%", width: 30, height: 30, color: "white", cursor: "pointer", fontWeight: 700, fontSize: 11, flexShrink: 0 }}>
            ME
          </button>
        </div>
      </div>

      {/* ── Page Header ── */}
      <div style={{ background: "#fff", borderBottom: "1px solid #e0e0e0", padding: "0 16px", position: "relative" }}>
        <ToolHeader style={{ minHeight: 88, alignItems: "flex-start" }}>
          <div style={{ marginTop: 20 }}>
            <Button
              variant="secondary"
              size="md"
              style={{ width: 36, height: 36, minWidth: 36, padding: 0, marginRight: 12 }}
            >
              <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Cog style={{ width: 24, height: 24, flexShrink: 0 }} />
              </div>
            </Button>
          </div>
          <ToolHeader.Title style={{ marginTop: 18, fontSize: 22, fontWeight: 700, color: "#111" }}>
            Action Plans
          </ToolHeader.Title>
          <ToolHeader.Tabs style={{ position: "absolute", bottom: 0, left: 16 }}>
            <Tabs>
              <Tabs.Tab selected role="button" onPress={() => {}}>
                List
              </Tabs.Tab>
              <Tabs.Tab role="button" onPress={() => {}}>
                Recycle Bin
              </Tabs.Tab>
            </Tabs>
          </ToolHeader.Tabs>
          <ToolHeader.Actions style={{ marginTop: 16 }}>
            <OverlayTrigger
              placement="bottom-end"
              trigger="click"
              overlay={
                <Menu style={{
                  width: 248,
                  background: "#fff",
                  border: "1px solid #d0d0d0",
                  borderRadius: 6,
                  boxShadow: "0 4px 20px rgba(0,0,0,0.14)",
                }}>
                  <Menu.Search placeholder="Search" onChange={(e) => setMenuSearch(e.target.value)} />
                  <div style={{ maxHeight: 180, overflowY: "auto" }}>
                    {menuSearch.trim() !== "" && filteredMenuGroups.every((g) => g.items.length === 0) ? (
                      <div style={{
                        padding: "32px 16px",
                        textAlign: "center",
                        color: "#999",
                        fontStyle: "italic",
                        fontSize: 14,
                        lineHeight: "20px",
                      }}>
                        No results found.
                      </div>
                    ) : (
                    <Menu.Options scrollable={false}>
                      {filteredMenuGroups.map((group) => (
                      <Menu.Group key={group.header}>
                        <Menu.Header style={{
                          fontFamily: "inherit",
                          fontSize: 14,
                          letterSpacing: "0.15px",
                          lineHeight: "20px",
                          color: "rgb(35, 39, 41)",
                          fontStyle: "inherit",
                          fontWeight: 700,
                          padding: "6px 16px 4px",
                        }}>
                          {group.header}
                        </Menu.Header>
                        {group.items.map((item, i) => (
                          <Menu.Item key={i} style={{ background: "#FFFFFF" }}>
                            <Flex justifyContent="space-between" alignItems="flex-start" style={{ width: "100%" }}>
                              <span style={{
                                display: "inline-block",
                                fontSize: 14,
                                fontWeight: 400,
                                letterSpacing: "0.25px",
                                lineHeight: "20px",
                                color: "#707070",
                              }}>
                                {item.name}
                                {item.inRevision && (
                                  <><br /><em style={{ color: "#666", fontStyle: "italic" }}>(in revision)</em></>
                                )}
                              </span>
                              {item.inRevision && (
                                <Blueprint size="sm" style={{ color: "#999", marginLeft: 12, flexShrink: 0, marginTop: 2 }} />
                              )}
                            </Flex>
                          </Menu.Item>
                        ))}
                      </Menu.Group>
                    ))}
                    </Menu.Options>
                    )}
                  </div>
                  <Menu.Footer style={{
                    background: "white",
                    display: "flex",
                    flexDirection: "column",
                    paddingLeft: 16,
                    paddingRight: 16,
                    paddingBottom: 16,
                    paddingTop: 12,
                    gap: 8,
                  }}>
                    <Button variant="secondary" size="md" style={{ width: "100%", height: 24, fontSize: 12, fontWeight: 600 }} onClick={() => { window.location.href = "/company-templates"; }}>Create New Company Template</Button>
                    <Button variant="secondary" size="md" style={{ width: "100%", height: 24, fontSize: 12, fontWeight: 600 }}>Create New Project Template</Button>
                    <Button variant="secondary" size="md" style={{ width: "100%", height: 24, fontSize: 12, fontWeight: 600 }}>Create New Plan</Button>
                  </Menu.Footer>
                </Menu>
              }
              afterShow={() => setIsMenuOpen(true)}
              afterHide={() => { setIsMenuOpen(false); setMenuSearch(""); }}
            >
              <Button variant="primary" size="md" iconRight={isMenuOpen ? <CaretUp /> : <CaretDown />}>
                Create
              </Button>
            </OverlayTrigger>
          </ToolHeader.Actions>
        </ToolHeader>
      </div>

      {/* ── Content ── */}
      <div style={{ padding: 16 }}>
        <div style={{ background: "#fff", border: "1px solid #e0e0e0", borderRadius: 4 }}>

          {/* Toolbar */}
          <Flex
            justifyContent="space-between"
            alignItems="center"
            style={{ padding: "10px 16px" }}
          >
            <div ref={filterAreaRef} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Search
                placeholder="Search"
                value={searchQuery}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                onSubmit={() => {}}
              />

              {/* Add Filter controlled dropdown */}
              <div style={{ position: "relative" }}>
                <Button
                  variant="secondary"
                  size="md"
                  iconRight={openPanel === "addFilter" ? <CaretUp /> : <CaretDown />}
                  onClick={() => setOpenPanel((cur) => cur === "addFilter" ? null : "addFilter")}
                >
                  Add Filter
                </Button>
                {openPanel === "addFilter" && (
                  <Menu style={{
                    position: "absolute",
                    top: "calc(100% + 4px)",
                    left: 0,
                    zIndex: 1000,
                    width: 248,
                    background: "#fff",
                    border: "1px solid #d0d0d0",
                    borderRadius: 6,
                    boxShadow: "0 4px 20px rgba(0,0,0,0.14)",
                  }}>
                    <Menu.Options scrollable={false}>
                      {FILTER_NAMES.map((name) => (
                        <Menu.Item key={name} onClick={() => addFilter(name)}>
                          {name}
                        </Menu.Item>
                      ))}
                    </Menu.Options>
                  </Menu>
                )}
              </div>

              {/* Active filter pills */}
              {activeFilters.map((filterName) => {
                const selectedCount = appliedSelections[filterName]?.length ?? 0;
                const hasSelections = selectedCount > 0;
                return (
                <div key={filterName} style={{ position: "relative" }}>
                  <button
                    className="filter-pill"
                    onClick={() => setOpenPanel((cur) => cur === filterName ? null : filterName)}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 4,
                      border: openPanel === filterName ? "1px solid #1a78d0" : "1px solid transparent",
                      borderRadius: 4,
                      background: "none",
                      height: 36,
                      padding: "0 8px",
                      cursor: "pointer",
                      fontSize: 14,
                      color: openPanel === filterName ? "#1a78d0" : "#333",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {filterName}{hasSelections ? ` (${selectedCount})` : ""}
                    {openPanel === filterName ? <CaretUp size="sm" /> : <CaretDown size="sm" />}
                  </button>
                  {openPanel === filterName && renderFilterPanel(filterName)}
                </div>
                );
              })}

              {/* Clear All */}
              {activeFilters.length > 0 && (
                <button
                  className="clear-all-btn"
                  onClick={clearAll}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#555",
                    cursor: "pointer",
                    fontSize: 14,
                    height: 36,
                    padding: "0 8px",
                    whiteSpace: "nowrap",
                  }}
                >
                  Clear All
                </button>
              )}
            </div>

            <Flex alignItems="center" style={{ gap: 8 }}>
              <Pagination
                activePage={activePage}
                items={total}
                perPage={perPage}
                onSelectPage={(page) => setActivePage(page)}
              />
            </Flex>
          </Flex>

          {/* Table / Empty State */}
          {visiblePlans.length === 0 ? (
            <div style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "80px 24px",
              gap: 16,
            }}>
              {/* Illustration */}
              <svg width="180" height="160" viewBox="0 0 180 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Shine dashes */}
                <line x1="90" y1="18" x2="90" y2="8" stroke="#333" strokeWidth="2.5" strokeLinecap="round"/>
                <line x1="126" y1="28" x2="132" y2="20" stroke="#333" strokeWidth="2.5" strokeLinecap="round"/>
                <line x1="54" y1="28" x2="48" y2="20" stroke="#333" strokeWidth="2.5" strokeLinecap="round"/>
                <line x1="138" y1="90" x2="148" y2="90" stroke="#333" strokeWidth="2.5" strokeLinecap="round"/>
                <line x1="42" y1="90" x2="32" y2="90" stroke="#333" strokeWidth="2.5" strokeLinecap="round"/>
                <line x1="126" y1="142" x2="132" y2="150" stroke="#333" strokeWidth="2.5" strokeLinecap="round"/>
                <line x1="54" y1="142" x2="48" y2="150" stroke="#333" strokeWidth="2.5" strokeLinecap="round"/>
                {/* Back browser window (blue) */}
                <rect x="28" y="36" width="104" height="80" rx="4" fill="#1a4fa0"/>
                <rect x="28" y="36" width="104" height="14" rx="4" fill="#1a4fa0"/>
                <circle cx="38" cy="43" r="3" fill="#4a90d9"/>
                <circle cx="48" cy="43" r="3" fill="#4a90d9"/>
                <circle cx="58" cy="43" r="3" fill="#4a90d9"/>
                <rect x="28" y="50" width="104" height="66" fill="#1a4fa0"/>
                <rect x="36" y="58" width="88" height="50" rx="2" fill="#2a60c0"/>
                {/* Front browser window (light) */}
                <rect x="48" y="50" width="104" height="80" rx="4" fill="#e8eaed"/>
                <rect x="48" y="50" width="104" height="14" rx="4" fill="#c8ccd4"/>
                <circle cx="58" cy="57" r="3" fill="#fff"/>
                <circle cx="68" cy="57" r="3" fill="#fff"/>
                <circle cx="78" cy="57" r="3" fill="#fff"/>
                <rect x="48" y="64" width="104" height="66" fill="#e8eaed"/>
                <rect x="56" y="72" width="88" height="50" rx="2" fill="#f5f6f8"/>
                {/* Magnifying glass circle */}
                <circle cx="105" cy="105" r="32" fill="white" stroke="#222" strokeWidth="4"/>
                {/* ? mark */}
                <text x="105" y="118" textAnchor="middle" fontSize="34" fontWeight="800" fill="#f47b20" fontFamily="system-ui, sans-serif">?</text>
                {/* Magnifying glass handle */}
                <line x1="129" y1="129" x2="150" y2="150" stroke="#222" strokeWidth="7" strokeLinecap="round"/>
              </svg>

              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 18, fontWeight: 700, color: "#111", marginBottom: 8 }}>
                  No Action Plans Match Your Search
                </div>
                <div style={{ fontSize: 14, color: "#888", lineHeight: 1.6 }}>
                  Check your spelling and filter options, or search using a different keyword.
                </div>
              </div>
            </div>
          ) : (
          <Table style={{ marginLeft: 16, marginRight: 16, marginBottom: 16, width: "calc(100% - 32px)", borderTop: "1px solid #e0e0e0", borderLeft: "1px solid #e0e0e0", borderRight: "1px solid #e0e0e0" }}>
            <Table.Header>
              <Table.HeaderRow>
                <Table.HeaderCell snugfit style={{ width: 80, height: 48, padding: "0 8px 0 16px" }} />
                <Table.HeaderCell snugfit style={{ width: 64, height: 48, padding: "0 16px" }}>
                  <Flex alignItems="center" style={{ gap: 4 }}>
                    <span>#</span>
                    <ArrowDown size="sm" style={{ color: "#555" }} />
                  </Flex>
                </Table.HeaderCell>
                <Table.HeaderCell style={{ width: 240, height: 48, padding: "0 16px" }}>Name</Table.HeaderCell>
                <Table.HeaderCell style={{ width: 110, height: 48, padding: "0 16px" }}>Type</Table.HeaderCell>
                <Table.HeaderCell style={{ width: 130, height: 48, padding: "0 16px" }}>Status</Table.HeaderCell>
                <Table.HeaderCell style={{ width: 180, height: 48, padding: "0 16px" }}>Progress</Table.HeaderCell>
                <Table.HeaderCell style={{ width: 190, height: 48, padding: "0 16px" }}>Location</Table.HeaderCell>
                <Table.HeaderCell style={{ height: 48, padding: "0 16px" }}>Plan Manager</Table.HeaderCell>
                <Table.HeaderCell snugfit style={{ height: 48, width: 48 }} />
              </Table.HeaderRow>
            </Table.Header>
            <Table.Body>
              {visiblePlans.map((plan, idx) => {
                const pct =
                  plan.progress.total > 0
                    ? Math.round((plan.progress.completed / plan.progress.total) * 100)
                    : 0;
                return (
                  <Table.BodyRow
                    key={plan.id}
                    onMouseEnter={() => setHoveredRow(plan.id)}
                    onMouseLeave={() => setHoveredRow(null)}
                    style={idx === visiblePlans.length - 1 ? { borderBottom: "1px solid #e0e0e0" } : undefined}
                  >
                    <Table.BodyCell snugfit style={{ padding: 0 }}>
                      <div style={{ height: 48, display: "flex", alignItems: "center", padding: "0 8px 0 16px" }}>
                        <Button variant="secondary" size="sm">
                          {plan.status === "draft" ? "Edit" : "View"}
                        </Button>
                      </div>
                    </Table.BodyCell>
                    <Table.BodyCell snugfit style={{ padding: 0 }}>
                      <div style={{ height: 48, display: "flex", alignItems: "center", padding: "0 16px" }}>{plan.id}</div>
                    </Table.BodyCell>
                    <Table.LinkCell href="#" style={{ padding: 0 }}>
                      <div style={{ height: 48, display: "flex", alignItems: "center", padding: "0 16px" }}>{plan.name}</div>
                    </Table.LinkCell>
                    <Table.BodyCell style={{ padding: 0 }}>
                      <div style={{ height: 48, display: "flex", alignItems: "center", padding: "0 16px" }}>{plan.type}</div>
                    </Table.BodyCell>
                    <Table.BodyCell style={{ padding: 0 }}>
                      <div style={{ height: 48, display: "flex", alignItems: "center", padding: "0 16px" }}>
                        <Pill color={STATUS_COLOR[plan.status]}>
                          {STATUS_LABEL[plan.status]}
                        </Pill>
                      </div>
                    </Table.BodyCell>
                    <Table.BodyCell style={{ padding: 0 }}>
                      <div style={{ height: 48, display: "flex", alignItems: "center", padding: "0 16px" }}>
                        <Flex alignItems="center" style={{ gap: 8 }}>
                          <div style={{ width: 80 }}>
                            <ProgressBar
                              value={pct}
                              style={{ margin: 0, height: 6 }}
                              aria-valuetext={`${plan.progress.completed} of ${plan.progress.total} tasks`}
                            />
                          </div>
                          <span style={{ fontSize: 13, color: "#555", whiteSpace: "nowrap" }}>
                            {plan.progress.completed}/{plan.progress.total}
                          </span>
                        </Flex>
                      </div>
                    </Table.BodyCell>
                    <Table.BodyCell style={{ padding: 0 }}>
                      <div style={{ height: 48, display: "flex", alignItems: "center", padding: "0 16px" }}>{plan.location}</div>
                    </Table.BodyCell>
                    <Table.BodyCell style={{ padding: 0 }}>
                      <div style={{ height: 48, display: "flex", alignItems: "center", padding: "0 16px" }}>{plan.planManager}</div>
                    </Table.BodyCell>
                    <Table.BodyCell snugfit style={{ padding: 0, width: 48 }}>
                      <div style={{ height: 48, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        {hoveredRow === plan.id && (
                          <Trash size="sm" style={{ color: "#666", cursor: "pointer" }} onClick={() => setPlanToDelete(plan)} />
                        )}
                      </div>
                    </Table.BodyCell>
                  </Table.BodyRow>
                );
              })}
            </Table.Body>
          </Table>
          )}
        </div>
      </div>

      {/* ── Footer ── */}
      <div style={{ padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontSize: 12, color: "#888" }}>
          <a href="#" style={{ color: "#888", textDecoration: "none", marginRight: 12 }}>Terms of Service</a>
          <a href="#" style={{ color: "#888", textDecoration: "none" }}>Privacy Policy</a>
        </div>
        <div style={{ fontSize: 11, color: "#aaa", letterSpacing: 1 }}>
          POWERED BY <strong style={{ color: "#777" }}>PROCORE</strong>
        </div>
      </div>

      {/* ── Delete Confirmation Modal ── */}
      {planToDelete && (
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
            borderRadius: 8,
            width: 560,
            boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
            overflow: "hidden",
          }}>
            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 24px 16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <path d="M11 2L20.5 19H1.5L11 2Z" fill="#f59e0b" stroke="#f59e0b" strokeWidth="1.5" strokeLinejoin="round"/>
                  <text x="11" y="16" textAnchor="middle" fontSize="10" fontWeight="800" fill="#fff" fontFamily="system-ui">!</text>
                </svg>
                <span style={{ fontSize: 17, fontWeight: 700, color: "#111" }}>Delete Action Plan?</span>
              </div>
              <button
                onClick={() => setPlanToDelete(null)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "#666", fontSize: 20, lineHeight: 1, padding: 4 }}
              >
                ×
              </button>
            </div>

            {/* Divider */}
            <div style={{ borderTop: "1px solid #e0e0e0" }} />

            {/* Body */}
            <div style={{ padding: "20px 24px", fontSize: 14, color: "#333", lineHeight: 1.6 }}>
              Are you sure you want to delete the Action Plan &ldquo;{planToDelete.name}&rdquo;? This action will move it to the Recycle Bin.
            </div>

            {/* Divider */}
            <div style={{ borderTop: "1px solid #e0e0e0" }} />

            {/* Footer */}
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, padding: "16px 24px" }}>
              <Button variant="secondary" size="md" disabled={isDeleting} onClick={() => setPlanToDelete(null)}>
                Cancel
              </Button>
              <Button
                variant="primary"
                size="md"
                loading={isDeleting}
                onClick={() => {
                  setIsDeleting(true);
                  setTimeout(() => {
                    setPlans((prev) => prev.filter((p) => p.id !== planToDelete!.id));
                    setIsDeleting(false);
                    setPlanToDelete(null);
                    setShowToast(true);
                    setTimeout(() => setShowToast(false), 4000);
                  }, 1500);
                }}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ── Success Toast ── */}
      {showToast && (
        <div style={{
          position: "fixed",
          bottom: 48,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10000,
        }}>
          <Toast variant="success">
            <Toast.Text>Action Plan moved to Recycle Bin.</Toast.Text>
            <Toast.Dismiss onClick={() => setShowToast(false)} />
          </Toast>
        </div>
      )}
    </div>
  );
}
