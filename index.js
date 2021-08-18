const cartProductList = document.querySelector("#cart-product-list-container")
const productContainer = document.querySelector(".list-container")
const cartButton = document.querySelector("#cart-button")

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

productNumbering = {}
productColor.forEach((product) => {
  productNumbering[`${product}`] = 0
})

function getProducts() {
  productColor.forEach((productColor) => {
    let product = sessionStorage.getItem(productColor)

    if (product != null) {
      product = JSON.parse(product)
      console.log(product)

      productNumbering[product.name] = product.quantity

      const template = document.getElementsByTagName("template")[0]
      const clone = template.content.cloneNode(true)
      clone.querySelector(".cart-item").classList.add(product.name)
      clone.querySelector(".product-name-color").innerText = product.name
      clone.querySelector("img").src = product.image
      clone.querySelector(".quantity").innerText = `x${
        productNumbering[product.name]
      }`
      clone.querySelector(".total-product-price").innerText = `$${
        product.quantity * product.price
      }.00`

      cartProductList.append(clone)
    }
  })

  productListDisplayer()
  productQuantityTracker()
  totalPrice()
}

getProducts()

function productListDisplayer() {
  const products = cartProductList.querySelectorAll(".cart-item")
  console.log(document.querySelector("#cart-button").dataset.status)
  if (
    products.length === 0 ||
    document.querySelector("#cart-button").dataset.status === "show"
  ) {
    document.querySelector("#cart-button").dataset.status = "hide"
    productContainer.style.display = "none"
  } else if (document.querySelector("#cart-button").dataset.status === "hide") {
    document.querySelector("#cart-button").dataset.status = "show"

    productContainer.style.display = "block"
  }
}

function removeProduct(e) {
  if (e.shiftKey === false) {
    for (const [key, value] of Object.entries(productNumbering)) {
      const button = e.target
        .closest(".cart-item")
        .querySelector("h2").innerText

      let data = sessionStorage.getItem(key)
      data = JSON.parse(data)

      if (button === key) {
        productNumbering[key] -= 1

        if (productNumbering[key] === 0) {
          sessionStorage.removeItem(key)
          e.target.closest(".cart-item").remove()
        } else {
          data.quantity = productNumbering[key]
          data.totalPrice = productNumbering[key] * data.basePrice
          sessionStorage.setItem(key, JSON.stringify(data))

          e.target
            .closest(".cart-item")
            .querySelector(".quantity").innerText = `x${productNumbering[key]}`
          e.target
            .closest(".cart-item")
            .querySelector(".total-product-price").innerText = `$${
            productNumbering[key] * data.basePrice
          }.00`
        }
      }
    }
  } else {
    const button = e.target.closest(".cart-item").querySelector("h2").innerText

    for (const [key, value] of Object.entries(productNumbering)) {
      if (key === button) {
        const product = cartProductList.querySelector(`.${key}`)
        product.remove()
        productNumbering[key] = 0
        sessionStorage.removeItem(key)
      }
    }
  }

  if (productContainer.querySelectorAll(".cart-item").length === 0) {
    productListDisplayer()
  }

  productQuantityTracker()
  totalPrice()
}

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("cart-list-button")) {
    productListDisplayer()
  } else if (e.target.classList.contains("remove-product")) {
    removeProduct(e)
  }
})

function productQuantityTracker() {
  const products = document.querySelectorAll(".cart-item")

  let quantityOfProducts = []
  const reducer = (accumulator, currentValue) => accumulator + currentValue

  products.forEach((product) => {
    quantityOfProducts.push(
      Number(product.querySelector(".quantity").innerText.substring(1))
    )
  })

  quantityOfProducts = quantityOfProducts.reduce(reducer, 0)

  document.querySelector(".product-numbering").innerText = quantityOfProducts
}

function totalPrice() {
  const products = document.querySelectorAll(".cart-item")

  let quantityOfProducts = []
  const reducer = (accumulator, currentValue) => accumulator + currentValue

  products.forEach((product) => {
    quantityOfProducts.push(
      Number(
        product.querySelector(".total-product-price").innerText.substring(1)
      )
    )
  })

  quantityOfProducts = quantityOfProducts.reduce(reducer, 0)

  document.querySelector(
    ".grand-total-price"
  ).innerText = `$${quantityOfProducts}.00`
}

// let products = []
// productColor.forEach((productColor) => {
//   if (productColor === "Light Gray") {
//     productColor = "LightGray"
//   } else if (productColor === "Dark Gray") {
//     productColor = "DarkGray"
//   }

//   products.push(JSON.parse(sessionStorage.getItem(productColor)))
// })

// console.log(products)

// function addProductsToTheCart() {
//   products.forEach((product) => {
//     if (product != null) {
//       const template = document.getElementsByTagName("template")[0]
//       const element = template.content.cloneNode(true)
//       element.querySelector(".product-name-color").innerText = product.name
//       element.querySelector(".quantity").innerText = `x${product.quantity}`
//       element.querySelector(".object-cover").src = product.image
//       element.querySelector(".product-name-color").innerText = product.name
//       element.querySelector(".total-product-price").innerText =
//         product.totalPrice
//       element.querySelector(
//         ".base-price"
//       ).innerText = `$${product.basePrice}.00`

//       cartProductList.append(element)
//     }
//   })
// }

// addProductsToTheCart()

// cartProductList.addEventListener("click", (e) => {
//   if (e.target.classList.contains("absolute")) {
//     recalculateProduct(e)
//   }
// })

// function recalculateProduct(e) {
//   let quantity = Number(
//     e.target.parentElement.parentElement
//       .querySelector(".quantity")
//       .innerText.substring(1)
//   )

//   quantity -= 1

//   e.target.parentElement.parentElement.querySelector(
//     ".quantity"
//   ).innerText = `x${quantity}`

//   sessionStorage.removeItem(
//     e.target.parentElement.parentElement.querySelector(".product-name-color")
//       .innerText
//   )

//   let productPrice = Number(
//     e.target.parentElement.parentElement
//       .querySelector(".base-price")
//       .innerText.substring(1)
//   )

//   e.target.parentElement.parentElement.querySelector(
//     ".total-product-price"
//   ).innerText = `$${productPrice * quantity}.00`

//   const updatedProduct = {}
//   updatedProduct.basePrice = Number(
//     e.target.parentElement.parentElement
//       .querySelector(".base-price")
//       .innerText.substring(1)
//   )
//   updatedProduct.image =
//     e.target.parentElement.parentElement.querySelector("img").src
//   updatedProduct.name = e.target.parentElement.parentElement.querySelector(
//     ".product-name-color"
//   ).innerText
//   updatedProduct.quantity = Number(
//     e.target.parentElement.parentElement
//       .querySelector(".quantity")
//       .innerText.substring(1)
//   )
//   updatedProduct.totalProductPrice = Number(
//     e.target.parentElement.parentElement
//       .querySelector(".total-product-price")
//       .innerText.substring(1)
//   )

//   console.log(updatedProduct.totalProductPrice)

//   sessionStorage.setItem(
//     e.target.parentElement.parentElement.querySelector(".product-name-color")
//       .innerText,
//     JSON.stringify(updatedProduct)
//   )

//   if (quantity === 0) {
//     console.log("asd")

//     e.target.parentElement.parentElement.remove()

//     sessionStorage.removeItem(
//       e.target.parentElement.parentElement.querySelector(".product-name-color")
//         .innerText
//     )
//   }

//   cartViewController()
// }

// function cartViewController() {
//   if (cartProductList.querySelectorAll(".cart-item").length === 0) {
//     document.querySelector(".list-container").style.display = "none"
//   }
// }

// function cartShower() {
//   if (
//     cartProductList.querySelectorAll(".cart-item").length === 0 ||
//     cartButton.dataset.status === "show"
//   ) {
//     cartButton.dataset.status = "hide"
//     document.querySelector(".list-container").style.display = "none"
//   } else if (
//     cartButton.dataset.status === "hide" &&
//     cartProductList.children.length > 1
//   ) {
//     cartButton.dataset.status = "show"
//     document.querySelector(".list-container").style.display = "block"
//   }
// }

// cartShower()

// cartButton.addEventListener("click", (e) => {
//   cartShower()
// })
