import { useCallback, useEffect, useState } from "react";
import { YouTube } from "../../controllers/youtube.controller";
import { SiteNav } from "../../components/SiteNav";
import "./styles.css";

let videosPageCache = null;

function relativeDate(date) {
    if (!date) return "";
    const targetDate = new Date(date);
    if (isNaN(targetDate.getTime())) return "";

    const seconds = Math.floor((Date.now() - targetDate.getTime()) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30.436875); // Média de dias por mês
    const years = Math.floor(days / 365.25);     // Considerando anos bissextos

    const formatter = new Intl.RelativeTimeFormat("pt-BR", { numeric: "auto" });

    if (years > 0) return formatter.format(-years, "year");
    if (months > 0) return formatter.format(-months, "month");
    if (days > 0) return formatter.format(-days, "day");
    if (hours > 0) return formatter.format(-hours, "hour");
    if (minutes > 0) return formatter.format(-minutes, "minute");
    return formatter.format(-seconds, "second");
}

export function Videos() {
    const [videos, setVideos] = useState(() => videosPageCache?.videos || []);
    const [search, setSearch] = useState(() => videosPageCache?.search || "");
    const [activeSearch, setActiveSearch] = useState(() => videosPageCache?.activeSearch || "");
    const [nextPageToken, setNextPageToken] = useState(() => videosPageCache?.nextPageToken || "");
    const [totalResults, setTotalResults] = useState(() => videosPageCache?.totalResults || 0);
    const [loading, setLoading] = useState(() => !videosPageCache);
    const [loadingMore, setLoadingMore] = useState(false);
    const [error, setError] = useState("");

    const visibleVideos = videos?.filter((video) => {
        const query = activeSearch.trim().toLowerCase();
        if (!query) return true;
        return `${video.title} ${video.description}`
            .toLowerCase()
            .includes(query);
    });

    const fetchVideos = useCallback(async (pageToken = "", append = false) => {
        if (append) setLoadingMore(true);
        else setLoading(true);
        setError("");

        try {
            const result = await YouTube.getVideos({ pageToken });
            const updatedVideos = append
                ? [...(videosPageCache?.videos || []), ...result.items]
                : result.items;

            videosPageCache = {
                videos: updatedVideos,
                search: videosPageCache?.search || "",
                activeSearch: videosPageCache?.activeSearch || "",
                nextPageToken: result.nextPageToken,
                totalResults: result.totalResults,
            };

            setVideos(updatedVideos);
            setNextPageToken(result.nextPageToken);
            setTotalResults(result.totalResults);
        } catch (requestError) {
            setError(requestError.response?.data?.error?.message || "Não foi possível carregar os vídeos. Tente novamente mais tarde.");
        } finally {
            setLoading(false);
            setLoadingMore(false);
        }
    }, []);

    useEffect(() => {
        if (!videosPageCache) fetchVideos();
    }, [fetchVideos]);

    function handleSearch(event) {
        event.preventDefault();
        const query = search.trim();
        setActiveSearch(query);
        if (videosPageCache) {
            videosPageCache = { ...videosPageCache, search, activeSearch: query };
        }
    }

    return (
        <main className="videos-main">
            <SiteNav />

            <form className="videos-search-form" onSubmit={handleSearch} role="search">
                <input className="videos-search-input"
                    type="search"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Pesquise por vídeos"
                    aria-label="Pesquise por vídeos"
                />
            </form>

            <p className="videos-count">
                {totalResults > 0 && <>Total de {totalResults} vídeos no canal</>}
            </p>

            {error && <p className="videos-error" role="alert">{error}</p>}

            {!loading && !error && visibleVideos?.length === 0 && (
                <p className="videos-empty">Nenhum vídeo encontrado{activeSearch ? ` para “${activeSearch}”` : ""}.</p>
            )}

            <section className="videos-results" aria-live="polite">
                {visibleVideos?.map((video) => (
                    <a className="video-card" key={video.id} href={`https://www.youtube.com/watch?v=${video.id}`} target="_blank" rel="noreferrer">
                        <img className="video-image" src={video.thumbnailsUrl} alt="" loading="lazy" />
                        <div className="video-info">
                            <h2 className="video-title">{video.title}</h2>
                            <p className="video-description">{video.description}</p>
                            <span className="video-details">{relativeDate(video.publishedAt)}</span>
                        </div>
                    </a>
                ))}
            </section>

            {loading && <p className="videos-empty" role="status">Carregando vídeos…</p>}

            {nextPageToken && !loading && (
                <button className="videos-load-more" type="button" disabled={loadingMore} onClick={() => fetchVideos(nextPageToken, true)}>
                    {loadingMore ? "Carregando…" : "Carregar mais vídeos"}
                </button>
            )}
        </main>
    );
}
