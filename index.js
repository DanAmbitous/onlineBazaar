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
    let quantity = Number(
      e.target.parentElement.parentElement
        .querySelector(".quantity")
        .innerText.substring(1)
    )
    quantity -= 1

    e.target.parentElement.parentElement.querySelector(
      ".quantity"
    ).innerText = `x${quantity}`
  }
})
