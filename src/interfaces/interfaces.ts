export interface Director {
  name: string;
  born?: Date;
  died?: Date;
  bio?: string;
}

export interface Genre {
  name: string;
  description: string;
}

export interface Star {
  name: string;
  born?: Date;
  died?: Date;
  bio?: string;
}

export interface Movie {
  _id: string;
  title: string;
  year: string;
  description: string;
  director: Director;
  stars: Star[];
  genre: Genre;
  imageUrl: string;
}

export interface User {
  username: string;
  email: string;
  password: string;
  birthday?: Date | null;
}

export interface ErrorResponse {
  status: number;
  message: string;
}
