import Link from "next/link";
import Image from "next/image";
import { Team, Competition } from "@/types/football";

interface Props {
  params: { id: string };
}

async function getCompetition(id: string) {
  const res = await fetch(`https://api.football-data.org/v4/competitions/${id}`, {
    headers: { "X-Auth-Token": process.env.FOOTBALL_DATA_API_KEY! },
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error("Error al cargar competición");
  return res.json();
}

async function getTeams(id: string) {
  const res = await fetch(`https://api.football-data.org/v4/competitions/${id}/teams`, {
    headers: { "X-Auth-Token": process.env.FOOTBALL_DATA_API_KEY! },
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error("Error al cargar equipos");
  return res.json();
}

export default async function CompetitionPage({ params }: Props) {
  let competition: Competition;
  let teams: { teams: Team[] };
  try {
    competition = await getCompetition(params.id);
    teams = await getTeams(params.id);
  } catch {
    return <div className="text-red-500 p-4">Error al cargar datos de la competición</div>;
  }

  return (
    <main className="min-h-screen bg-primary text-accent p-4">
      <h1 className="text-2xl font-bold mb-2">{competition.name}</h1>
      <div className="mb-4 text-secondary">Código: {competition.code} | País: {competition.area.name}</div>
      <h2 className="text-xl font-semibold mb-2">Equipos participantes</h2>
      <ul className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {teams.teams.map((team: Team) => (
          <li key={team.id} className="bg-white/10 rounded p-2 flex flex-col items-center transition-all hover:scale-105">
            <Link href={`/teams/${team.id}`} className="flex flex-col items-center">
              <Image src={team.crest} alt={team.name} width={48} height={48} className="w-12 h-12 object-contain mb-1" />
              <span className="text-center text-xs font-medium">{team.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
