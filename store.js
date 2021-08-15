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

// document.addEventListener("click", (e) => {
//   if (e.target.classList.contains("add-to-cart-button")) {
//     productPacker(e.target)
//   } else if (e.target.classList.contains("remove-product")) {
//     productRemoval(e)
//   } else if (e.target.id === "remove-all-products") {
//   }
// })

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

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("add-to-cart-button")) {
    addProduct(e)
  }
})

function addProduct(e) {
  const product = {}
  product.name = e.target
    .closest(".product-container")
    .querySelector("h2").innerText
  console.log(product)
}

function productRemoval(e) {
  productColor.forEach((color) => {
    let data = JSON.parse(sessionStorage.getItem(color))

    if (data != null) {
      const product = e.target.parentElement.parentElement

      let quantity = Number(
        product.querySelector(".quantity").innerText.substring(1) - 1
      )

      if (quantity != 0) {
        product.querySelector(".quantity").innerText = `x${quantity}`

        product.querySelector(".total-product-price").innerText = `$${
          quantity * data.basePrice
        }.00`

        addToStorage(product)
      } else {
        product.remove()
      }
    }
  })
}

function addToStorage(product) {}

productColor.forEach((color, index) => {
  products[index].classList.add(color)
  products[index].classList.add("product-container")
})

const productNumbering = {}
productColor.forEach((product) => {
  productNumbering[`${product}`] = 0
})

productColor.forEach((color) => {
  let product = sessionStorage.getItem(color)
  product = JSON.parse(product)

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
    clone.querySelector(".total-product-price").innerText = product.totalPrice

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
      if (key === product.name) {
        productNumbering[key] = product.quantity
      }
    }

    cartProductList.append(clone)

    calculateNumberOfProducts()
  }
})

function productPacker(button, event) {
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
    cartAdder(null, productNumbering, button, event)
  }
}

// const anEnumerationOfProducts = []
function cartAdder(product, productNumbering, button, event) {
  if (product != null) {
    productColor.forEach((color) => {
      let products = document.querySelectorAll(color)
      if (products != null) {
      } else {
      }

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

      let totalPrice = product.quantity * product.basePrice

      clone.querySelector(".total-product-price").innerText =
        "$" + totalPrice + ".00"

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
    })

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

    grandTotalPriceDeterminer(button)

    product.totalPrice = cartProductList
      .querySelector(`.${product.name}`)
      .querySelector(".total-product-price").innerText

    product.basePrice = Number(
      document
        .querySelector(`.${product.name}`)
        .querySelector(".mt-1")
        .innerText.substring(1)
    )

    sessionStorage.setItem(product.name, JSON.stringify(product))
  } else {
    if (!event.shiftKey && event.target.id !== "remove-all-products") {
    } else if (event.target.id === "remove-all-products") {
    } else {
      const productName =
        button.parentElement.parentElement.querySelector(
          ".text-gray-900"
        ).innerText
      if (productName === "Light Gray") {
        productName = "LightGray"
      } else if (productName === "Dark Gray") {
        productName = "DarkGray"
      }

      for (const [key, value] of Object.entries(productNumbering)) {
        if (key === productName) {
          value = 0

          productNumbering[key] = value
        }
      }

      quantityOfProductsDeterminer(productNumbering, button)

      // grandTotalPriceDeterminer(button)

      storeTheListOfProducts()
    }
  }

  let products = []
  productColor.forEach((productColor) => {
    if (productColor === "Light Gray") {
      productColor = "LightGray"
    } else if (productColor === "Dark Gray") {
      productColor = "DarkGray"
    }

    products.push(JSON.parse(sessionStorage.getItem(productColor)))
  })
}

function storeTheListOfProducts(product) {
  const products = document.querySelectorAll(".cart-item")
  products.forEach((theProduct) => {
    sessionStorage.setItem(
      theProduct.querySelector(".product-name-color").innerText,
      JSON.stringify(product)
    )
  })
}

let prices = []
function grandTotalPriceDeterminer() {
  const products = document.querySelectorAll(".cart-item")

  products.forEach((product) => {})

  // console.log(button)
  // const productColor = button.parentElement.parentElement.querySelector(
  //   ".product-name-color"
  // )
  // console.log(productColor)
  // if (button != null) {
  //   if (!button.id === "remove-all-products") {
  //     if (
  //       Number(
  //         button.parentElement.parentElement
  //           .querySelector(".quantity")
  //           .innerText.substring(1)
  //       ) < 1
  //     ) {
  //       button.parentElement.parentElement.remove()
  //     }
  //   } else if (button.id === "remove-all-products") {
  //     const listProducts = cartProductList.querySelectorAll(".cart-item")

  //     listProducts.forEach((product) => {
  //       product.remove()
  //     })
  //   }
  // }
  // const allPrices = cartProductList.querySelectorAll(".total-product-price")
  // prices = []

  // allPrices.forEach((price) => {
  //   prices.push(Number(price.innerText.substring(1)))
  // })

  // const totalPrice = prices.reduce((sum, value) => (sum += value), 0)

  // let data = sessionStorage.getItem("key")

  // document.querySelector(".grand-total-price").innerText = `$${totalPrice}.00`
}

function quantityOfProductsDeterminer(productNumbering, button) {
  if (!button != null) {
    let productQuantity = 0
    for (const [key, value] of Object.entries(productNumbering)) {
      productQuantity += value
    }

    if (productQuantity === 0) {
      document.querySelector(".product-number").innerText = productQuantity
      if (
        !button.parentElement.parentElement.classList.contains("list-container")
      ) {
        button.parentElement.parentElement.remove()
        cartShower()
      } else {
        // grandTotalPriceDeterminer(button)
        cartShower()
      }
    } else {
      document.querySelector(".product-number").innerText = productQuantity
    }
  } else {
  }
}

function productListShower() {
  let products = cartProductList.querySelectorAll(".cart-product")

  if (products.length === 0) {
    document.querySelector(".list-container").style.display = "none"
  }
}

productListShower()

function cartShower() {
  if (
    cartProductList.children.length === 0 ||
    cartButton.dataset.status === "show"
  ) {
    cartButton.dataset.status = "hide"
    document.querySelector(".list-container").style.display = "none"
  } else if (
    cartButton.dataset.status === "hide" &&
    cartProductList.children.length > 1
  ) {
    cartButton.dataset.status = "show"
    document.querySelector(".list-container").style.display = "block"
  }
}

cartButton.addEventListener("click", (e) => {
  cartShower()
})

function calculateNumberOfProducts() {
  const products = document.querySelectorAll(".quantity")
  const productAmountDisplayer = document.querySelector(".product-number")

  let i = 0

  products.forEach((product) => {
    productAmountDisplayer.innerText = Number(product.innerText.substring(1))
  })
}
