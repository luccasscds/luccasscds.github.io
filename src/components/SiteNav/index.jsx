import { Icon } from "../ButtonLink/styles";
import { LinkItem, Navigation, NavWrapper } from "./styles";

export function SiteNav() {
    return (
        <NavWrapper>
            <Navigation aria-label="Navegação principal">
                <LinkItem to="/" end aria-label="Home" title="Home">
                    <Icon src={"/assets/images/icons/home.svg"} alt={"Home"} style={{ margin: 0, width: 18 }}/>
                </LinkItem>
                <LinkItem to="/videos">Videos</LinkItem>
                <LinkItem to="/blog">Blog</LinkItem>
            </Navigation>
        </NavWrapper>
    );
}
