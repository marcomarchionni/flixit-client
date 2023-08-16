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
  originalTitle: string;
  year: string;
  description: string;
  director: Director;
  stars: Star[];
  genre: Genre;
  posterUrl?: string;
  photoUrl?: string;
  imageUrls?: string[];
  resizedImageUrls?: string[];
}

export interface User {
  username: string;
  email: string;
  password: string;
  birthday: string;
  favouriteMovies: string[];
}

export interface UserUpdate {
  username?: string;
  email?: string;
  password?: string;
  birthday?: string;
}

export interface ErrorResponse {
  status: number;
  message: string;
}

export interface AlertContent {
  message: string;
  variant: 'danger' | 'success' | 'warn';
  dismissible?: boolean;
}
