import React, { useState, useEffect, useRef } from "react";
import { Trophy, Users, CalendarDays, Award, ShieldAlert, Plus, X, Pencil, Save, Trash2, ChevronRight } from "lucide-react";

const COLORS = {
  pitch: "#0B3D2E",
  pitchLight: "#155A3F",
  chalk: "#F3F6F1",
  paper: "#FFFFFF",
  ink: "#0F241C",
  inkSoft: "#4C5E56",
  line: "#DCE6DE",
  gold: "#C79A2E",
  goldSoft: "#F4E7C9",
  teal: "#1E8A78",
  tealSoft: "#D8EFEA",
  yellow: "#F0C230",
  red: "#C93C36",
};

const catAccent = (cat) => (cat === "senior" ? COLORS.gold : COLORS.teal);
const catAccentSoft = (cat) => (cat === "senior" ? COLORS.goldSoft : COLORS.tealSoft);
const catLabel = (cat) => (cat === "senior" ? "Senior" : "Cadette");

const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 8);

const STORAGE_KEY = "football-app-data-v1";

// Programme officiel — ZONE 5R, Phases zonales, édition 2026 (Bignona, 16 août 2026), catégorie Senior
const SENIOR_POULE_TEAMS = {
  A: ["Château d'eau", "Walidane", "Thiossane", "Chicago", "Bendoula"],
  B: ["Médina Plateau", "CST", "Santhiaba", "Baraka", "Kassankil"],
  C: ["Déggo", "Yengoulene", "Renaissance", "Inter Tenghori", "Diengue", "Guerina"],
  D: ["Manko", "Nafacounda", "Khaar Yalla", "Black Star", "Tenghori Arr."],
};

const SENIOR_MATCHES = [
  { poule: "A", date: "2026-08-16", terrain: "René Coly", heure: "15 h", home: "Thiossane", away: "Walidane" },
  { poule: "A", date: "2026-08-16", terrain: "René Coly", heure: "17 h", home: "Château d'eau", away: "Bendoula" },
  { poule: "B", date: "2026-08-17", terrain: "René Coly", heure: "15 h", home: "Médina Plateau", away: "CST" },
  { poule: "B", date: "2026-08-17", terrain: "René Coly", heure: "17 h", home: "Santhiaba", away: "Kassankil" },
  { poule: "C", date: "2026-08-18", terrain: "Collège ABS", heure: "15 h", home: "Déggo", away: "Guerina" },
  { poule: "C", date: "2026-08-18", terrain: "Collège ABS", heure: "17 h", home: "Renaissance", away: "Inter Tenghori" },
  { poule: "D", date: "2026-08-19", terrain: "Collège ABS", heure: "15 h", home: "Black Star", away: "Tenghori Arr." },
  { poule: "D", date: "2026-08-19", terrain: "Collège ABS", heure: "17 h", home: "Manko", away: "Khaar Yalla" },
  { poule: "A", date: "2026-08-20", terrain: "Lycée Agricole", heure: "15 h", home: "Chicago", away: "Château d'eau" },
  { poule: "A", date: "2026-08-20", terrain: "Lycée Agricole", heure: "17 h", home: "Bendoula", away: "Thiossane" },
  { poule: "B", date: "2026-08-21", terrain: "Lycée Agricole", heure: "15 h", home: "Baraka", away: "Santhiaba" },
  { poule: "B", date: "2026-08-21", terrain: "Lycée Agricole", heure: "17 h", home: "Kassankil", away: "Médina Plateau" },
  { poule: "C", date: "2026-08-22", terrain: "René Coly", heure: "15 h", home: "Yengoulene", away: "Diengue" },
  { poule: "C", date: "2026-08-22", terrain: "René Coly", heure: "17 h", home: "Renaissance", away: "Déggo" },
  { poule: "D", date: "2026-08-23", terrain: "René Coly", heure: "15 h", home: "Tenghori Arr.", away: "Manko" },
  { poule: "D", date: "2026-08-23", terrain: "René Coly", heure: "17 h", home: "Nafacounda", away: "Black Star" },
  { poule: "A", date: "2026-09-06", terrain: "René Coly", heure: "15 h", home: "Thiossane", away: "Château d'eau" },
  { poule: "A", date: "2026-09-06", terrain: "René Coly", heure: "17 h", home: "Chicago", away: "Walidane" },
  { poule: "B", date: "2026-09-07", terrain: "", heure: "15 h", home: "Santhiaba", away: "Médina Plateau" },
  { poule: "B", date: "2026-09-07", terrain: "", heure: "17 h", home: "CST", away: "Baraka" },
  { poule: "C", date: "2026-09-08", terrain: "", heure: "15 h", home: "Guerina", away: "Inter Tenghori" },
  { poule: "C", date: "2026-09-08", terrain: "", heure: "17 h", home: "Déggo", away: "Yengoulene" },
  { poule: "D", date: "2026-09-09", terrain: "", heure: "15 h", home: "Khaar Yalla", away: "Nafacounda" },
  { poule: "D", date: "2026-09-09", terrain: "", heure: "17 h", home: "Black Star", away: "Manko" },
  { poule: "A", date: "2026-09-10", terrain: "", heure: "15 h", home: "Chicago", away: "Bendoula" },
  { poule: "A", date: "2026-09-10", terrain: "", heure: "17 h", home: "Walidane", away: "Thiossane" },
  { poule: "B", date: "2026-09-11", terrain: "", heure: "15 h", home: "Baraka", away: "Kassankil" },
  { poule: "B", date: "2026-09-11", terrain: "", heure: "17 h", home: "CST", away: "Santhiaba" },
  { poule: "C", date: "2026-09-12", terrain: "", heure: "15 h", home: "Diengue", away: "Renaissance" },
  { poule: "C", date: "2026-09-12", terrain: "", heure: "17 h", home: "Inter Tenghori", away: "Yengoulene" },
  { poule: "D", date: "2026-09-13", terrain: "", heure: "15 h", home: "Khaar Yalla", away: "Black Star" },
  { poule: "D", date: "2026-09-13", terrain: "", heure: "17 h", home: "Nafacounda", away: "Tenghori Arr." },
  { poule: "A", date: "2026-09-14", terrain: "Lycée Agricole", heure: "15 h", home: "Bendoula", away: "Walidane" },
  { poule: "A", date: "2026-09-14", terrain: "Lycée Agricole", heure: "17 h", home: "Château d'eau", away: "Chicago" },
  { poule: "B", date: "2026-09-15", terrain: "", heure: "15 h", home: "Kassankil", away: "CST" },
  { poule: "B", date: "2026-09-15", terrain: "", heure: "17 h", home: "Médina Plateau", away: "Baraka" },
  { poule: "C", date: "2026-09-16", terrain: "", heure: "15 h", home: "Diengue", away: "Guerina" },
  { poule: "C", date: "2026-09-16", terrain: "", heure: "17 h", home: "Yengoulene", away: "Renaissance" },
  { poule: "D", date: "2026-09-17", terrain: "Lycée Agricole", heure: "15 h", home: "Manko", away: "Nafacounda" },
  { poule: "D", date: "2026-09-17", terrain: "Lycée Agricole", heure: "17 h", home: "Tenghori Arr.", away: "Khaar Yalla" },
];

// Programme officiel — ZONE 5R / ODGAM Bignona, Phases zonales, édition 2026 (Bignona, 11 août 2026), catégorie Cadette
// NB : deux coquilles du document original ont été corrigées pour rester cohérentes avec la composition des poules
// ("Thiossane" -> "Miami" aux 9e et 13e journées Poule A ; "Baka" -> "Baraka" à la 10e journée Poule B).
const CADETTE_POULE_TEAMS = {
  A: ["Château d'eau", "Walidane", "Miami", "Chicago", "Bendoula"],
  B: ["Médina Plateau", "CST", "Santhiaba", "Baraka", "Kassankil"],
  C: ["Deggo", "Yengoulene", "Renaissance", "Inter Tenghori", "Diengue"],
  D: ["Manko", "Nafacounda", "Khaar Yalla", "Black Star", "Tenghori Arr."],
};

const CADETTE_MATCHES = [
  { poule: "A", date: "2026-08-16", terrain: "René Coly", heure: "08 h", home: "Walidane", away: "Miami" },
  { poule: "A", date: "2026-08-16", terrain: "René Coly", heure: "09 h", home: "Château d'eau", away: "Bendoula" },
  { poule: "B", date: "2026-08-17", terrain: "ABS", heure: "08 h", home: "Santhiaba", away: "Kassankil" },
  { poule: "B", date: "2026-08-17", terrain: "", heure: "09 h", home: "Médina Plateau", away: "CST" },
  { poule: "C", date: "2026-08-18", terrain: "ABS", heure: "08 h", home: "Diengue", away: "Yengoulene" },
  { poule: "C", date: "2026-08-18", terrain: "ABS", heure: "09 h", home: "Yengoulene", away: "Diengue" },
  { poule: "D", date: "2026-08-19", terrain: "ABS", heure: "08 h", home: "Black Star", away: "Tenghori Arr." },
  { poule: "D", date: "2026-08-19", terrain: "ABS", heure: "09 h", home: "Manko", away: "Khaar Yalla" },
  { poule: "A", date: "2026-08-20", terrain: "Lycée Agricole", heure: "08 h", home: "Chicago", away: "Château d'eau" },
  { poule: "A", date: "2026-08-20", terrain: "Lycée Agricole", heure: "09 h", home: "Bendoula", away: "Miami" },
  { poule: "B", date: "2026-08-21", terrain: "Lycée Agricole", heure: "08 h", home: "Baraka", away: "Santhiaba" },
  { poule: "B", date: "2026-08-21", terrain: "Lycée Agricole", heure: "09 h", home: "Kassankil", away: "Médina Plateau" },
  { poule: "C", date: "2026-08-22", terrain: "Lycée Agricole", heure: "08 h", home: "Yengoulene", away: "Renaissance" },
  { poule: "C", date: "2026-08-22", terrain: "Lycée Agricole", heure: "09 h", home: "Deggo", away: "Diengue" },
  { poule: "D", date: "2026-08-23", terrain: "Lycée Agricole", heure: "08 h", home: "Tenghori Arr.", away: "Manko" },
  { poule: "D", date: "2026-08-23", terrain: "Lycée Agricole", heure: "09 h", home: "Nafacounda", away: "Black Star" },
  { poule: "A", date: "2026-09-06", terrain: "", heure: "08 h", home: "Miami", away: "Château d'eau" },
  { poule: "A", date: "2026-09-06", terrain: "", heure: "09 h", home: "Chicago", away: "Walidane" },
  { poule: "B", date: "2026-09-07", terrain: "", heure: "08 h", home: "Santhiaba", away: "Médina Plateau" },
  { poule: "B", date: "2026-09-07", terrain: "", heure: "09 h", home: "CST", away: "Baraka" },
  { poule: "C", date: "2026-09-08", terrain: "", heure: "08 h", home: "Inter Tenghori", away: "Deggo" },
  { poule: "C", date: "2026-09-08", terrain: "", heure: "09 h", home: "Diengue", away: "Renaissance" },
  { poule: "D", date: "2026-09-09", terrain: "", heure: "08 h", home: "Khaar Yalla", away: "Nafacounda" },
  { poule: "D", date: "2026-09-09", terrain: "", heure: "09 h", home: "Black Star", away: "Manko" },
  { poule: "A", date: "2026-09-10", terrain: "", heure: "08 h", home: "Chicago", away: "Bendoula" },
  { poule: "A", date: "2026-09-10", terrain: "", heure: "09 h", home: "Walidane", away: "Miami" },
  { poule: "B", date: "2026-09-11", terrain: "", heure: "08 h", home: "Baraka", away: "Kassankil" },
  { poule: "B", date: "2026-09-11", terrain: "", heure: "09 h", home: "CST", away: "Santhiaba" },
  { poule: "C", date: "2026-09-12", terrain: "", heure: "08 h", home: "Renaissance", away: "Deggo" },
  { poule: "C", date: "2026-09-12", terrain: "", heure: "09 h", home: "Yengoulene", away: "Inter Tenghori" },
  { poule: "D", date: "2026-09-13", terrain: "", heure: "08 h", home: "Nafacounda", away: "Tenghori Arr." },
  { poule: "D", date: "2026-09-13", terrain: "", heure: "09 h", home: "Khaar Yalla", away: "Black Star" },
  { poule: "A", date: "2026-09-14", terrain: "", heure: "08 h", home: "Bendoula", away: "Walidane" },
  { poule: "A", date: "2026-09-14", terrain: "", heure: "09 h", home: "Château d'eau", away: "Chicago" },
  { poule: "B", date: "2026-09-15", terrain: "", heure: "08 h", home: "Kassankil", away: "CST" },
  { poule: "B", date: "2026-09-15", terrain: "", heure: "09 h", home: "Médina Plateau", away: "Baraka" },
  { poule: "C", date: "2026-09-16", terrain: "", heure: "08 h", home: "Inter Tenghori", away: "Diengue" },
  { poule: "C", date: "2026-09-16", terrain: "", heure: "09 h", home: "Deggo", away: "Yengoulene" },
  { poule: "D", date: "2026-09-17", terrain: "", heure: "08 h", home: "Manko", away: "Nafacounda" },
  { poule: "D", date: "2026-09-17", terrain: "", heure: "09 h", home: "Tenghori Arr.", away: "Khaar Yalla" },
];

// Ajoute équipes et rencontres officielles d'une catégorie sans dupliquer ce qui existe déjà
function mergeProgram(category, pouleTeamsMap, matchDefs, prevTeams, prevMatches) {
  const teams = [...prevTeams];
  const findTeam = (poule, name) => teams.find((t) => t.category === category && t.poule === poule && t.name === name);

  Object.entries(pouleTeamsMap).forEach(([poule, names]) => {
    names.forEach((name) => {
      if (!findTeam(poule, name)) teams.push({ id: uid(), category, poule, name });
    });
  });

  const matches = [...prevMatches];
  matchDefs.forEach((sm) => {
    const home = findTeam(sm.poule, sm.home);
    const away = findTeam(sm.poule, sm.away);
    if (!home || !away) return;
    const exists = matches.some(
      (m) => m.category === category && m.poule === sm.poule && m.date === sm.date && m.homeId === home.id && m.awayId === away.id
    );
    if (!exists) {
      matches.push({
        id: uid(),
        category,
        poule: sm.poule,
        homeId: home.id,
        awayId: away.id,
        date: sm.date,
        heure: sm.heure || "",
        terrain: sm.terrain || "",
        played: false,
        homeScore: 0,
        awayScore: 0,
        events: [],
      });
    }
  });

  return { teams, matches };
}

function mergeSeniorProgram(prevTeams, prevMatches) {
  return mergeProgram("senior", SENIOR_POULE_TEAMS, SENIOR_MATCHES, prevTeams, prevMatches);
}

function mergeCadetteProgram(prevTeams, prevMatches) {
  return mergeProgram("cadette", CADETTE_POULE_TEAMS, CADETTE_MATCHES, prevTeams, prevMatches);
}

function mergeAllPrograms(prevTeams, prevMatches) {
  const step1 = mergeSeniorProgram(prevTeams, prevMatches);
  return mergeCadetteProgram(step1.teams, step1.matches);
}

function calcStandings(category, poule, teams, matches) {
  const poolTeams = teams.filter((t) => t.category === category && t.poule === poule);
  const table = {};
  poolTeams.forEach((t) => {
    table[t.id] = { id: t.id, name: t.name, j: 0, g: 0, n: 0, p: 0, bp: 0, bc: 0, pts: 0 };
  });
  matches
    .filter((m) => m.category === category && m.poule === poule && m.played)
    .forEach((m) => {
      const h = table[m.homeId];
      const a = table[m.awayId];
      if (!h || !a) return;
      h.j++; a.j++;
      h.bp += m.homeScore; h.bc += m.awayScore;
      a.bp += m.awayScore; a.bc += m.homeScore;
      if (m.homeScore > m.awayScore) { h.g++; h.pts += 3; a.p++; }
      else if (m.homeScore < m.awayScore) { a.g++; a.pts += 3; h.p++; }
      else { h.n++; a.n++; h.pts++; a.pts++; }
    });
  return Object.values(table).sort(
    (x, y) => y.pts - x.pts || (y.bp - y.bc) - (x.bp - x.bc) || y.bp - x.bp || x.name.localeCompare(y.name)
  );
}

function calcScorers(category, pouleFilter, teams, matches) {
  const map = {};
  matches
    .filter((m) => m.category === category && (pouleFilter === "all" || m.poule === pouleFilter))
    .forEach((m) => {
      (m.events || []).filter((e) => e.type === "but").forEach((e) => {
        const teamId = e.side === "home" ? m.homeId : m.awayId;
        const team = teams.find((t) => t.id === teamId);
        const key = e.player.trim().toLowerCase() + "|" + teamId;
        if (!map[key]) map[key] = { player: e.player, team: team ? team.name : "?", poule: m.poule, buts: 0 };
        map[key].buts++;
      });
    });
  return Object.values(map).sort((a, b) => b.buts - a.buts || a.player.localeCompare(b.player));
}

function calcCards(category, pouleFilter, teams, matches) {
  const map = {};
  matches
    .filter((m) => m.category === category && (pouleFilter === "all" || m.poule === pouleFilter))
    .forEach((m) => {
      (m.events || []).filter((e) => e.type === "jaune" || e.type === "rouge").forEach((e) => {
        const teamId = e.side === "home" ? m.homeId : m.awayId;
        const team = teams.find((t) => t.id === teamId);
        const key = e.player.trim().toLowerCase() + "|" + teamId;
        if (!map[key]) map[key] = { player: e.player, team: team ? team.name : "?", poule: m.poule, jaune: 0, rouge: 0 };
        if (e.type === "jaune") map[key].jaune++; else map[key].rouge++;
      });
    });
  return Object.values(map).sort((a, b) => (b.jaune + b.rouge * 3) - (a.jaune + a.rouge * 3) || a.player.localeCompare(b.player));
}

export default function App() {
  const [teams, setTeams] = useState([]);
  const [matches, setMatches] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | ready | error
  const loadedRef = useRef(false);

  const [category, setCategory] = useState("senior");
  const [tab, setTab] = useState("poules");
  const [pouleFilter, setPouleFilter] = useState("all");

  const [newTeamName, setNewTeamName] = useState("");
  const [newTeamPoule, setNewTeamPoule] = useState("");

  const [newMatch, setNewMatch] = useState({ poule: "", homeId: "", awayId: "", date: "", heure: "", terrain: "" });

  const [editingMatchId, setEditingMatchId] = useState(null);
  const [editScore, setEditScore] = useState({ home: "", away: "" });
  const [eventDraft, setEventDraft] = useState({ type: "but", side: "home", player: "", minute: "" });

  useEffect(() => {
