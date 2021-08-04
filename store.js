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

  console.log(productContainer)

  const product = {}
  product.name = button.query
}
