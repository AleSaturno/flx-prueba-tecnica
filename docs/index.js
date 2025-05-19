/*
  Ejercicio 1: Reverse a String
  Escribe una función reverseString que tome una cadena como entrada y devuelva la cadena invertida.
*/

function reverseString(str) {
  // Tu solución acá
  return str.split("").reverse().join("");  
}

/*
  Ejercicio 2: Check for Palindrome
  Escribe una función isPalindrome que tome una cadena como entrada 
  y devuelva true si la cadena es un palíndromo, y false en caso contrario.
*/
function isPalindrome(str) {
  // Tu solución acá
  const limpio = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  const reversa = limpio.split("").reverse().join("");
  return limpio === reversa;
}

/*
  Ejercicio 3: Find the Nearest Pair
  Dado un array de números enteros, 
  encuentra el par de elementos cuya diferencia es mínima. 
  En otras palabras, encuentra dos números en el array que 
  estén más cerca el uno del otro en términos de valor absoluto.

  Ejemplo:

  Entrada: [4, 2, 1, 7, 9, 10]
  Salida: [1, 2]
*/

function closestPair(arr) {
  // Tu solución acá
  if(arr.length < 2) return[];

  arr.sort((a,b) => a-b);
  let minDif = Infinity;
  let pair = [];

   arr.forEach((num, i) => {
    if (i < arr.length - 1) {
      const dif = Math.abs(num - arr[i + 1]);
      if (dif < minDif) {
        minDif = dif;
        pair = [num, arr[i + 1]];
      }
    }
  });
  return pair;
}


/*
  Ejercicio 4: Calculadora - Programación Orientada a Objetos
  La calculadora debe ser capaz de realizar operaciones aritméticas básicas, 
  como suma, resta, multiplicación y división. 
  Además, debe mantener un registro del último resultado calculado 
  para que los usuarios puedan acceder a él si es necesario.

  La calculadora debe ser una clase llamada Calculator, que tenga los siguientes métodos:
  - add(a, b): Este método toma dos números como argumentos y devuelve la suma de los mismos. 
    Además, actualiza el último resultado calculado.

  - subtract(a, b): Este método toma dos números como argumentos y devuelve la resta del primero menos el segundo. 
    Además, actualiza el último resultado calculado.

  - multiply(a, b): Este método toma dos números como argumentos y devuelve el producto de los mismos. 
    Además, actualiza el último resultado calculado.

  - divide(a, b): Este método toma dos números como argumentos y devuelve el cociente del primero dividido por el segundo.
    Si el segundo número es cero, se debe lanzar un error indicando que la división por cero no está permitida. 
    Además, actualiza el último resultado calculado.

  - getLastResult(): Este método devuelve el último resultado calculado por la calculadora, simulando un historial.

  Además de estos métodos, debes agregar una función más compleja a la clase Calculator, 
  que calcule la potencia de un número. 
  Esta función debe ser asignada al prototipo de la clase y se llamará exponentiate(base, exponent). 
  Esta función toma dos argumentos: la base y el exponente, y devuelve la base elevada a la potencia del exponente. 
  La función debe manejar correctamente los casos donde el exponente es cero o negativo, lanzando un error en este último caso.
  Además, actualiza el último resultado calculado.

*/

class Calculator {
  // Tu solución acá
  constructor(){
    this.lastResult = null;
  }

 add(a, b) {
    this.lastResult = a + b;
    return this.lastResult;
  }

  subtract(a, b) {
    this.lastResult = a - b;
    return this.lastResult;
  }

  multiply(a, b) {
    this.lastResult = a * b;
    return this.lastResult;
  }


  //Aclaracion en los comentarios throw new Error. Tuve que fijarme en el index.test.js, como estaban escritos por que sino no me pasaban los test ;)
  divide(a, b) {
    if (b === 0) {
      throw new Error("Division by zero is not allowed");
    }
    this.lastResult = a / b;
    return this.lastResult;
  }

  getLastResult() {
    return this.lastResult;
  }
}


Calculator.prototype.exponentiate = function (base, exponent) {
  if (exponent < 0) {
    throw new Error("Exponentiation with negative exponent is not allowed");
  }
  this.lastResult = Math.pow(base, exponent);
  return this.lastResult;
};


 

module.exports = {
  closestPair,
  isPalindrome,
  reverseString,
  Calculator,
}