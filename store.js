{
  ;("plugins")
  ;["jsdom-quokka-plugin"]
}

const buttons = document.querySelectorAll("button")
const cartProductList = document.querySelector("#cart-product-list-container")
const cartButton = document.querySelector("#cart-button")
const products = Array.from(document.querySelectorAll(".p-4"))

cartShower()

buttons.forEach((button) => {
  if (button.innerText === "Add To Cart") {
    button.classList.add("add-to-cart-button")
  }
})

const productContainer = document
  .querySelector(".add-to-cart-button")
  .closest(".flex-wrap")

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("add-to-cart-button")) {
    productPacker(e.target)
  } else if (e.target.classList.contains("remove-product")) {
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

productColor.forEach((color, index) => {
  products[index].classList.add(color)
})

const productNumbering = {}
productColor.forEach((product) => {
  productNumbering[`${product}`] = 0
})

function productPacker(button) {
  if (button.classList.contains("add-to-cart-button")) {
    const productContainer = button.closest(".w-full")
    const product = {}
    product.image = productContainer.querySelector("img").src

    if (productContainer.querySelector("h2").textContent === "Light Gray") {
      product.name = "LightGray"
    } else if (
      productContainer.querySelector("h2").textContent === "Dark Gray"
    ) {
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

    cartAdder(product, productNumbering, null)
  } else {
    cartAdder(null, productNumbering, button)
  }
}

function cartAdder(product, productNumbering, button) {
  if (product != null) {
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

    totalPriceCalculator(product.price, false)

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

    // totalPrice(product.price, null, null, null)

    const numberOfProducts = []

    for (const [key, value] of Object.entries(productNumbering)) {
      numberOfProducts.push(value)

      const totalQuantityOfProducts = numberOfProducts.reduce(
        (sum, product) => sum + product,
        0
      )

      document.querySelector(".product-number").innerText =
        totalQuantityOfProducts
    }
  } else {
    let quantityOfProduct = Number(
      button.parentElement.parentElement
        .querySelector(".text-gray-600")
        .innerText.substring(1)
    )

    const productName =
      button.parentElement.parentElement.querySelector(".font-medium").innerText

    if (quantityOfProduct <= 1) {
      for (const key in productNumbering) {
        if (Object.hasOwnProperty.call(productNumbering, key)) {
          productNumbering[key] = 0
        }

        const productCost = Number(
          document
            .querySelector(`.${key}`)
            .querySelector(".mt-1")
            .innerText.substring(1)
        )

        console.log(productCost)

        totalPriceCalculator(productCost, true)

        cartShower()
        button.parentElement.parentElement.remove()

        // totalPrice(null, key, productCost, productNumbering)
      }
    } else {
      quantityOfProduct -= 1

      button.parentElement.parentElement.querySelector(
        ".text-gray-600"
      ).innerText = `x${quantityOfProduct}`

      for (const [key, value] of Object.entries(productNumbering)) {
        if (key === productName) {
          value = quantityOfProduct

          const totalProductCost =
            button.parentElement.parentElement.querySelector(
              ".total-product-price"
            )

          const productPrice = Number(
            document
              .querySelector(`.${key}`)
              .querySelector(".mt-1")
              .innerText.substring(1)
          )

          totalProductCost.innerText = `$${productPrice * quantityOfProduct}.00`

          for (const key in productNumbering) {
            if (Object.hasOwnProperty.call(productNumbering, key)) {
              if (key === productName) {
                productNumbering[key] = value
              }
            }
          }

          const productCost = Number(
            document
              .querySelector(`.${key}`)
              .querySelector(".mt-1")
              .innerText.substring(1)
          )
          console.log(productCost)
          totalPriceCalculator(productCost, true)

          // totalPrice(null, key, productCost, productNumbering)
        }
      }

      quantityOfProduct = Number(
        button.parentElement.parentElement
          .querySelector(".text-gray-600")
          .innerText.substring(1)
      )
    }
  }
}

const productPrices = []
function totalPriceCalculator(price, removal) {
  if (!removal) {
    console.log(price)

    productPrices.push(price)
    console.log(productPrices)
  } else {
    console.log(productPrices)
    const notMatchingCosts = productPrices.filter(
      (productPrice) => productPrice != price
    )
    const matchingCosts = productPrices.filter(
      (productPrice) => productPrice === price
    )

    matchingCosts.pop()

    productPrices.length = 0

    notMatchingCosts.forEach((notMatchingCost) => {
      productPrices.push(notMatchingCost)
    })

    matchingCosts.forEach((matchingCost) => {
      productPrices.push(matchingCost)
    })

    console.log(productPrices)

    console.log(productPrices, matchingCosts)
  }
}

// const productPrices = []
function totalPrice(productPrice, key, productCost, productNumbering) {
  if (key != null) {
    const numberOfProducts = []

    for (const [key, value] of Object.entries(productNumbering)) {
      numberOfProducts.push(value)

      const totalQuantityOfProducts = numberOfProducts.reduce(
        (sum, product) => sum + product,
        0
      )

      document.querySelector(".product-number").innerText =
        totalQuantityOfProducts
    }

    const found = productPrices.find(
      (productPrice) => productPrice === productCost
    )

    if (found) {
      productPrices.splice(productPrices.indexOf(found), 1)
      const totalPrice = productPrices.reduce((total, productsPrice) => {
        return total + productsPrice
      }, 0)

      // document.querySelector(".grand-total-price").innerText = "$" + totalPrice
    } else {
      console.log("false")

      const totalPrice = productPrices.reduce((total, productsPrice) => {
        return total + productsPrice
      }, 0)

      // console.log(productPrices, totalPrice)

      // document.querySelector(".grand-total-price").innerText = "$" + totalPrice
    }
  } else {
    productPrices.push(productPrice)
    console.log(productPrice + "asd")

    // const totalPrice = productPrices.reduce((total, productsPrice) => {
    //   return total + productsPrice
    // }, 0)

    // document.querySelector(".grand-total-price").innerText = "$" + totalPrice
  }
}

function cartShower() {
  if (
    cartProductList.children.length === 0 ||
    cartButton.dataset.status === "show"
  ) {
    cartButton.dataset.status = "hide"
    document.querySelector(".list-container").style.display = "none"
  } else if (cartButton.dataset.status === "hide") {
    cartButton.dataset.status = "show"
    document.querySelector(".list-container").style.display = "block"
  }
}

cartButton.addEventListener("click", (e) => {
  cartShower()
})
