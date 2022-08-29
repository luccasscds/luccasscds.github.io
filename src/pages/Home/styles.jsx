import styled from "styled-components";

export const Main = styled.main`
    background-color: black;
    min-height: 54rem;
    min-width: 33rem;

    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 0 2rem;
`;

export const Wrapper = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: start;
`;

export const BackgroundPhoto = styled.figure`
    display: flex;
    justify-content: center;
    align-items: center;

    background-image: linear-gradient(to bottom, #1d3557 ,#457b9d);

    clip-path: circle( at center center);
`;

export const ProfileImg = styled.img`
    max-width: clamp(150px,45vw,200px);
    margin: 5px 0;
    clip-path: circle();
    cursor: pointer;
`;

export const ContainerText = styled.div`
    padding-top: ${ ({paddingTop}) => `${paddingTop}rem;` };
    display: flex;
    justify-content: center;
`;

export const NameText = styled.h1`
    font-style: normal;
    white-space: nowrap;
    overflow: hidden;
    animation: typing 2s steps(25);
    @keyframes typing {
        from {width: 0;}
        to {width: 262px;}
    }
`;

export const BioText = styled.p`
    min-width: 300px;
`;