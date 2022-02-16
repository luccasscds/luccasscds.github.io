import styled from "styled-components";

export const Container = styled.section`
    padding: 0 1rem;
`;

export const Title = styled.h2`
    text-align: center;
    font-size: 2rem;
`;

export const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    padding-bottom: 1rem;
`;

export const ContainerProject = styled.div`
    max-width: 300px;
    height: 100%;
    margin: 1rem;
    position: relative;

    :hover {
        transform: scale(1.2);
        z-index: 10;
    }
`;

export const Link = styled.a``;

export const Img = styled.img`
    width: 100%;
    border-radius: 1rem;
    overflow: hidden;
    cursor: pointer;
`;

export const HiddenText = styled.p`
    display: flex;
    text-align: center;
    align-items: center;

    position: absolute;
    bottom: 0;
    
    background-color: rgba(0, 0, 0, 0.6);
    opacity: 0;
    height: 100%;
    font-weight: 600;

    :hover {
        opacity: 1;
        transition: opacity .2s cubic-bezier(.4,0,.2,1),transform .2s cubic-bezier(.4,0,.2,1);
        cursor: pointer;
    }
`;