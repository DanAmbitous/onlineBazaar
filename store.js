{
  ;("plugins")
  ;["jsdom-quokka-plugin"]
}

const buttons = document.querySelectorAll("button")
const cartProductList = document.querySelector("#cart-product-list-container")
const cartButton = document.querySelector("#cart-button")
const products = Array.from(document.querySelectorAll(".p-4"))

cartShower()

buttons.forEach((button) => {
  if (button.innerText === "Add To Cart") {
    button.classList.add("add-to-cart-button")
  }
})

const productContainer = document
  .querySelector(".add-to-cart-button")
  .closest(".flex-wrap")

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("add-to-cart-button")) {
    productPacker(e.target)
  } else if (e.target.classList.contains("remove-product")) {
    productPacker(e.target)
  }
})

const productColor = [
  "Red",
  "Yellow",
  "Blue",
  "Orange",
  "Green",
  "Purple",
  "LightGray",
  "DarkGray",
]

productColor.forEach((color, index) => {
  products[index].classList.add(color)
})

const productNumbering = {}
productColor.forEach((product) => {
  productNumbering[`${product}`] = 0
})

function productPacker(button) {
  if (button.classList.contains("add-to-cart-button")) {
    const productContainer = button.closest(".w-full")
    const product = {}
    product.image = productContainer.querySelector("img").src

    if (productContainer.querySelector("h2").textContent === "Light Gray") {
      product.name = "LightGray"
    } else if (
      productContainer.querySelector("h2").textContent === "Dark Gray"
    ) {
      product.name = "DarkGray"
    } else {
      product.name = productContainer.querySelector("h2").textContent
    }
    product.quantity = productNumbering[product.name] + 1
    product.price = Number(
      productContainer.querySelector("p").textContent.substring(1)
    )
    productColor.forEach((color) => {
      if (product.name === color) {
        productNumbering[product.name] += 1
      }
    })

    cartAdder(product, productNumbering, null)
  } else {
    cartAdder(null, productNumbering, button)
  }
}

// const anEnumerationOfProducts = []
function cartAdder(product, productNumbering, button) {
  if (product != null) {
    const template = document.getElementsByTagName("template")[0]
    const clone = template.content.cloneNode(true)
    clone.querySelector("img").src = product.image
    if (product.name === "LightGray") {
      clone.querySelector("h2").innerText = "Light Gray"
    } else if (product.name === "DarkGray") {
      clone.querySelector("h2").innerText = "Dark Gray"
    } else {
      clone.querySelector("h2").innerText = product.name
    }

    //Price and quantity of the selected product (Individually)
    clone.querySelector("span").innerHTML = "x" + product.quantity
    clone.querySelector(".total-product-price").innerText =
      "$" + product.price + ".00"

    //To convert the spaced names into a more versitle version of themselves
    if (product.name === "Light Gray") {
      product.name = "LightGray"
      clone.querySelector(".cart-item").classList.add(product.name)
    } else if (product.name === "Dark Gray") {
      product.name = "DarkGray"
      clone.querySelector(".cart-item").classList.add(product.name)
    } else {
      clone.querySelector(".cart-item").classList.add(product.name)
    }

    //To determine the total price of the particular set of items
    for (const [key, value] of Object.entries(productNumbering)) {
      if (value > 1) {
        const productName = cartProductList.querySelector(".text-gray-900")

        if (productName.innerText === key) {
          clone.querySelector("span").innerHTML = "x" + product.quantity
          clone.querySelector(".total-product-price").innerText =
            "$" + product.price * product.quantity + ".00"
        }
      }
    }

    cartProductList.append(clone)

    //Remove previous of the same products so only one element would represent it
    for (const [key, value] of Object.entries(productNumbering)) {
      if (value > 1) {
        const products = Array.from(cartProductList.querySelectorAll(`.${key}`))
        const outdatedProducts = products.slice(0, -1)
        outdatedProducts.forEach((outdatedProduct) => {
          outdatedProduct.remove()
        })
      }
    }
    quantityOfProductsDeterminer(productNumbering)
    grandTotalPriceDeterminer()

    // anEnumerationOfProducts.length = 0
    // const totalQuantityOfProducts = document.body.querySelectorAll(".quantity")
    // totalQuantityOfProducts.forEach(() => {
    //   anEnumerationOfProducts.push(1)
    // })
    // const theTotalNumberOfProducts = anEnumerationOfProducts.reduce(
    //   (sum, value) => (sum += value),
    //   0
    // )
    // document.querySelector(".product-number").innerText =
    //   theTotalNumberOfProducts
  } else {
    const productName =
      button.parentElement.parentElement.querySelector(
        ".text-gray-900"
      ).innerText

    for (const [key, value] of Object.entries(productNumbering)) {
      if (key === productName) {
        value -= 1
        productNumbering[key] = value
      }
    }

    quantityOfProductsDeterminer(productNumbering)
    // console.log(button)

    // let quantityOfProduct = Number(
    //   button.parentElement.parentElement
    //     .querySelector(".text-gray-600")
    //     .innerText.substring(1)
    // )

    // quantityOfProduct -= 1

    // button.parentElement.parentElement.querySelector(
    //   ".text-gray-600"
    // ).innerText = `x${quantityOfProduct}`
  }
  // } else {
  //   let quantityOfProduct = Number(
  //     button.parentElement.parentElement
  //       .querySelector(".text-gray-600")
  //       .innerText.substring(1)
  //   )

  //   const productName =
  //     button.parentElement.parentElement.querySelector(".font-medium").innerText

  //   if (quantityOfProduct <= 1) {
  //     for (const key in productNumbering) {
  //       if (Object.hasOwnProperty.call(productNumbering, key)) {
  //         productNumbering[key] = 0
  //       }

  //       const productCost = Number(
  //         document
  //           .querySelector(`.${key}`)
  //           .querySelector(".mt-1")
  //           .innerText.substring(1)
  //       )

  //       console.log("Product price:" + productCost)

  //       totalPriceCalculator(productCost, true)

  //       button.parentElement.parentElement.remove()

  //       cartShower()
  //     }
  //   } else {
  //     quantityOfProduct -= 1

  // button.parentElement.parentElement.querySelector(
  //   ".text-gray-600"
  // ).innerText = `x${quantityOfProduct}`

  //     for (const [key, value] of Object.entries(productNumbering)) {
  //       if (key === productName) {
  //         value = quantityOfProduct

  //         const totalProductCost =
  //           button.parentElement.parentElement.querySelector(
  //             ".total-product-price"
  //           )

  //         const productPrice = Number(
  //           document
  //             .querySelector(`.${key}`)
  //             .querySelector(".mt-1")
  //             .innerText.substring(1)
  //         )

  //         totalProductCost.innerText = `$${productPrice * quantityOfProduct}.00`

  //         for (const key in productNumbering) {
  //           if (Object.hasOwnProperty.call(productNumbering, key)) {
  //             if (key === productName) {
  //               productNumbering[key] = value
  //             }
  //           }
  //         }

  //         const productCost = Number(
  //           document
  //             .querySelector(`.${key}`)
  //             .querySelector(".mt-1")
  //             .innerText.substring(1)
  //         )
  //         console.log(productCost)
  //         totalPriceCalculator(productCost, true)
  //       }
  //     }

  //     quantityOfProduct = Number(
  //       button.parentElement.parentElement
  //         .querySelector(".text-gray-600")
  //         .innerText.substring(1)
  //     )
  //   }
  // }
}

// const productPrices = []
// function totalPriceCalculator(price, removal) {
//   if (!removal) {
//     console.log(price)

//     productPrices.push(price)
//     console.log(productPrices)
//   } else {
//     console.log(productPrices)
//     const notMatchingCosts = productPrices.filter(
//       (productPrice) => productPrice != price
//     )
//     const matchingCosts = productPrices.filter(
//       (productPrice) => productPrice === price
//     )

//     matchingCosts.pop()

//     productPrices.length = 0

//     notMatchingCosts.forEach((notMatchingCost) => {
//       productPrices.push(notMatchingCost)
//     })

//     matchingCosts.forEach((matchingCost) => {
//       productPrices.push(matchingCost)
//     })
//   }
// }

let prices = []
function grandTotalPriceDeterminer() {
  const allPrices = cartProductList.querySelectorAll(".total-product-price")
  prices = []

  allPrices.forEach((price) => {
    prices.push(Number(price.innerText.substring(1)))
  })

  const totalPrice = prices.reduce((sum, value) => (sum += value))
  document.querySelector(".grand-total-price").innerText = `$${totalPrice}.00`
}

function quantityOfProductsDeterminer(productNumbering) {
  let productQuantity = 0
  for (const [key, value] of Object.entries(productNumbering)) {
    productQuantity += value
  }
  document.querySelector(".product-number").innerText = productQuantity
}

function cartShower() {
  if (
    cartProductList.children.length === 0 ||
    cartButton.dataset.status === "show"
  ) {
    cartButton.dataset.status = "hide"
    document.querySelector(".list-container").style.display = "none"
  } else if (cartButton.dataset.status === "hide") {
    cartButton.dataset.status = "show"
    document.querySelector(".list-container").style.display = "block"
  }
}

cartButton.addEventListener("click", (e) => {
  cartShower()
})
