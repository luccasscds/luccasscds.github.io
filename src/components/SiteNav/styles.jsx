import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const NavWrapper = styled.header`
    width: 100%;
    display: flex;
    justify-content: center;
`;

export const Navigation = styled.nav`
    display: flex;
    align-items: center;
    gap: 0.35rem;
    padding: 0.35rem;
    border: 1px solid var(--color-border);
    border-radius: 14px;
    background: var(--color-nav-background);
    backdrop-filter: blur(14px);
`;

export const LinkItem = styled(NavLink)`
    min-width: 48px;
    height: 42px;
    padding: 0 1rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 9px;
    color: var(--color-text);
    font-size: 0.9rem;
    font-weight: 600;
    transition: background 160ms ease, color 160ms ease;

    &.active { background: var(--color-surface-hover); }
    &:hover { background: var(--color-surface-hover); color: var(--color-accent); }
    &:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 2px; }

    svg {
        width: 18px;
        height: 18px;
        fill: none;
        stroke: currentColor;
        stroke-width: 1.8;
        stroke-linecap: round;
        stroke-linejoin: round;
    }
`;
