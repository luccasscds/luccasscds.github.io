import { useEffect, useState } from 'react';
import { YouTube } from '../../controllers/youtube.controller';
import { Wrapper, ContainerButton, Icon, Text, FirstContent, LastContent, Video, Title, Thumbnails } from './styles';

export function ButtonLink(){
    const [video, setVideo] = useState({});
    useEffect( async () => {
        const regExp = /^\d{2}\/\d{2}/g;
        const isRecentVideo = JSON.parse(localStorage.getItem('recentVideo'));
        const [dayMonth] = isRecentVideo?.date.match(regExp) || [''];
        const [newDayMonth] = new Date().toLocaleDateString().match(regExp);
        
        if(isRecentVideo && dayMonth === newDayMonth){
            setVideo(isRecentVideo);
        } else {
            const recentVideo = await YouTube.getVideo();
            setVideo(recentVideo);
            localStorage.setItem('recentVideo', JSON.stringify(recentVideo));
        };
    }, []);

    const [buttons, setButtons] = useState([
        {
            link: "https://www.youtube.com/channel/UC1fH5QWhi_-ibr4dwpxJC9g",
            imageIcon: "/assets/images/icons/youtube-icon.png",
            actionIcon: "/assets/images/icons/chevron-down-icon.png",
            alt : "YouTube",
            text: "Canal do YouTube.",
            color: ''
        },
        {
            link: "#",
            imageIcon: "/assets/images/icons/coffee-icon.png",
            actionIcon: "/assets/images/icons/link-black-icon.png",
            alt : "Pagar um café pra mim!",
            text: "Pagar um café pra mim!",
            color: 'yellow',
            colorText: {color: 'black'}
        },
        {
            link: "https://luccasscds.github.io/blog/",
            imageIcon: "/assets/images/icons/blog-icon.png",
            alt : "ir para site blog.",
            text: "Blog - Conteúdo mais técnicos.",
            color: ''
        },
        {
            link: "#",
            imageIcon: "/assets/images/icons/store-icon.png",
            alt : "loja de produtos.",
            text: "Produtos recomendados.",
            color: ''
        },
    ]);
    return(
        <Wrapper>
            <Video href={`https://www.youtube.com/watch?v=${video?.id}`} target={'_blank'}>
                <Thumbnails style={{background: `url(${video?.thumbnailsUrl}) center`}}></Thumbnails>
                <Title>{video?.title}</Title>
            </Video>
            {buttons.map( (button, index) => {
                return(
                    <ContainerButton key={index} href={button.link} target={'_blank'} color={button.color}>
                        <FirstContent>
                            <Icon src={button.imageIcon} alt={button.alt} />
                            <Text color={button.color}>{ button.text }</Text>
                        </FirstContent>
                        <LastContent>
                            <Icon src={button.actionIcon || "/assets/images/icons/link-white-icon.png"} alt="Direcionar." />
                        </LastContent>
                    </ContainerButton>
                );
            })}
        </Wrapper>
    )
}