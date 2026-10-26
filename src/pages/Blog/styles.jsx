import styled from "styled-components";

export const BlogMain = styled.main`
    width: min(900px, 100%);
    min-height: 100vh;
    margin: 0 auto;
    padding: 1rem clamp(1.25rem, 5vw, 4rem) 4rem;
`;

export const BlogContent = styled.article`
    margin: 2.5rem auto 0;
    color: var(--color-text);
    font-size: 1rem;
    line-height: 1.8;
    overflow-wrap: anywhere;

    h2, h3, h4 { margin: 2rem 0 0.75rem; line-height: 1.35; }
    h2 { font-size: clamp(1.5rem, 4vw, 2rem); }
    h3 { font-size: 1.35rem; }
    h4 { font-size: 1.1rem; }
    p { margin: 0 0 1rem; }
    ul, ol { margin: 0.5rem 0 1rem 1.5rem; }
    blockquote, aside { margin: 1.25rem 0; padding: 0.75rem 1rem; border-left: 3px solid var(--color-accent); background: var(--color-surface); }
    pre { margin: 1rem 0; padding: 1rem; overflow-x: auto; border: 1px solid var(--color-border-subtle); border-radius: 8px; background: var(--color-nav-background); }
    figure { margin: 1.5rem 0; }
    figure img { max-width: 100%; border-radius: 8px; }
    figcaption { color: var(--color-text-muted); font-size: 0.85rem; }
    hr { margin: 2rem 0; border: 0; border-top: 1px solid var(--color-border-subtle); }
    details { margin: 1rem 0; }
    summary { cursor: pointer; font-weight: 600; }
`;

export const BlogMarkdown = styled.div`
    table { display: block; max-width: 100%; overflow-x: auto; border-collapse: collapse; }
    th, td { padding: 0.5rem 0.75rem; border: 1px solid var(--color-border-subtle); text-align: left; }
    img { max-width: 100%; height: auto; border-radius: 8px; }
    input[type="checkbox"] { margin-right: 0.5rem; }
`;

export const SearchInput = styled.input`
    width: 100%;
    min-height: 48px;
    margin-bottom: 1.5rem;
    padding: 0 1rem;
    border: 1px solid var(--color-border-subtle);
    border-radius: 8px;
    outline: none;
    color: var(--color-text);
    background: var(--color-nav-background);
    font: inherit;
    &::placeholder { color: var(--color-text-muted); opacity: 1; }
    &:focus { border-color: var(--color-accent); box-shadow: 0 0 0 3px var(--color-accent-glow); }
`;

export const PostList = styled.ul`
    display: grid;
    gap: 0.75rem;
    margin: 0;
    padding: 0;
    list-style: none;
`;

export const PostListItem = styled.li`
    border: 1px solid var(--color-border-subtle);
    border-radius: 9px;
    background: var(--color-nav-background);
`;

export const PostTitleButton = styled.button`
    width: 100%;
    padding: 1.1rem 1.25rem;
    border: 0;
    border-radius: inherit;
    color: var(--color-text);
    background: transparent;
    text-align: left;
    font: inherit;
    font-weight: 600;
    cursor: pointer;
    &:hover { color: var(--color-accent); background: var(--color-surface-hover); }
    &:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 2px; }
`;

export const BackButton = styled.button`
    margin: 0 0 1.25rem;
    padding: 0;
    border: 0;
    color: var(--color-accent);
    background: transparent;
    font: inherit;
    cursor: pointer;
    &:hover { text-decoration: underline; }
    &:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 3px; }
`;

export const LoadMoreButton = styled.button`
    display: block;
    min-height: 44px;
    margin: 1.5rem auto 0;
    padding: 0 1.25rem;
    border: 1px solid var(--color-border-subtle);
    border-radius: 8px;
    color: var(--color-text);
    background: var(--color-surface);
    cursor: pointer;
    &:hover:not(:disabled) { background: var(--color-surface-hover); }
    &:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 3px; }
    &:disabled { opacity: 0.6; cursor: wait; }
`;

export const Loading = styled.p`
    color: var(--color-text-muted);
    text-align: center;
`;

export const EmptyState = styled(Loading)``;

export const ErrorMessage = styled.p`
    margin: 1rem 0;
    padding: 1rem;
    border: 1px solid var(--color-border-subtle);
    border-radius: 8px;
    color: var(--color-error);
    background: var(--color-error-surface);
`;
