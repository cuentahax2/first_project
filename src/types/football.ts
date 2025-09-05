export interface Competition {
  id: number;
  name: string;
  code: string;
  area: { name: string };
}

export interface Team {
  id: number;
  name: string;
  crest: string;
}

export interface Player {
  id: number;
  name: string;
  position: string;
  nationality: string;
  photo?: string;
}
