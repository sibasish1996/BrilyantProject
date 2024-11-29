import React, { useState } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners"; // Import the spinner
import './styles.css';

const BASE_URL = "https://www.omdbapi.com/";

const MovieSearch = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const [errorMessage, setErrorMessage] = useState("");

    const fetchMovies = async (page = 1) => {
        setLoading(true);
        setErrorMessage("");
        try {
            const response = await axios.get(BASE_URL, {
                params: {
                    s: searchTerm,
                    page,
                    apikey: "c98f8ed7",
                },
            });
            if (response.data.Response === "True") {
                setMovies(response.data.Search || []);
                setTotalResults(Number(response.data.totalResults));
            } else {
                setMovies([]);
                setTotalResults(0);
                setErrorMessage(response.data.Error || "No results found.");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            setErrorMessage("An error occurred while fetching the data.");
        }
        setLoading(false);
    };

    const handleSearch = () => {
        if (searchTerm.trim()) {
            setCurrentPage(1);
            fetchMovies(1);
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        fetchMovies(page);
    };

    const handleClearSearch = () => {
        setSearchTerm("");
        setMovies([]);
        setTotalResults(0);
        setCurrentPage(1);
        setErrorMessage("");
    };

    return (
        <div className="container">
            <h1>Movie Search</h1>
            <div className="search-container">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search for movies..."
                />
                <button onClick={handleSearch} disabled={loading}>
                    Search
                </button>
                <button onClick={handleClearSearch}>Clear Search</button>
            </div>

            {!searchTerm && !loading && (
                <div className="initial-message">
                    <p>Enter a movie name to search for!</p>
                </div>
            )}

            {loading ? (
                <div className="loader">
                    <ClipLoader color="aqua" loading={loading} size={50} />
                </div>
            ) : (
                <>
                    {errorMessage && (
                        <div className="error-message">
                            <p>{errorMessage}</p>
                        </div>
                    )}
                    {movies.length === 0 && !errorMessage && searchTerm && !loading && (
                        <div className="no-results">
                            <p>No results found. Please try another search.</p>
                        </div>
                    )}
                    {movies.length > 0 && (
                        <div className="movie-list">
                            {movies.map((movie) => (
                                <div key={movie.imdbID} className="movie-item">
                                    <img src={movie.Poster} alt={movie.Title} />
                                    <div className="movie-info">
                                        <h3>{movie.Title}</h3>
                                        <p><span className="movieLable">Year: </span>{movie.Year}</p>
                                        <p><span className="movieLable">Type: </span>{movie.Type}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {totalResults > 10 && (
                        <div className="pagination">
                            <button
                                className="previous"
                                onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                                disabled={currentPage === 1}
                            >
                                Previous
                            </button>

                            {Array.from(
                                { length: Math.min(10, Math.ceil(totalResults / 10) - Math.floor((currentPage - 1) / 10) * 10) },
                                (_, i) => {
                                    const pageNumber = Math.floor((currentPage - 1) / 10) * 10 + i + 1;
                                    return (
                                        <button
                                            key={pageNumber}
                                            className={currentPage === pageNumber ? "active" : ""}
                                            onClick={() => handlePageChange(pageNumber)}
                                        >
                                            {pageNumber}
                                        </button>
                                    );
                                }
                            )}

                            <button
                                className="next"
                                onClick={() =>
                                    handlePageChange(Math.min(currentPage + 1, Math.ceil(totalResults / 10)))
                                }
                                disabled={currentPage === Math.ceil(totalResults / 10)}
                            >
                                Next
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default MovieSearch;
