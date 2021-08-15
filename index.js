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

let products = []
productColor.forEach((productColor) => {
  if (productColor === "Light Gray") {
    productColor = "LightGray"
  } else if (productColor === "Dark Gray") {
    productColor = "DarkGray"
  }

  products.push(JSON.parse(sessionStorage.getItem(productColor)))
})

console.log(products)

function addProductsToTheCart() {
  products.forEach((product) => {
    if (product != null) {
      const template = document.getElementsByTagName("template")[0]
      const element = template.content.cloneNode(true)
      element.querySelector(".product-name-color").innerText = product.name
      element.querySelector(".quantity").innerText = `x${product.quantity}`
      element.querySelector(".object-cover").src = product.image
      element.querySelector(".product-name-color").innerText = product.name
      element.querySelector(".total-product-price").innerText =
        product.totalPrice
      element.querySelector(
        ".base-price"
      ).innerText = `$${product.basePrice}.00`

      cartProductList.append(element)
    }
  })
}

addProductsToTheCart()

cartProductList.addEventListener("click", (e) => {
  if (e.target.classList.contains("absolute")) {
    recalculateProduct(e)
  }
})

function recalculateProduct(e) {
  let quantity = Number(
    e.target.parentElement.parentElement
      .querySelector(".quantity")
      .innerText.substring(1)
  )

  quantity -= 1

  e.target.parentElement.parentElement.querySelector(
    ".quantity"
  ).innerText = `x${quantity}`

  sessionStorage.removeItem(
    e.target.parentElement.parentElement.querySelector(".product-name-color")
      .innerText
  )

  let productPrice = Number(
    e.target.parentElement.parentElement
      .querySelector(".base-price")
      .innerText.substring(1)
  )

  e.target.parentElement.parentElement.querySelector(
    ".total-product-price"
  ).innerText = `$${productPrice * quantity}.00`

  const updatedProduct = {}
  updatedProduct.basePrice = Number(
    e.target.parentElement.parentElement
      .querySelector(".base-price")
      .innerText.substring(1)
  )
  updatedProduct.image =
    e.target.parentElement.parentElement.querySelector("img").src
  updatedProduct.name = e.target.parentElement.parentElement.querySelector(
    ".product-name-color"
  ).innerText
  updatedProduct.quantity = Number(
    e.target.parentElement.parentElement
      .querySelector(".quantity")
      .innerText.substring(1)
  )
  updatedProduct.totalProductPrice = Number(
    e.target.parentElement.parentElement
      .querySelector(".total-product-price")
      .innerText.substring(1)
  )

  console.log(updatedProduct.totalProductPrice)

  sessionStorage.setItem(
    e.target.parentElement.parentElement.querySelector(".product-name-color")
      .innerText,
    JSON.stringify(updatedProduct)
  )

  if (quantity === 0) {
    console.log("asd")

    e.target.parentElement.parentElement.remove()

    sessionStorage.removeItem(
      e.target.parentElement.parentElement.querySelector(".product-name-color")
        .innerText
    )
  }

  cartViewController()
}

function cartViewController() {
  if (cartProductList.querySelectorAll(".cart-item").length === 0) {
    document.querySelector(".list-container").style.display = "none"
  }
}

function cartShower() {
  if (
    cartProductList.querySelectorAll(".cart-item").length === 0 ||
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

cartShower()

cartButton.addEventListener("click", (e) => {
  cartShower()
})
