import {SocialNetworks} from "../../components/SocialNetworks";
import { Projects } from "../../components/Projects";
import {
    ProfileImg, Wrapper, BackgroundPhoto, ContainerText, NameText,
    BioText
} from "./styles";

export function Home(){
    return (
        <main>
            <Wrapper class="fisrt-section">
                <div>
                    <BackgroundPhoto>
                        <ProfileImg src="https://github.com/luccasscds.png" alt="foto de perfil"/>
                    </BackgroundPhoto>
                </div>

                <ContainerText paddingTop={1}>
                    <NameText>Olá, eu sou <strong>Lucas Silva</strong></NameText>
                </ContainerText>

                <ContainerText paddingTop={0.5}>
                    <BioText>Sou desenvolvedor frontend e busco aprender sempre mais. Além de ajudar a comunidade.</BioText>
                </ContainerText>
    
                <SocialNetworks/>

            </Wrapper>
            
            <Projects />
        </main>
    )
}