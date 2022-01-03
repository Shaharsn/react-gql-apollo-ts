export type Info = {
  count: number;
  pages: number;
  next: number;
  prev: number;
}

export type Episodes = {
  info: Info;
  results: Episode[];
};

export type Episode = {
  id: string;
  name: string;
  air_date: string;
  episode: string;
  characters: [Character];
  created: string;
};

export type Characters = {
  info: Info;
  results: Character[];
}

export type Character = {
  id: string;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  image: string;
  episode: Episode[];
  created: string;
};
