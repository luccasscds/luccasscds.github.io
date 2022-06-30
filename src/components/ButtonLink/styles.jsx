import styled from "styled-components";

export const Wrapper = styled.div`
    display: flex;
    justify-content: start;
    flex-direction: column;
    gap: 1.5rem;
`;
export const ContainerButton = styled.a`
    background: ${props => props.color ? '#FFDD00' : '#4A4747' };
    border-radius: 16px;
    width: 100%;
    padding: 1rem 0.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
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
    /* opacity: 0; */
`;
export const Video = styled.a`
    position: relative;
    /* &:hover{
        ${Title}{
            opacity: 1;
        }
    } */
`;
export const Thumbnails = styled.div`
    border-radius: 1rem;
    width: 480px;
    height: 270px;
`;