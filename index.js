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

productColor.forEach((productColor) => {
  if (productColor === "Light Gray") {
    productColor = "LightGray"
  } else if (productColor === "Dark Gray") {
    productColor = "DarkGray"
  }

  console.log(sessionStorage.getItem(productColor))
})
