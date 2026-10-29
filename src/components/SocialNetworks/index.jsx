import { useEffect, useState } from "react";
import { GitHub } from "../../controllers/github.controller";
import "./styles.css";
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
        <div className="social-networks">
            {links.map( (link, index) => {
                const pathSvg = `${pathIcon}${link.name?.toLowerCase()}.svg`;
                const src = /^https?:\/\//.test(link.src) ? link.src : pathSvg;
                return(
                    <div className="social-networks__item" key={index}>
                        <a className="social-networks__link" href={link.url} target="_blank" rel="noreferrer">
                            <img className="social-networks__image" src={src} alt={link.title} title={link.title} />
                        </a>
                    </div>
                )
            })}
        </div>
    );
}
