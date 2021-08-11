import { useState } from 'react';
import { useEffect } from 'react';
import movieDB from '../api/movieDB';
import { MovieDBNowMoviesResponse, Movie } from '../interfaces/movieInterface';

export const useMovies = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [nowPlaying, setNowPlaying] = useState<Movie[]>([]);
  const [popular, setPopular] = useState<Movie[]>([]);

  const getMovies = async () => {
    const respNowPlaying = await movieDB.get<MovieDBNowMoviesResponse>(
      '/now_playing'
    );
    const respPopular = await movieDB.get<MovieDBNowMoviesResponse>('/popular');
    await movieDB.get<MovieDBNowMoviesResponse>('/top_rated');
    await movieDB.get<MovieDBNowMoviesResponse>('/upcoming');

    setNowPlaying(respNowPlaying.data.results);
    setPopular(respPopular.data.results);
    setIsLoading(false);
  };

  useEffect(() => {
    getMovies();
  }, []);

  return { isLoading, nowPlaying, popular };
};
