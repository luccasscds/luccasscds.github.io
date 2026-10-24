import styled from "styled-components";

export const Main = styled.main`
    width: min(1120px, 100%);
    min-height: 100vh;
    margin: 0 auto;
    padding: 1rem clamp(1.25rem, 5vw, 4rem) 4rem;
`;

export const SearchForm = styled.form`
    margin-top: 2rem;
`;

export const SearchInput = styled.input`
    width: 100%;
    min-height: 58px;
    padding: 0 1.25rem;
    border: 1px solid var(--color-border-subtle);
    border-radius: 6px;
    outline: none;
    background: var(--color-nav-background);
    color: var(--color-text);
    font-size: 1rem;
    transition: border-color 160ms ease, box-shadow 160ms ease;
    &::placeholder { color: var(--color-text-muted); opacity: 1; }
    &:focus { border-color: var(--color-accent); box-shadow: 0 0 0 3px var(--color-accent-glow); }
`;

export const Count = styled.p`
    margin: 1.5rem 0 2.5rem;
    color: var(--color-text-muted);
    font-size: 0.85rem;
    text-align: right;
    a { text-decoration: underline; text-underline-offset: 3px; }
`;

export const Results = styled.section`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

export const VideoCard = styled.a`
    display: grid;
    grid-template-columns: minmax(220px, 42%) 1fr;
    min-height: 164px;
    overflow: hidden;
    border: 1px solid var(--color-border-subtle);
    border-radius: 9px;
    background: var(--color-nav-background);
    transition: border-color 160ms ease, transform 160ms ease, background 160ms ease;
    &:hover { transform: translateY(-2px); border-color: var(--color-accent); background: var(--color-surface); }
    &:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 3px; }

    @media (max-width: 620px) {
        grid-template-columns: 1fr;
    }
`;

export const VideoImage = styled.img`
    display: block;
    width: 100%;
    height: 100%;
    min-height: 164px;
    max-height: 230px;
    object-fit: cover;
    background: var(--color-surface);
    @media (max-width: 620px) {
        aspect-ratio: 16 / 9;
        min-height: 0;
        max-height: none;
    }
`;

export const VideoInfo = styled.div`
    min-width: 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 1.1rem 1.25rem;
`;

export const VideoTitle = styled.h2`
    display: -webkit-box;
    overflow: hidden;
    color: var(--color-text);
    font-size: clamp(1rem, 2vw, 1.25rem);
    line-height: 1.4;
    font-weight: 700;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
`;

export const VideoDescription = styled.p`
    display: -webkit-box;
    overflow: hidden;
    margin-top: 0.5rem;
    color: var(--color-text-muted);
    font-size: 0.9rem;
    line-height: 1.6;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
`;

export const VideoDetails = styled.span`
    margin-top: auto;
    padding-top: 0.75rem;
    color: var(--color-text-muted);
    font-size: 0.8rem;
`;

export const EmptyState = styled.p`
    padding: 2rem 0;
    color: var(--color-text-muted);
    text-align: center;
`;

export const ErrorMessage = styled.p`
    margin: 1rem 0;
    padding: 1rem;
    border: 1px solid var(--color-border-subtle);
    border-radius: 8px;
    color: var(--color-error);
    background: var(--color-error-surface);
`;

export const LoadMoreButton = styled.button`
    display: block;
    min-height: 46px;
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
