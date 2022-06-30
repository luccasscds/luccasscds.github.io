import { Img, Container, Icons, Links } from "./styles";
import { useState } from "react";

// Import images project
import iconInstagram from "/assets/images/icons/instagram.png"
import iconGithub from "/assets/images/icons/github.png"
import iconLinkedIn from "/assets/images/icons/linkedin.svg"

export function SocialNetworks() {
    const [links, setLinks] = useState([
        {
            url : "https://www.instagram.com/programadorlucas/",
            src: iconInstagram,
            title : "link para Instagram"
        },
        {
            url : "https://github.com/luccasscds",
            src: iconGithub,
            title : "link para github"
        },
        {
            url : "https://www.linkedin.com/in/lucassilva21/",
            src: iconLinkedIn,
            title : "link para LinkedIn"
        },
        
    ]);
    return(
        <Container>
            {links.map( (link, index) => {
                return(
                    <Icons key={index}>
                        <Links href={link.url} target={"_blank"}>
                            <Img src={link.src} alt={link.title} title={link.title} />
                        </Links>
                    </Icons>
                )
            })}
        </Container>
    );
}