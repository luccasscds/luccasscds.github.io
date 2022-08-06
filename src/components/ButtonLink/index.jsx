import { useEffect, useState } from 'react';
import { YouTube } from '../../controllers/youtube.controller';
import { Data } from './data';
import { Wrapper, ContainerButton, Icon, Text, FirstContent, LastContent, Video, Title, Thumbnails } from './styles';

export function ButtonLink(){
    const [video, setVideo] = useState({});
    const [buttons, setButtons] = useState([...Data]);

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

    return(
        <Wrapper>
            <Video href={`https://www.youtube.com/watch?v=${video?.id}`} target={'_blank'}>
                <Thumbnails style={{background: `url(${video?.thumbnailsUrl}) center`}}></Thumbnails>
                <Title>{video?.title}</Title>
            </Video>
            {buttons.map( (button, index) => {
                return(
                    <ContainerButton key={index} 
                        onClick={() => button.link ? window.open(button.link, '_blank') : ''} 
                        color={button.color}
                        hidden={button.hidden}
                    >
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