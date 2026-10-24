import { useEffect, useState } from "react";
import { GitHub } from "../../controllers/github.controller";
import { SocialNetworks } from "../../components/SocialNetworks";
import { ButtonLink } from "../../components/ButtonLink";
import { SiteNav } from "../../components/SiteNav";
import {
    ProfileImg, Wrapper, BackgroundPhoto, ContainerText, NameText,
    BioText, Main, Content
} from "./styles";

export function Home(){
    const [profile, setProfile] = useState({});

    useEffect(() => {
        let isMounted = true;

        GitHub.getProfile().then((githubProfile) => {
            if (isMounted) {
                setProfile({
                    name: githubProfile.name,
                    avatarUrl: githubProfile.avatarUrl,
                    bio: githubProfile.bio,
                });
            }
        });
        return () => { isMounted = false; };
    }, []);

    return (
        <Main>
            <SiteNav />
            <Content>
                <Wrapper>
                    <div>
                        <BackgroundPhoto>
                            <ProfileImg src={profile.avatarUrl} alt={profile.name}/>
                        </BackgroundPhoto>
                    </div>

                    <ContainerText paddingTop={1}>
                        <NameText>Olá, eu sou <strong>{profile.name}</strong></NameText>
                    </ContainerText>

                    <ContainerText paddingTop={0.75}>
                        <BioText>{profile.bio}</BioText>
                    </ContainerText>
    
                    <SocialNetworks/>
                </Wrapper>

                <ButtonLink />
            </Content>
        </Main>
    )
}