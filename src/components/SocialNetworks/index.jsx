import { Img, Container, Icons, Links } from "./styles";
const pathIcon = "/assets/images/icons/";

export function SocialNetworks() {
    const links = [
        {
            url : "https://github.com/luccasscds",
            src: pathIcon + "github.svg",
            title : "link para github"
        },
        {
            url : "https://www.youtube.com/@luccassDev",
            src: pathIcon + "youtube.svg",
            title : "link para YouTube"
        },
        {
            url : "https://www.instagram.com/programadorlucas/",
            src: pathIcon + "instagram.svg",
            title : "link para Instagram"
        },
        {
            url : "https://www.linkedin.com/in/lucassilva21/",
            src: pathIcon + "linkedin.svg",
            title : "link para LinkedIn"
        },
    ];

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