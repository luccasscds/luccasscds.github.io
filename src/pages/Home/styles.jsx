import styled from "styled-components";

export const Main = styled.main`
    width: min(1120px, 100%);
    min-height: 100vh;
    margin: 0 auto;
    padding: 1rem clamp(1.25rem, 5vw, 4rem) 4rem;
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: clamp(2rem, 6vw, 5rem);

    @media (max-width: 760px) {
        flex-direction: column;
        align-items: center;
        gap: 2.5rem;
        margin-top: 3rem;
    }
`;

export const Wrapper = styled.section`
    flex: 1 1 0;
    min-width: 0;
    padding-top: clamp(0rem, 8vh, 5rem);
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    @media (max-width: 760px) {
        width: 100%;
        padding-top: 0;
    }
`;

export const BackgroundPhoto = styled.figure`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 184px;
    height: 184px;
    border-radius: 50%;
    padding: 5px;
    background: linear-gradient(135deg, var(--color-accent-start), var(--color-accent-end));
    box-shadow: 0 18px 60px var(--color-accent-shadow);
`;

export const ProfileImg = styled.img`
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
`;

export const ContainerText = styled.div`
    padding-top: ${({paddingTop}) => `${paddingTop}rem`};
    display: flex;
    justify-content: center;
    width: 100%;
`;

export const NameText = styled.h1`
    font-size: clamp(2rem, 5vw, 2.8rem);
    line-height: 1.15;
    letter-spacing: -0.04em;
    font-weight: 500;
    strong { display: block; color: var(--color-accent); font-weight: 700; }
`;

export const BioText = styled.p`
    max-width: 390px;
    color: var(--color-text-muted);
    font-size: 1rem;
    line-height: 1.75;
`;
