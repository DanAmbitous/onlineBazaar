const buttons = document.querySelectorAll("button")
const cartProductList = document.querySelector("#cart-product-list-container")
const cartButton = document.querySelector("#cart-button")

// cartChecker()

buttons.forEach((button) => {
  if (button.innerText === "Add To Cart") {
    button.classList.add("add-to-cart-button")
  }
})

const productContainer = document
  .querySelector(".add-to-cart-button")
  .closest(".flex-wrap")

productContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("add-to-cart-button")) {
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
const productNumbering = {}
productColor.forEach((product) => {
  productNumbering[`${product}`] = 0
})

function productPacker(button) {
  const productContainer = button.closest(".w-full")

  const product = {}
  product.image = productContainer.querySelector("img").src

  if (productContainer.querySelector("h2").textContent === "Light Gray") {
    product.name = "LightGray"
  } else if (productContainer.querySelector("h2").textContent === "Dark Gray") {
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

  cartAdder(product, productNumbering)
}

function cartAdder(product, productNumbering) {
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

  clone.querySelector("span").innerHTML = "x" + product.quantity
  clone.querySelector(".total-product-price").innerText =
    "$" + product.price + ".00"

  if (product.name === "Light Gray") {
    product.name = "LightGray"
    clone.querySelector(".cart-item").classList.add(product.name)
  } else if (product.name === "Dark Gray") {
    product.name = "DarkGray"
    clone.querySelector(".cart-item").classList.add(product.name)
  } else {
    clone.querySelector(".cart-item").classList.add(product.name)
  }

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

  for (const [key, value] of Object.entries(productNumbering)) {
    if (value > 1) {
      const products = Array.from(cartProductList.querySelectorAll(`.${key}`))
      const outdatedProducts = products.slice(0, -1)
      outdatedProducts.forEach((outdatedProduct) => {
        outdatedProduct.remove()
      })
    }
  }

  totalPrice(product.price)
}

const productPrices = []

function totalPrice(productPrice) {
  productPrices.push(productPrice)

  const totalPrice = productPrices.reduce((total, productsPrice) => {
    return total + productsPrice
  }, 0)

  document.querySelector(".grand-total-price").innerText = "$" + totalPrice
}

function cartChecker() {
  if (cartButton.dataset.status === "show") {
    cartButton.dataset.status = "hide"
    document.querySelector(".list-container").style.display = "none"
  } else if (cartButton.dataset.status === "hide") {
    cartButton.dataset.status = "show"
    document.querySelector(".list-container").style.display = "block"
  }
}

cartButton.addEventListener("click", (e) => {
  console.log("hi")
  cartChecker()
})
