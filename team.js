const cartProductList = document.querySelector("#cart-product-list-container")

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
  let data = sessionStorage.getItem(
    e.target.closest(".cart-item").querySelector(".product-name-color")
      .innerText
  )
  data = JSON.parse(data)

  const parentElment = e.target.closest(".cart-item")
  productNumbering[
    parentElment.querySelector(`.product-name-color`).innerText
  ] -= 1

  parentElment.querySelector(`.quantity`).innerText = `x${
    productNumbering[
      parentElment.querySelector(`.product-name-color`).innerText
    ]
  }`

  document.querySelector(".total-product-price").innerText = `$${
    productNumbering[
      parentElment.querySelector(`.product-name-color`).innerText
    ] * data.basePrice
  }.00`

  if (
    productNumbering[
      parentElment.querySelector(`.product-name-color`).innerText
    ] === 0
  ) {
    e.target.parentElement.parentElement.remove()
  }

  productQuantityTracker()
  totalPrice()
}

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove-product")) {
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
