import { useEffect, useState } from 'react';
import { MovieFullInfo } from '../interfaces/movieInterface';
import movieDB from '../api/movieDB';
import { CreditsResponse, Cast } from '../interfaces/creditsInterface';

interface MovieDetails {
  cast: Cast[];
  isLoading: boolean;
  movieFull?: MovieFullInfo;
}

export const useMovieDetails = (movieID: number) => {
  const [state, setState] = useState<MovieDetails>({
    isLoading: true,
    movieFull: undefined,
    cast: [],
  });

  const getMovieDetails = async () => {
    const movieDetailsPromise = await movieDB.get<MovieFullInfo>(`/${movieID}`);
    const castPromise = await movieDB.get<CreditsResponse>(
      `/${movieID}/credits`
    );

    const [movieDetailsResp, castPromiseResp] = await Promise.all([
      movieDetailsPromise,
      castPromise,
    ]);

    setState({
      isLoading: false,
      movieFull: movieDetailsResp.data,
      cast: castPromiseResp.data.cast,
    });
  };

  useEffect(() => {
    getMovieDetails();
  }, []);

  return {
    ...state,
  };
};
