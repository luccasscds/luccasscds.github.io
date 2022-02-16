import styled from "styled-components";

export const Wrapper = styled.section`
    min-height: 500px;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
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
    text-align: center;
    padding-top: ${ props => `${props.paddingTop}rem;` };
`;

export const NameText = styled.h1`
    font-style: normal;
`;

export const BioText = styled.p`
    min-width: 300px;
`;