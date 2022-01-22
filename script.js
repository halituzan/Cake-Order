"use strict";

const patisserie = {
  bananaCaramel: {
    stock: 3,
    price: 9.99,
  },
  contessa: {
    stock: 5,
    price: 7.99,
  },
  concorde: {
    stock: 11,
    price: 22.99,
  },
  mouseCake: {
    stock: 8,
    price: 16.99,
  },
  confettiSuprise: {
    stock: 9,
    price: 14.99,
  },
};
let cakeSelect = document.getElementById("cakeSelect")
let cakeAmount = document.getElementById("cakeAmount")
let orderBtn = document.getElementById("submit_btn")
const checkOrder = (order) => {
  return new Promise((resolve, reject) => {
    setTimeout(beklet, 1000);
    function beklet() {
      if (order <= patisserie[cakeSelect.value].stock) {
        let total = order * patisserie[cakeSelect.value].price
        console.log(`You ordered ${order} ${cakeSelect.options[cakeSelect.selectedIndex].text}`);

        resolve([order, total])
      } else {
        reject(`${cakeSelect.options[cakeSelect.selectedIndex].text} stock is enough`)
      }
    }
  })

};



const payment = (resolvedValue) => {

  return new Promise((resolve, reject) => {
    setTimeout(beklet, 2000);
    function beklet() {

      if (resolvedValue.length === 2) {
        console.log(`All of the items are in stock. The total cost of the order is ${resolvedValue[1]} Press "K" if it is Ok?`);
        console.log(resolvedValue[1]);
        document.addEventListener("keypress", (event) => {
          if (event.key === "k") {
            console.log(`Payment processed completed. You paid ${resolvedValue[1]} $`);
            resolve(resolvedValue[0])
          }
        })
      }
    }
  })
}


const checkStock = (resolvedValue) => {
  return new Promise((resolve, reject) => {
    setTimeout(beklet, 3000);
    function beklet() {
      console.log("To Cashier: Wait for checking stock...");
      if (patisserie[cakeSelect.value].stock - resolvedValue[0] <= 2 && patisserie[cakeSelect.value].stock - resolvedValue[0] >= 0) {
        patisserie[cakeSelect.value].stock -= resolvedValue[0]
        console.log(`${cakeSelect.options[cakeSelect.selectedIndex].text} stock is ${patisserie[cakeSelect.value].stock} and it is critic`);

        resolve(`${cakeSelect.options[cakeSelect.selectedIndex].text} stock is ${patisserie[cakeSelect.value].stock - resolvedValue[0]} and it is critic`)
      } else {
        console.log(`${cakeSelect.options[cakeSelect.selectedIndex].text} stock is enough`);
      }
    }
  })
}

orderBtn.onclick = () => {
  if (cakeAmount.value > 0) {
    checkOrder(cakeAmount.value)
      .then(res => payment(res))
      .then(res => checkStock(res))
      .catch(err => console.log(err));
  } else {
    console.log("Please enter a number greater than 0 ");
  }
}