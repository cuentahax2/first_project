import { Player, Team } from "@/types/football";
import Image from "next/image";

interface Props {
  params: { id: string };
}

async function getTeam(id: string) {
  const res = await fetch(`https://api.football-data.org/v4/teams/${id}`, {
    headers: { "X-Auth-Token": process.env.FOOTBALL_DATA_API_KEY! },
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error("Error al cargar equipo");
  return res.json();
}

export default async function TeamPage({ params }: Props) {
  let team: Team & { squad?: Player[] };
  try {
    team = await getTeam(params.id);
  } catch {
    return <div className="text-red-500 p-4">Error al cargar datos del equipo</div>;
  }

  return (
    <main className="min-h-screen bg-primary text-accent p-4">
      <div className="flex items-center gap-4 mb-4">
        <Image src={team.crest} alt={team.name} width={64} height={64} className="w-16 h-16 object-contain" />
        <h1 className="text-2xl font-bold">{team.name}</h1>
      </div>
      <h2 className="text-xl font-semibold mb-2">Plantilla</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {team.squad?.map((player: Player) => (
          <li key={player.id} className="bg-white/10 rounded p-2 flex items-center gap-2">
            <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center text-accent font-bold">
              {/* No hay foto de jugador en la API, solo inicial */}
              {player.name[0]}
            </div>
            <div>
              <div className="font-medium">{player.name}</div>
              <div className="text-xs text-secondary">{player.position} | {player.nationality}</div>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
