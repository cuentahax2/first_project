import { FaHome, FaFutbol, FaUser, FaChartBar } from "react-icons/fa";
import Link from "next/link";

export default function FooterNav() {
  return (
    <footer className="fixed bottom-0 w-full bg-secondary text-accent flex justify-around py-2 z-50 border-t border-primary">
      <Link href="/" className="flex flex-col items-center">
        <FaHome size={24} />
        <span className="text-xs">Inicio</span>
      </Link>
      <Link href="/competitions" className="flex flex-col items-center">
        <FaFutbol size={24} />
        <span className="text-xs">Competiciones</span>
      </Link>
      <Link href="/teams" className="flex flex-col items-center">
        <FaUser size={24} />
        <span className="text-xs">Equipos</span>
      </Link>
      <Link href="/stats" className="flex flex-col items-center">
        <FaChartBar size={24} />
        <span className="text-xs">Estadísticas</span>
      </Link>
    </footer>
  );
}
