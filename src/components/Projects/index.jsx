import { useState } from "react";
import { Container, Title, Wrapper, ContainerProject, Link, Img, HiddenText } from "./styles";

// Import images
import devcompras from "../../assets/images/projects/devcompras.png";
import devfinances from "../../assets/images/projects/devfinances.png";
import pomodev from "../../assets/images/projects/pomodev.png";
import rocketq from "../../assets/images/projects/rocketq.png";
import tasklist from "../../assets/images/projects/tasklist.png";

export function Projects() {
    const [projects, setProjects] = useState([
        {
            src: devcompras,
            description: "Dev compras é uma aplicação que simula compras de produtos ,sendo possível pesquisar , visualizar e adicionar o produto no carrinho de compras.",
            url: "https://dev-compras.herokuapp.com/"
        },
        {
            src: devfinances,
            description: "Dev.Finances é uma aplicação de controle de gastos, sendo possível controlar entrada e saída do dinheiro.",
            url: "https://devfinances12.netlify.app/"
        },
        {
            src: pomodev,
            description: "PomoDev é uma aplicação consiste na utilização de um cronômetro para dividir o trabalho em períodos de 25 minutos, separados por breves intervalos",
            url: "https://pomodev.netlify.app/"
        },
        {
            src: rocketq,
            description: "O Rocket.Q é uma aplicação de interação através de perguntas, sendo possível criar uma sala para internautas anônimos fazerem perguntas e o criador da sala em posse de uma senha gerenciar essas perguntas e marcar como lidas.",
            url: "https://rocketq1.netlify.app/"
        },
        {
            src: tasklist,
            description: "Task list é uma aplicação foi projetada para criar tarefas, dividindo-as em categorias, sendo possível marcá-las ou não como lidas.",
            url: "https://task-list12.herokuapp.com/"
        }
    ]);
    return (
        <Container>
            <Title>Meus projetos</Title>
            <Wrapper>
                {projects.map( project => {
                    return(
                        <ContainerProject>
                            <Link href={project.url}>
                                <Img src={project.src} />
                                <HiddenText>{project.description}</HiddenText>
                            </Link>
                        </ContainerProject>
                    );
                })}
            </Wrapper>
        </Container>
    );
}