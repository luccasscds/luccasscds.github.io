function addProject(imageUrl, text, link) {
    const gridContainer = document.querySelector(".grid-container");
    const div = document.createElement("div");
    const img = document.createElement("img");
    const p = document.createElement("p");
    const a = document.createElement("a");
    div.className = "container";
    p.className = "hidden-text";
    img.src = imageUrl;
    p.innerText = text;
    a.href = link;
    div.append(a);
    a.append(img);
    a.append(p);
    gridContainer.append(div);
}

const projects = [
    {
        url: "/assets/images/projects/devcompras.png",
        description: "Dev compras é uma aplicação que simula compras de produtos ,sendo possível pesquisar , visualizar e adicionar o produto no carrinho de compras.",
        link: "https://dev-compras.herokuapp.com/"
    },
    {
        url: "/assets/images/projects/devfinances.png",
        description: "Dev.Finances é uma aplicação de controle de gastos, sendo possível controlar entrada e saída do dinheiro.",
        link: "https://devfinances12.netlify.app/"
    },
    {
        url: "/assets/images/projects/pomodev.png",
        description: "PomoDev é uma aplicação consiste na utilização de um cronômetro para dividir o trabalho em períodos de 25 minutos, separados por breves intervalos",
        link: "https://pomodev.netlify.app/"
    },
    {
        url: "/assets/images/projects/rocketq.png",
        description: "O Rocket.Q é uma aplicação de interação através de perguntas, sendo possível criar uma sala para internautas anônimos fazerem perguntas e o criador da sala em posse de uma senha gerenciar essas perguntas e marcar como lidas.",
        link: "https://rocketq1.netlify.app/"
    },
    {
        url: "/assets/images/projects/tasklist.png",
        description: "Task list é uma aplicação foi projetada para criar tarefas, dividindo-as em categorias, sendo possível marcá-las ou não como lidas.",
        link: "https://task-list12.herokuapp.com/"
    }
]

function main() {
    // adicionando os projetos na página
    projects.forEach( project => {
        addProject(project.url,project.description,project.link);
    });
}
main();