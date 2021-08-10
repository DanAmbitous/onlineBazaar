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

addProductsToTheCart()

function addProductsToTheCart() {
  const template = document.getElementsByTagName("template")[0]
  const element = template.content.cloneNode(true)

  products.forEach((product) => {
    element.querySelector(".product-name-color").innerText = product.name
    element.querySelector(".object-cover").src = product.image
    element.querySelector(".product-name-color").innerText = product.name

    cartProductList.append(element)
  })
}
