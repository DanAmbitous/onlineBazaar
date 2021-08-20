const cartProductList = document.querySelector("#cart-product-list-container")
const productContainer = document.querySelector(".list-container")

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
  productColor.forEach((color) => {
    let data = sessionStorage.getItem(color)
    data = JSON.parse(data)

    if (data != null) {
      for (const [key, value] of Object.entries(productNumbering)) {
        if (key === data.name) {
          productNumbering[key] = data.quantity
        }
      }

      const template = document.getElementsByTagName("template")[0]
      const clone = template.content.cloneNode(true)
      clone.querySelector(".cart-item").classList.add(data.name)
      clone.querySelector(".product-name-color").innerText = data.name
      clone.querySelector("img").src = data.image
      clone.querySelector(".quantity").innerText = `x${
        productNumbering[data.name]
      }`
      clone.querySelector(".total-product-price").innerText = `$${
        data.quantity * data.price
      }.00`

      cartProductList.append(clone)
    }
  })

  productQuantityTracker()
  totalPrice()
}

getProducts()

function removeProduct(e) {
  if (e.shiftKey) {
    const product = e.target.parentElement.parentElement

    productNumbering[product.querySelector(`.product-name-color`).innerText] = 0

    sessionStorage.removeItem(
      product.querySelector(".product-name-color").innerText
    )

    product.remove()
  } else {
    let data = sessionStorage.getItem(
      e.target.closest(".cart-item").querySelector(".product-name-color")
        .innerText
    )
    data = JSON.parse(data)

    const parentElement = e.target.closest(".cart-item")
    productNumbering[
      parentElement.querySelector(`.product-name-color`).innerText
    ] -= 1

    parentElement.querySelector(`.quantity`).innerText = `x${
      productNumbering[
        parentElement.querySelector(`.product-name-color`).innerText
      ]
    }`

    document.querySelector(".total-product-price").innerText = `$${
      productNumbering[
        parentElement.querySelector(`.product-name-color`).innerText
      ] * data.basePrice
    }.00`

    data.quantity =
      productNumbering[
        parentElement.querySelector(`.product-name-color`).innerText
      ]

    sessionStorage.setItem(
      parentElement.querySelector(`.product-name-color`).innerText,
      JSON.stringify(data)
    )

    if (
      productNumbering[
        parentElement.querySelector(`.product-name-color`).innerText
      ] === 0
    ) {
      sessionStorage.removeItem(
        parentElement.querySelector(`.product-name-color`).innerText
      )

      e.target.parentElement.parentElement.remove()
    }
  }

  productQuantityTracker()
  totalPrice()
  productListDisplayer()
}

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove-product")) {
    removeProduct(e)
  }
})

function productListDisplayer() {
  const products = cartProductList.querySelectorAll(".cart-item")
  if (products.length === 0) {
    document.querySelector("#cart-button").dataset.status = "hide"
    productContainer.style.display = "none"
  } else if (document.querySelector("#cart-button").dataset.status === "hide") {
    document.querySelector("#cart-button").dataset.status = "show"

    productContainer.style.display = "block"
  }
}

function manualProductListToggler(e) {
  if (e.target.dataset.status === "show") {
    productContainer.style.display = "none"
    e.target.dataset.status = "hide"
  } else {
    productContainer.style.display = "block"
    e.target.dataset.status = "show"
  }

  productListDisplayer()
}

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("cart-button")) {
    console.log("hi -1")
    manualProductListToggler(e)
  } else if (e.target.id === "remove-all-products") {
    const products = document.querySelectorAll(".cart-item")
    console.log(productNumbering)

    productColor.forEach((color) => {
      productNumbering[color] = 0
    })

    products.forEach((product) => {
      product.remove()
    })

    console.log(productNumbering)

    productQuantityTracker()
    totalPrice()
    manualProductListToggler(e)
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

  document.querySelector(".product-number").innerText = quantityOfProducts
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
