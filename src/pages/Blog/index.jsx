import { useEffect, useState } from "react";
import axios from "axios";
import { SiteNav } from "../../components/SiteNav";
import { NotionContent } from "./NotionContent";
import {
    BackButton, BlogContent, BlogMain, EmptyState, ErrorMessage,
    Loading, LoadMoreButton, PostList, PostListItem, PostTitleButton,
} from "./styles";

export function Blog() {
    const [posts, setPosts] = useState([]);
    const [nextCursors, setNextCursors] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);
    const [postBlocks, setPostBlocks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [postLoading, setPostLoading] = useState(false);
    const [postError, setPostError] = useState("");
    const [loadMoreError, setLoadMoreError] = useState("");

    useEffect(() => {
        let active = true;
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
    }, []);

    async function openPost(post) {
        setSelectedPost(post);
        setPostBlocks([]);
        setPostError("");
        setPostLoading(true);
        try {
            const { data } = await axios.get("/api/notion", { params: { postId: post.id } });
            setPostBlocks(data.children || []);
        } catch (requestError) {
            setPostError(requestError.response?.data?.error || "Não foi possível carregar este post.");
        } finally {
            setPostLoading(false);
        }
    }

    function backToPosts() {
        setSelectedPost(null);
        setPostBlocks([]);
        setPostError("");
    }

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

    return (
        <BlogMain>
            <SiteNav />
            <BlogContent>
                {loading && <Loading role="status">Carregando conteúdo…</Loading>}
                {error && <ErrorMessage role="alert">{error}</ErrorMessage>}

                {!loading && !error && selectedPost && (
                    <>
                        <BackButton type="button" onClick={backToPosts}>← Todos os posts</BackButton>
                        <h2>{selectedPost.title}</h2>
                        {postLoading && <Loading role="status">Carregando post…</Loading>}
                        {postError && <ErrorMessage role="alert">{postError}</ErrorMessage>}
                        {!postLoading && !postError && postBlocks.length > 0 && <NotionContent blocks={postBlocks} />}
                        {!postLoading && !postError && postBlocks.length === 0 && <EmptyState>Este post não tem conteúdo.</EmptyState>}
                    </>
                )}

                {!loading && !error && !selectedPost && posts.length === 0 && (
                    <EmptyState>Este blog ainda não tem posts. Verifique se a integração tem acesso à database no Notion.</EmptyState>
                )}
                {!loading && !error && !selectedPost && posts.length > 0 && (
                    <PostList aria-label="Posts do blog">
                        {posts.map((post) => (
                            <PostListItem key={post.id}>
                                <PostTitleButton type="button" onClick={() => openPost(post)}>
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
