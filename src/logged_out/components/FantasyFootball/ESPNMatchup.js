// MatchupView.jsx
import { is } from "date-fns/locale";
import React from "react";
export default function MatchupView({ url, leagueName }) {
  const [data, setData] = React.useState({ result: { home: null, away: null } });
  const fetchData = React.useCallback(async () => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  const { home, away } = data?.result;

  const styles = {
    container: {
      fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
      color: "#0f172a",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "baseline",
    },
    headerTitle: { fontSize: 50, fontWeight: 700, color: "white" },
    headerSub: { fontSize: 14, color: "#64748b" },
    layout: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 16,
    },
    teamCard: {
      border: "1px solid #e2e8f0",
      borderRadius: 14,
      padding: 16,
      boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
    },
    teamHeader: {
      display: "grid",
      gridTemplateColumns: "56px 1fr",
      gap: 12,
      alignItems: "center",
      marginBottom: 12,
    },
    teamLogo: { width: 56, height: 56, borderRadius: 12, objectFit: "cover" },
    teamName: { fontSize: 25, fontWeight: 700, lineHeight: 1.2, marginBottom: 3 },
    metaRow: { display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" },
    pill: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      padding: "6px 10px",
      borderRadius: 999,
      fontSize: 20,
      border: "1px solid #e2e8f0",
      background: "#f8fafc",
    },
    pillEmph: {
      background: "#eff6ff",
      borderColor: "#bfdbfe",
    },
    roster: { marginTop: 12, display: "grid", gap: 8 },
    playerRow: {
      display: "grid",
      gridTemplateColumns: "40px 1fr auto auto",
      gap: 10,
      alignItems: "center",
      padding: 8,
      border: "1px solid #eef2f7",
      borderRadius: 10,
      background: "#fbfdff",
    },
    avatar: { width: 40, height: 40, borderRadius: 8, objectFit: "cover", background: "#e2e8f0" },
    playerName: { fontWeight: 600 },
    playerPosition: { fontWeight: 400 },
    posBadge: {
      fontSize: 12,
      padding: "4px 8px",
      borderRadius: 999,
      background: "#f1f5f9",
      border: "1px solid #e2e8f0",
      justifySelf: "start",
    },
    statCol: { textAlign: "right", fontVariantNumeric: "tabular-nums" },
    label: { fontSize: 11, color: "#64748b" },
    value: { fontWeight: 700 },
    footerBar: {
      marginTop: 10,
      height: 10,
      background: "#f1f5f9",
      borderRadius: 999,
      overflow: "hidden",
      display: "grid",
      gridTemplateColumns: "var(--homeShare, 50%) var(--awayShare, 50%)",
    },
    barHome: { background: "#dbeafe" },
    barAway: { background: "#fde68a" },
  };

  const recordStr = (t) => `${t.record.wins}-${t.record.losses}${t.record.ties ? `-${t.record.ties}` : ""}`;

  const totalProj = Math.max(1, (home?.projected ?? 0) + (away?.projected ?? 0));
  const homeShare = ((home?.projected ?? 0) / totalProj) * 100;
  const awayShare = 100 - homeShare;

  return (
    <section style={styles.container}>
      <div style={styles.header}>
        <div style={styles.headerTitle}>{leagueName || "Fantasy Football Matchup"}</div>
      </div>

      <div style={styles.layout}>
        <TeamColumn team={home} otherTeam={away} side="Home" recordStr={recordStr} styles={styles} />
        <TeamColumn team={away} otherTeam={home} side="Away" recordStr={recordStr} styles={styles} />
      </div>
    </section>
  );
}
const getPositionBackgroundColor = (position) => {
  switch (position) {
    case "QB":
      return "#fde68aff"; // Yellow
    case "RB":
      return "#dbeafeff"; // Blue
    case "WR":
      return "#fbcfe8ff"; // Pink
    case "TE":
      return "#f8b36eff"; // Amber
    case "K":
      return "#bbf7d0ff"; // Green
    case "DEF":
      return "#d7fd8aff"; // Indigo
    case "D/ST":
      return "#d7fd8aff"; // Indigo
    default:
      return "#f3f4f6ff"; // Gray for unknown positions
  }
};
const positionOrder = ["QB", "RB", "WR", "TE", "FLEX", "K", "DEF", "D/ST"];
function sortByPosition(players) {
  return [...players].sort((a, b) => {
    const aIndex = positionOrder.indexOf(a.position);
    const bIndex = positionOrder.indexOf(b.position);
    // Put unknown positions at the end
    return (aIndex === -1 ? Infinity : aIndex) - (bIndex === -1 ? Infinity : bIndex);
  });
}
function TeamColumn({ team, otherTeam, side, recordStr, styles }) {
  if (!team) return null;
  const isMyTeamProjectedToWin = (team, otherTeam) => {
    console.log("🚀 ~ isMyTeamProjectedToWin ~ team, otherTeam:", team, otherTeam);
    if (!team || !otherTeam) return false;
    const myTeamNames = ["Patrick's Perfect Team", "Touchdown My Pants", "Urine Trouble", "UrineSumTrouble"];
    const myTeam = myTeamNames.includes(team.name) ? team : myTeamNames.includes(otherTeam.name) ? otherTeam : null;
    const opponent = myTeam === team ? otherTeam : team;
    if (!myTeam || !opponent) return false;
    console.log("🚀 ~ isMyTeamProjectedToWin ~ myTeam.projected:", myTeam.projected);
    console.log("🚀 ~ isMyTeamProjectedToWin ~ opponent.projected:", opponent.projected);
    if (myTeam.projected > opponent.projected && team.name === myTeam.name) {
      return "#5bd797ff";
    } else if (myTeam.projected < opponent.projected && team.name === myTeam.name) {
      return "#f95f5fff";
    } else {
      return "white";
    }
  };
  const players = Array.isArray(team.starters) ? team.starters : [];

  return (
    <article
      style={{
        ...styles.teamCard,
        backgroundColor: isMyTeamProjectedToWin(team, otherTeam),
        width: "100%",
      }}>
      <header style={{ ...styles.teamHeader, width: "100%", display: "flex", gap: 12, alignItems: "center" }}>
        {/* <img src={team.logo} alt={`${team.name} logo`} style={styles.teamLogo} /> */}
        <div>
          <div style={styles.teamName}>{team.name}</div>
          <div style={styles.metaRow}>
            {/* <span style={styles.pill}>
              <strong>Record:</strong> {recordStr(team)}
            </span> */}
            <span style={{ ...styles.pill }}>
              <strong>Proj:</strong> {fmt(team.projected)}
            </span>
            <span style={{ ...styles.pill, ...styles.pillEmph }}>
              <strong>Total:</strong> {fmt(team.total)}
            </span>
          </div>
        </div>
      </header>

      <section style={{ ...styles.roster }}>
        {sortByPosition(players).map((p, idx) => (
          <div key={idx} style={{ ...styles.playerRow, backgroundColor: getPositionBackgroundColor(p.position) }}>
            <img src={p.picURL} alt={p.name} style={styles.avatar} />
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div style={styles.playerName}>{p.name}</div>
            </div>
            <div style={styles.statCol}>
              <div style={styles.label}>Proj</div>
              <div style={styles.value}>{fmt(p.projected)}</div>
            </div>
            <div style={styles.statCol}>
              <div style={styles.label}>Total</div>
              <div style={styles.value}>{fmt(p.total)}</div>
            </div>
          </div>
        ))}

        {players.length === 0 && <div style={{ color: "#64748b", fontSize: 14 }}>No starters found.</div>}
      </section>
    </article>
  );
}

function fmt(n) {
  if (n === null || n === undefined || Number.isNaN(Number(n))) return "-";
  return Number(n).toFixed(2).replace(/\.00$/, "");
}
