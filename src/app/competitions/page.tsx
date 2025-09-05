import Link from "next/link";
import { Competition } from "@/types/football";

async function getCompetitions() {
  const res = await fetch("https://api.football-data.org/v4/competitions", {
    headers: { "X-Auth-Token": process.env.FOOTBALL_DATA_API_KEY! },
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error("Error al cargar competiciones");
  return res.json();
}

export default async function CompetitionsPage() {
  let data;
  try {
    data = await getCompetitions();
  } catch {
    return <div className="text-red-500 p-4">Error al cargar competiciones</div>;
  }

  return (
    <main className="min-h-screen bg-primary text-accent p-4">
      <h1 className="text-3xl font-bold mb-4">Competiciones</h1>
      <ul>
        {data.competitions.map((comp: Competition) => (
          <li key={comp.id} className="mb-2 transition-all hover:scale-105">
            <Link href={`/competitions/${comp.id}`} className="font-semibold hover:underline">
              {comp.name}
            </Link>
            <span className="ml-2 text-sm text-secondary">{comp.area.name}</span>
          </li>
        ))}
      </ul>
    </main>
  );
}
