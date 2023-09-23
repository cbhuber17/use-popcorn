import { useCallback, useState } from "react";
import { useMovies } from "./useMovies";
import { useLocalStorageState } from "./useLocalStorageState";

import { Loader } from "./components/Loader";
import { ErrorMessage } from "./components/ErrorMessage";
import { NavBar } from "./components/NavBar";
import { NumResults } from "./components/NumResults";
import { Search } from "./components/Search";
import { Main } from "./components/Main";
import { Box } from "./components/Box";
import { MovieList } from "./components/movie/MovieList";
import { MovieDetails } from "./components/movie/MovieDetails";
import { WatchedSummary } from "./components/watched/WatchedSummary";
import { WatchedMovieList } from "./components/watched/WatchedMovieList";

// Structural component
export default function App() {
  const [query, setQuery] = useState("");
  const [watched, setWatched] = useLocalStorageState([], "watched");
  const [selectedId, setSelectedID] = useState(null);

  /*
  // The following useEffect/code is run when:
  useEffect(function() {
    console.log("After initial render");
  }, []);

  useEffect(function() {
    console.log("After every render");
  })

  useEffect(function() {
    console.log("After query dependency/state/prop has changed");
  }, [query])

  console.log("During render");
  */

  function handleSelectMovie(id) {
    // Close upon selecting same movie in left box
    setSelectedID((selectedId) => (id === selectedId ? null : id));
  }

  // Should be done with useCallback below so it can be passed into useMovies (user defined) hook
  // function handleCloseMovie() {
  //   setSelectedID(null);
  // }

  const handleCloseMovie = useCallback(() => setSelectedID(null), []);

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
    // localStorage.setItem("watched", JSON.stringify([...watched, movie])); // Create new array to store in local storage
  }

  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  // Close the right box when new search is done, done via handleCloseMovie
  const { movies, isLoading, error } = useMovies(query, handleCloseMovie);

  return (
    <>
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>

      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>

        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMovieList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
