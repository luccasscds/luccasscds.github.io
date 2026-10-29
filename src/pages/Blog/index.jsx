import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import powershell from "highlight.js/lib/languages/powershell";
import "highlight.js/styles/github-dark.css";
import { SiteNav } from "../../components/SiteNav";
import "./styles.css";

export function Blog() {
    const { postId } = useParams();
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [nextCursors, setNextCursors] = useState([]);
    const [postMarkdown, setPostMarkdown] = useState("");
    const [postTitle, setPostTitle] = useState("");
    const [search, setSearch] = useState("");
    const [activeSearch, setActiveSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [postLoading, setPostLoading] = useState(false);
    const [postError, setPostError] = useState("");
    const [loadMoreError, setLoadMoreError] = useState("");

    useEffect(() => {
        if (postId) {
            setLoading(false);
            return undefined;
        }

        let active = true;
        setLoading(true);
        setError("");
        setPosts([]);
        setNextCursors([]);
        axios.get("/api/notion", { params: activeSearch ? { q: activeSearch } : {} })
            .then(({ data }) => {
                if (!active) return;
                setPosts(data.posts || []);
                setNextCursors(data.nextCursors || []);
            })
            .catch((requestError) => {
                if (active) setError(requestError.response?.data?.error || "Não foi possível carregar os artigos do blog.");
            })
            .finally(() => { if (active) setLoading(false); });
        return () => { active = false; };
    }, [postId, activeSearch]);

    useEffect(() => {
        if (!postId) {
            setPostMarkdown("");
            setPostTitle("");
            setPostError("");
            setPostLoading(false);
            return undefined;
        }

        let active = true;
        setPostMarkdown("");
        setPostTitle("");
        setPostError("");
        setPostLoading(true);
        axios.get("/api/notion", { params: { postId } })
            .then(({ data }) => {
                if (!active) return;
                setPostTitle(data.title || "Post");
                setPostMarkdown(data.markdown || "");
            })
            .catch((requestError) => {
                if (active) setPostError(requestError.response?.data?.error || "Não foi possível carregar este post.");
            })
            .finally(() => { if (active) setPostLoading(false); });
        return () => { active = false; };
    }, [postId]);

    async function loadMorePosts() {
        if (nextCursors.length === 0) return;
        const [next, ...remaining] = nextCursors;
        setPostLoading(true);
        setLoadMoreError("");
        try {
            const { data } = await axios.get("/api/notion", {
                params: { cursor: next.nextCursor, ...(activeSearch ? { q: activeSearch } : {}) },
            });
            setPosts((current) => [...current, ...(data.posts || [])]);
            setNextCursors([
                ...remaining,
                ...(data.nextCursor ? [{ nextCursor: data.nextCursor }] : []),
            ]);
        } catch (requestError) {
            setLoadMoreError(requestError.response?.data?.error || "Não foi possível carregar mais posts.");
        } finally {
            setPostLoading(false);
        }
    }

    function submitSearch(event) {
        event.preventDefault();
        setActiveSearch(search.trim());
    }

    const selectedPost = postId
        ? { id: postId, title: postTitle || posts.find((post) => post.id === postId)?.title || "Post" }
        : null;

    return (
        <main className="blog-main">
            <SiteNav />
            <article className="blog-content">
                {!postId && (
                    <form onSubmit={submitSearch}>
                        <input className="blog-search-input"
                            type="search"
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                            placeholder="Pesquisar posts e pressione Enter"
                            aria-label="Pesquisar posts pelo título"
                        />
                    </form>
                )}
                {loading && <p className="blog-loading" role="status">Carregando conteúdo…</p>}
                {error && <p className="blog-error" role="alert">{error}</p>}

                {!loading && !error && selectedPost && (
                    <>
                        <button className="blog-back-button" type="button" onClick={() => navigate("/blog")}>← Todos os posts</button>
                        <h2>{selectedPost.title}</h2>
                        {postLoading && <p className="blog-loading" role="status">Carregando post…</p>}
                        {postError && <p className="blog-error" role="alert">{postError}</p>}
                        {!postLoading && !postError && postMarkdown && (
                            <div className="blog-markdown">
                                <ReactMarkdown
                                    remarkPlugins={[remarkGfm]}
                                    rehypePlugins={[[rehypeHighlight, {
                                        languages: { powershell },
                                        ignoreMissing: true,
                                    }]]}
                                >
                                    {postMarkdown}
                                </ReactMarkdown>
                            </div>
                        )}
                        {!postLoading && !postError && !postMarkdown && <p className="blog-loading">Este post não tem conteúdo.</p>}
                    </>
                )}

                {!loading && !error && !selectedPost && posts.length === 0 && (
                    <p className="blog-loading">
                        {activeSearch
                            ? `Nenhum post encontrado para “${activeSearch}”.`
                            : "Este blog ainda não tem posts. Verifique se a integração tem acesso à database no Notion."}
                    </p>
                )}
                {!loading && !error && !selectedPost && posts.length > 0 && (
                    <ul className="blog-post-list" aria-label="Posts do blog">
                        {posts.map((post) => (
                            <li className="blog-post-item" key={post.id}>
                                <button className="blog-post-title" type="button" onClick={() => navigate(`/blog/${post.id}`)}>
                                    {post.title}
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
                {!loading && !error && !selectedPost && nextCursors.length > 0 && (
                    <>
                        {loadMoreError && <p className="blog-error" role="alert">{loadMoreError}</p>}
                        <button className="blog-load-more" type="button" disabled={postLoading} onClick={loadMorePosts}>
                            {postLoading ? "Carregando…" : "Carregar mais posts"}
                        </button>
                    </>
                )}
            </article>
        </main>
    );
}
