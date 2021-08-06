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
  "Light Gray",
  "Dark Gray",
]
const productNumbering = {}
productColor.forEach((product) => {
  productNumbering[`${product}`] = 0
})

function productPacker(button) {
  const productContainer = button.closest(".w-full")

  const product = {}
  product.image = productContainer.querySelector("img").src
  product.name = productContainer.querySelector("h2").textContent
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
  clone.querySelector(".cart-item").classList.add(product.name)

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

  const redProducts = Array.from(cartProductList.querySelectorAll(".Red"))
  const outdatedRedProducts = redProducts.slice(0, -1)
  outdatedRedProducts.forEach((outdatedRedProduct) => {
    outdatedRedProduct.remove()
  })
}

// Number(
//   productName
//     .closest(".cart-item")
//     .querySelector(".ml-1")
//     .innerText.substring(1)
// )
