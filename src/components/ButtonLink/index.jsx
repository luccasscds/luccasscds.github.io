import Data from './data.json';
import { Wrapper, ContainerButton, Icon, Text, FirstContent, LastContent } from './styles';

export function ButtonLink({ excludeBlog = false }){
    const buttons = Data.filter((button) => button.link && !(excludeBlog && button.text.startsWith("Blog")));

    return(
        <Wrapper>
            {buttons.map( (button, index) => {
                return(
                    <ContainerButton key={index}
                        href={button.link}
                        target="_blank"
                        rel="noreferrer"
                        color={button.color}
                        hidden={button.hidden}
                    >
                        <FirstContent>
                            <Icon src={button.imageIcon} alt={button.alt} />
                            <Text color={button.color}>{ button.text }</Text>
                        </FirstContent>
                        <LastContent>
                            <Icon src={button.actionIcon || "/assets/images/icons/link-white-icon.svg"} alt="Direcionar." />
                        </LastContent>
                    </ContainerButton>
                );
            })}
        </Wrapper>
    )
}