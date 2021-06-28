const BD = {
    get(value) {
        return localStorage.getItem(value);
    }, 
    set(id, value) {
        localStorage.setItem(id,value);
    }
}

const background = {
    verificar_cor() {
        let background_color = BD.get("background");
        let button = document.querySelector('#btn-check');

        button.checked = background_color === "true" ? true : false;
        
        this.mudar_cor(background_color)
    },
    mudar_cor(value) {
        let button = document.querySelector('#btn-check').checked;
        let icons = document.querySelectorAll('.graduation');
        
        if(button === true || value === "true") {
            document.querySelector('body').classList.add('dark');
            
            icons.forEach( icon => {
                icon.srcset = "imagens/graduation-cap.png"
            })

            if(value !== "true"){
                BD.set("background", button);
            }

        } else {
            document.querySelector('body').classList.remove('dark');

            icons.forEach( icon => {
                icon.srcset = "imagens/graduation-cap-black.png"
            })

            if(value !== "false"){
                BD.set("background", button);
            }
        }
    }
}

const Scroll = {
    animation() {
        let positionScren = window.scrollY;
        let heightHome = document.querySelector(".home").offsetHeight -1;
        let positionProjetos = document.querySelector(".projetos").offsetTop;

        if(positionScren < heightHome){
            document.querySelectorAll('.menu-a').forEach(a => {
                if(a.hash === "#home") {
                    a.classList.add('active-scroll')
                }else {
                    a.classList.remove('active-scroll')
                }
            })
        }

        if(positionScren >= positionProjetos) {
            document.querySelectorAll('.menu-a').forEach(a => {
                if(a.hash === "#projetos") {
                    a.classList.add('active-scroll')
                }else {
                    a.classList.remove('active-scroll')
                }
            })
        }
    }
}

const button_menu = {
    ativado: 0,
    on() {
        if(this.ativado === 0) {
            document.querySelector('.background-menu').classList.add('menuVertical');

            this.ativado = 1;
            console.log(this.ativado)
        }else {
            document.querySelector('.background-menu').classList.remove('menuVertical');

            this.ativado = 0;
            console.log(this.ativado)
        }
    }
}

background.verificar_cor();