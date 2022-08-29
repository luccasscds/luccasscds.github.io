import styled from "styled-components";

export const Wrapper = styled.div`
    display: flex;
    justify-content: start;
    flex-direction: column;
    gap: 1.5rem 0;
    margin: 1rem 0 1rem 0;
`;
export const ContainerButton = styled.a`
    background: ${props => props.color ? '#FFDD00' : '#4A4747' };
    display: ${props => props.hidden ? 'none' : 'flex'};
    border-radius: 16px;
    width: 100%;
    padding: 1rem 0.5rem;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
`;
export const FirstContent = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;
export const Text = styled.span`
    color: ${ ({color}) => color ? 'black' : 'white' }
`;
export const Icon = styled.img`
    margin-right: 1rem;
`;
export const LastContent = styled.div``;


export const Title = styled.p`
    position: absolute;
    top: 1rem;
    left: 1rem;
`;
export const Video = styled.a`
    position: relative;
`;
export const Thumbnails = styled.div`
    border-radius: 1rem;
    width: 480px;
    height: 270px;
`;