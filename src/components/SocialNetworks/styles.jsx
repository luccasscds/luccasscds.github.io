import styled from "styled-components";

export const Img = styled.img`
    width: 20px;
    height: 20px;
    border-radius: 0;
`;

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1.2rem;
    padding-top: 1.75rem;
`;

export const Icons = styled.div`display: flex;`;

export const Links = styled.a`
    display: grid;
    width: 44px;
    height: 44px;
    place-items: center;
    border: 1px solid var(--color-border-subtle);
    border-radius: 50%;
    background: var(--color-social-surface);
    transition: transform 180ms ease, background 180ms ease;
    &:hover { transform: translateY(-2px); background: var(--color-social-surface-hover); }
    &:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 3px; }
`;
