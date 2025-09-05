import { Team } from "@/types/football";
import Link from "next/link";
import Image from "next/image";

async function getAllTeams() {
  // Esta función es solo un placeholder, puedes mejorarla para mostrar equipos de una liga específica
  const res = await fetch("https://api.football-data.org/v4/teams", {
    headers: { "X-Auth-Token": process.env.FOOTBALL_DATA_API_KEY! },
    next: { revalidate: 3600 },
  });
  if (!res.ok) return { teams: [] };
  return res.json();
}

export default async function TeamsPage() {
  let data;
  try {
    data = await getAllTeams();
  } catch {
    return <div className="text-red-500 p-4">Error al cargar equipos</div>;
  }

  return (
    <main className="min-h-screen bg-primary text-accent p-4">
      <h1 className="text-3xl font-bold mb-4">Equipos</h1>
      <ul className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {data.teams.map((team: Team) => (
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
