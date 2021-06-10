console.log('ಠ_ಠ');//master

const text = document.querySelector('.name-text');

const efeitos = {
    digitando(text) {
        let textArray = text.innerText.split('');
        text.innerHTML = "";

        textArray.forEach((palavra,index) => {
            setTimeout(function(){
                text.innerHTML += palavra;
            },700 * index)
        })
    }
}

efeitos.digitando(text);