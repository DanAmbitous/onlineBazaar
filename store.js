const buttons = document.querySelectorAll("button")

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

function productPacker(button) {
  const productContainer = button.closest(".w-full")

  const product = {}
  product.image = productContainer.querySelector("img").src
  product.name = productContainer.querySelector("h2").textContent
  product.price = Number(
    productContainer.querySelector("p").textContent.substring(1)
  )
  console.log(product)

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

  console.log(productNumbering)
}
