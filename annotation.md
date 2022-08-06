# [RegEx] Expressão Regular

## O que é?
Expressão regular é padrão utilizado para buscar caracteres numa string.

## Criando uma expressão regular
```js
    const regExp1 = new RegExp("dev"); // retorna /dev/
    // ou
    const regExp2 = /dev/;
```

## Métodos para usar as expressões regulares
`match()`: um método da ***String*** que busca a expressão regular passada e retorna a mesma, se não retorna null.
```js
    // exemplo
    const regExp = /comida/;
    const resultado = "uma frase que tenha comida".match(regExp); // retorna ['comida', ...]
```

`exec()`: um método do ***RegExp*** que busca a expressão regular passada e retorna a mesma, se não retorna null.
```js
    // exemplo
    const regExp = /faculdade/;
    const resultado = regExp.exec("hoje vai ter faculdade!"); // retorna ['faculdade', ...]
```

`test()`: um método do ***RegExp*** que testa a expressão e retorna `true` quando acha e `false` quando não acha.
```js
    // exemplo
    const regExp = /faculdade/;
    const frase = "hoje vai ter faculdade!";
    const resultado = regExp.test(frase); // retorna true
```
Além deles têm os `replace()`, `split()` e `search()` mostrarei, respectivamente, os exemplos de cada um de forma rápida.
```js
    // exemplo 1
    const resultado = "java é a melhor linguagem".replace(/java/, 'javaScript');
    // retorna 'javaScript é a melhor linguagem'
```
```js
    // exemplo 2
    const resultado = "1º parte & 2º parte".split(/&/);
    // retorna ['1º parte', ' 2º parte']
```
```js
    // exemplo 3
    const resultado = "12345".search(/2/);
    // retorna 1
```

## Flags
Vamos para as **flags** são valores que acrescenta muito na buscar, vamos lá ver algumas:

`g`: busca globalmente, busca todas ocorrências no texto e não a primeira que encontra.
```js
    // exemplo
    const regExp = /o/g;
    const resultado = "hoje tem jogo?".match(regExp); // retorna ['o', 'o', 'o']

    // Não usando a flag "g" só retornará o primeiro termo.
    const resultado = "hoje tem jogo?".match(/o/); // retorna ['o', ...]
```

`i`: ignona letra maiúscula e minúscula.
```js
    // exemplo
    const regExp = /typescript/gi;
    const resultado = "TypeScript".match(regExp); // retorna ['TypeScript']

    // Não usando a flag "i" não será encontrado.
    const resultado = "TypeScript".match(/typescript/g); // retorna null
```

## Explicando algumas expressões

`^x`: O acento circunflexo ou "chapeuzinho" significa que deve procurar no começo da frase.
```js
    // exemplo 1
    const regExp = /^123/;
    const resultado = "12345".match(regExp); // retorna [ '123', ... ]

    // exemplo 2
    const regExp = /^23/;
    const resultado = "12345".match(regExp); // retorna null
```

`x$`: A busca usando `$` é feita no final do texto.
```js
    // exemplo
    const regExp = /script$/;
    const resultado = "java script".match(regExp); // retorna [ 'script', ... ]

    const regExp = /java$/;
    const resultado = "java script".match(regExp); // retorna null
```

`\d`: Pesquisa os dígitos. Usando `[0-9]` é o mesmo resultado.
```js
    // exemplo
    const regExp = /\d/;
    const resultado = "O javaScript surgiu em 1995".match(regExp); // retorna [ '1', ... ]

    // Outra maneira
    const resultado = "O javaScript surgiu em 1995".match(/[0-9]/); // retorna [ '1', ... ]
```

`\D`: Pesquisa os não dígitos, ou seja tudo que não seja dígitos. Usando `[^0-9]` terá o mesmo resultado.
```js
    // exemplo
    const regExp = /\D/;
    const resultado = "O javaScript surgiu em 1995".match(regExp); // retorna [ 'O', ... ]

    // Outra maneira
    const resultado = "O javaScript surgiu em 1995".match(/[^0-9]/); // retorna [ 'O', ... ]
```
`\s`: Busque os espaços.
```js
    // exemplo
    const regExp = /\s/;
    const resultado = "a e i o u".match(regExp); // retorna [ ' ', ... ]
```

`\S`: Busque tudo meno espaço.
```js
    // exemplo
    const regExp = /\S/;
    const resultado = "a e i o u".match(regExp); // retorna [ 'a', ... ]
```

`\w`: Correspondente todos os caracteres de `[A-Z]`, `[a-z]`, `[0-9]` e `_`.
```js
    // exemplo
    const regExp = /\w/;
    const resultado = "ABCDabcd123_-".match(regExp); // retorna [ 'A', ... ]
```

`\W`: É a negação do `\w`.
```js
    // exemplo
    const regExp = /\W/;
    const resultado = "ABCDabcd123_-".match(regExp); // retorna [ '-', ... ]
```

`[abc]`: Os colchetes com caracteres, significa busque cada caracteres dentro dos colchetes.
```js
    // exemplo
    const regExp = /[end]/;
    const resultado = "frontEnd e backEnd".match(regExp); // retorna [ 'n', ... ]
```

`[^abc]`: O `^` significa negação, ou seja busque tudos menos os carecteres que estão dentro dos colchetes.
```js
    // exemplo
    const regExp = /[^end]/;
    const resultado = "frontEnd e backEnd".match(regExp); // retorna [ 'f', ... ]
```

`\`: A barra invertida significa que o próximo caractere especial deve ser lido.
```js
    // exemplo
    const regExp = /\(12\)/;
    const resultado = "(12)345".match(regExp); // retorna [ '(12)', ... ]
```

`x{n}`: Significa que o `x` repetirá `n` vezes, `n` é número positivo.
```js
    // exemplo
    const regExp = /cafe{2}/;
    const resultado = "quero cafeeee".match(regExp); // retorna [ 'cafee', ... ]
```

`x{n,m}`: Na mesma lógica, pórem que o `n` é o mínimo e o `m` é o máximo de vezes repetidas.
```js
    // exemplo
    const regExp = /cafe{1,3}/; // a letra E de cafe deve se repita 1 vez e no máximo 3 vezes.
    const resultado = "quero cafeeee".match(regExp); // retorna [ 'cafeee', ... ]
```

`x*`: O `*` que dizer que o `x` se repetirá 0 ou mais vezes.
```js
    // exemplo
    const regExp = /ae*/;
    const resultado = "aeeeiou".match(regExp); // retorna [ 'aeee', ... ]
```

`x+`: É parecido com `+` só que o termo se repete 1 ou mais vezes.
```js
    // exemplo
    const regExp = /ae*/;
    const resultado = "aeeeiou".match(regExp); // retorna [ 'aeee', ... ]
```

`x?`: O `x` que aconpanha o `?` se repete 0 ou 1 vez.
```js
    // exemplo
    const regExp = /ae?/;
    const resultado = "aeeeiou".match(regExp); // retorna [ 'ae', ... ]
```

Muita coisa para aprender? mas não preocupe que você treinando pouco em pouca horas consegue entender cada coisinha.

`x|y`: Significa para pesquisar `x` ou `y`.
```js
    // exemplo
    const regExp = /back|front/;
    const resultado = "frontEnd e backEnd".match(regExp); // retorna [ 'front', ... ]
```

`.`: Qualquer caractere, exceto caractere de nova linha.
```js
    // exemplo
    const regExp = /.End/;
    const resultado = "frontEnd e backEnd".match(regExp); // retorna [ 'tEnd', ... ]
```

`( )`: Os parênteses serve para pesquisa e memorizar o termo pesquisado. Essa memorização vou comentar mais frente.
```js
    // exemplo
    const regExp = /(End)/;
    const resultado = "frontEnd e backEnd".match(regExp); // retorna [ 'End', 'End', ... ]
```

`x(?=y)`: A pesquisa correspondente que `x` é seguido por `y`.
```js
    // exemplo
    const regExp = /front(?=End)/;
    const resultado = "frontEnd e backEnd".match(regExp); // retorna [ 'front', ... ]
```


## Exemplos/Desafio
Vamos colocar os conhecimentos em práticas.

```js
    const regExp = /([0-9]{2})\/([0-9]{2})\/([0-9]{4})/g;
    const resultado = '10/17/2001'.replace(regExp, '$2/$1/$3');
    // retorna 17/10/2001
```

Retornando para aquele ponto sobre o `(x)`, que memoriza, ele pode ser usando com o `$1` de acordo com as quantidades de `(x)`, no exemplo acima usei 3 então até o `$3`.

```js
    // Desafio 1
    // Formate essa data 05072022 para essa 05/07/2022
    const regExp = /^([\d]{1,2})([\d]{1,2})([\d]{4}$)/g;
    const resultado = '05072022'.replace(regExp, "$1/$2/$3");
    // retorna 05/07/2022
    
    const resultado = '572022'.replace(regExp, "$1/$2/$3");
    // retorna 5/7/2022
```

```js
    /*
        Desafio 2
        Formate o endereço 'https://github.com/luccasscds?tab=projects'
        para 'luccasscds?tab=projects'
    */
    const regExp = /^(https?\:\/\/.*\/)/g;
    const url = 'https://github.com/luccasscds?tab=projects';
    const resultado = url.replace(regExp, '');
    // retorna luccasscds?tab=projects
```

```js
    /*
        Desafio 3
        Formate esse número 86999208669 para (86) 9 9920-8669
    */
    const regExp = /^([\d]{2})([\d]{1})([\d]{4})([\d]{4})$/g;
    const resultado = '86999208669'.replace(regExp, '($1) $2 $3-$4');
    // retorna (86) 9 9920-8669
```