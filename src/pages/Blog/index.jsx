import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import powershell from "highlight.js/lib/languages/powershell";
import "highlight.js/styles/github-dark.css";
import { SiteNav } from "../../components/SiteNav";
import {
    BackButton, BlogContent, BlogMain, BlogMarkdown, EmptyState, ErrorMessage,
    Loading, LoadMoreButton, PostList, PostListItem, PostTitleButton,
} from "./styles";

export function Blog() {
    const { postId } = useParams();
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [nextCursors, setNextCursors] = useState([]);
    const [postMarkdown, setPostMarkdown] = useState("");
    const [postTitle, setPostTitle] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [postLoading, setPostLoading] = useState(false);
    const [postError, setPostError] = useState("");
    const [loadMoreError, setLoadMoreError] = useState("");

    useEffect(() => {
        if (postId || posts.length > 0) {
            setLoading(false);
            return undefined;
        }

        let active = true;
        setLoading(true);
        axios.get("/api/notion")
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
    }, [postId, posts.length]);

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
                params: { cursor: next.nextCursor },
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

    const selectedPost = postId
        ? { id: postId, title: postTitle || posts.find((post) => post.id === postId)?.title || "Post" }
        : null;

    return (
        <BlogMain>
            <SiteNav />
            <BlogContent>
                {loading && <Loading role="status">Carregando conteúdo…</Loading>}
                {error && <ErrorMessage role="alert">{error}</ErrorMessage>}

                {!loading && !error && selectedPost && (
                    <>
                        <BackButton type="button" onClick={() => navigate("/blog")}>← Todos os posts</BackButton>
                        <h2>{selectedPost.title}</h2>
                        {postLoading && <Loading role="status">Carregando post…</Loading>}
                        {postError && <ErrorMessage role="alert">{postError}</ErrorMessage>}
                        {!postLoading && !postError && postMarkdown && (
                            <BlogMarkdown>
                                <ReactMarkdown
                                    remarkPlugins={[remarkGfm]}
                                    rehypePlugins={[[rehypeHighlight, {
                                        languages: { powershell },
                                        ignoreMissing: true,
                                    }]]}
                                >
                                    {postMarkdown}
                                </ReactMarkdown>
                            </BlogMarkdown>
                        )}
                        {!postLoading && !postError && !postMarkdown && <EmptyState>Este post não tem conteúdo.</EmptyState>}
                    </>
                )}

                {!loading && !error && !selectedPost && posts.length === 0 && (
                    <EmptyState>Este blog ainda não tem posts. Verifique se a integração tem acesso à database no Notion.</EmptyState>
                )}
                {!loading && !error && !selectedPost && posts.length > 0 && (
                    <PostList aria-label="Posts do blog">
                        {posts.map((post) => (
                            <PostListItem key={post.id}>
                                <PostTitleButton type="button" onClick={() => navigate(`/blog/${post.id}`)}>
                                    {post.title}
                                </PostTitleButton>
                            </PostListItem>
                        ))}
                    </PostList>
                )}
                {!loading && !error && !selectedPost && nextCursors.length > 0 && (
                    <>
                        {loadMoreError && <ErrorMessage role="alert">{loadMoreError}</ErrorMessage>}
                        <LoadMoreButton type="button" disabled={postLoading} onClick={loadMorePosts}>
                            {postLoading ? "Carregando…" : "Carregar mais posts"}
                        </LoadMoreButton>
                    </>
                )}
            </BlogContent>
        </BlogMain>
    );
}
