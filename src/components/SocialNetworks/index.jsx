import { Img, Container, Icons, Links } from "./styles";
import { useState } from "react";

// Import images project
import iconInstagram from "../../assets/images/icons/instagram.png"
import iconGithub from "../../assets/images/icons/github.png"
import iconLinkedin from "../../assets/images/icons/linkedin.svg"

export function SocialNetworks() {
    const [links, setLinks] = useState([
        {
            url : "https://www.instagram.com/programadorlucas/",
            src: iconInstagram,
            title : "link para instagram"
        },
        {
            url : "https://github.com/luccasscds",
            src: iconGithub,
            title : "link para github"
        },
        {
            url : "https://www.linkedin.com/in/lucassilva21/",
            src: iconLinkedin,
            title : "link para linkedin"
        },
        
    ]);
    return(
        <Container>
            {links.map( link => {
                return(
                    <Icons>
                        <Links href={link.url}>
                            <Img src={link.src} alt={link.title} title={link.title} />
                        </Links>
                    </Icons>
                )
            })}
        </Container>
);
}