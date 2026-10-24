import { useEffect, useState } from "react";
import { GitHub } from "../../controllers/github.controller";
import { Img, Container, Icons, Links } from "./styles";
const pathIcon = "/assets/images/icons/";

export function SocialNetworks() {
    const [links, setLinks] = useState([]);

    useEffect(() => {
        let isMounted = true;
        GitHub.getSocialLinks().then((socialLinks) => {
            if (isMounted) setLinks(socialLinks);
        });
        return () => { isMounted = false; };
    }, []);

    return(
        <Container>
            {links.map( (link, index) => {
                const pathSvg = `${pathIcon}${link.name?.toLowerCase()}.svg`;
                const src = /^https?:\/\//.test(link.src) ? link.src : pathSvg;
                return(
                    <Icons key={index}>
                        <Links href={link.url} target={"_blank"}>
                            <Img src={src} alt={link.title} title={link.title} />
                        </Links>
                    </Icons>
                )
            })}
        </Container>
    );
}