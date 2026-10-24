import styled from "styled-components";

export const Wrapper = styled.div`
    width: min(440px, 100%);
    display: flex;
    flex-direction: column;
    gap: 0.9rem;
    margin: 0;
`;
export const ContainerButton = styled.a`
    background: ${props => props.color ? 'var(--color-highlight)' : 'var(--color-surface)' };
    border: 1px solid ${props => props.color ? 'var(--color-highlight-border)' : 'var(--color-border)' };
    display: ${props => props.hidden ? 'none' : 'flex'};
    border-radius: 14px;
    width: 100%;
    min-height: 68px;
    padding: 1rem 1.15rem;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    transition: transform 180ms ease, background 180ms ease, border-color 180ms ease;
    &:hover { transform: translateY(-2px); background: ${props => props.color ? 'var(--color-highlight-hover)' : 'var(--color-surface-hover)'}; }
    &:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 3px; }
`;
export const FirstContent = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;
export const Text = styled.span`
    color: ${ ({color}) => color ? 'var(--color-text-on-accent)' : 'var(--color-text)' };
    font-size: 0.95rem;
    font-weight: 550;
`;
export const Icon = styled.img`
    width: 28px;
    height: 28px;
    object-fit: contain;
    margin-right: 0.9rem;
`;
export const LastContent = styled.div``;

