const buttons = document.querySelectorAll("button")
const cartProductList = document.querySelector("#cart-product-list-container")

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
  clone.querySelector("h2").innerText = product.name
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
      console.log(key, value)

      console.log(key)

      const products = Array.from(cartProductList.querySelectorAll(`.${key}`))
      console.log(products)
      const outdatedProducts = products.slice(0, -1)
      outdatedProducts.forEach((outdatedProduct) => {
        outdatedProduct.remove()
      })
    }
  }

  // const products = Array.from(cartProductList.querySelectorAll(".cart-item"))
  // products.forEach(product => {
  //   if (product.querySelector('h2').innerText)
  // });

  // const redProducts = Array.from(cartProductList.querySelectorAll(".Red"))
  // const outdatedRedProducts = redProducts.slice(0, -1)
  // outdatedRedProducts.forEach((outdatedRedProduct) => {
  //   outdatedRedProduct.remove()
  // })

  // const YellowProducts = Array.from(cartProductList.querySelectorAll(".Yellow"))
  // const outdatedYellowProducts = YellowProducts.slice(0, -1)
  // outdatedYellowProducts.forEach((outdatedYellowProduct) => {
  //   outdatedYellowProduct.remove()
  // })
}

// Number(
//   productName
//     .closest(".cart-item")
//     .querySelector(".ml-1")
//     .innerText.substring(1)
// )
