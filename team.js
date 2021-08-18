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
    console.log(data)

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
      console.log(productNumbering[data.name])
      clone.querySelector(".total-product-price").innerText = `$${
        data.quantity * data.price
      }.00`

      cartProductList.append(clone)
    }
  })
}

getProducts()
