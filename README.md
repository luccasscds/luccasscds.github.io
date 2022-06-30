# Video para o canal[RegEx]

## O que é?
Expressão regulares são padrões utilizados para buscar caracteres numa string.

## Criando uma expressão regular
```js
    const regExp = new RegExp("lucas"); // retorna /lucas/
    const frase = "uma frase para verificar se vai buscar o nome lucas.";
    frase.match(regExp); // retorna ['lucas', ...]

    // outra forma de criar
    frase.match(/lucas/); // retorna ['lucas', ...]
```

## Métodos
`string.match()`: um método da ***String*** que busca a expressão regular passada e retorna a mesma, se não retorna null.
```js
    // exemplo
```

`RegExp.exec()`: um método do ***RegExp()*** que busca a expressão regular passada e retorna a mesma, se não retorna null.
```js
    // exemplo
   const regExp = new RegExp('trabalho'); // retorna /trabalho/
    const frase = "hoje vai ter faculdade!";
    const resultado = regExp.test(frase); // retorna null
    // por que  
```

`RegExp.test()`: um método do ***RegExp()*** que testa a expressão e retorna true quando acha e false quando não acha.
```js
    // exemplo
    const regExp = new RegExp('faculdade'); // retorna /faculdade/
    const frase = "hoje vai ter faculdade!";
    const resultado = regExp.test(frase); // retorna true
```
