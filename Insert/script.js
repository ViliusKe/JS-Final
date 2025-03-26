const wrapper = document.querySelector("#wrapper");
const formWrapper = document.querySelector(".form_wrapper");

const submitBtn = document.querySelector("#submit_btn");
const productName = document.querySelector("#name_input");
const price = document.querySelector("#price_input");
const imgUrl = document.querySelector("#imgUrl_input");
const description = document.querySelector("#description_input");
const city = document.querySelector("#city_input");

const failedMessage = (message) => {
  const failMessage = document.createElement("h3");
  failMessage.setAttribute("class", "failMessage");
  failMessage.textContent = message;
  formWrapper.append(failMessage);
};

const insertProduct = async (data) => {
  try {
    const response = await fetch(
      "https://67db075c1fd9e43fe473536b.mockapi.io/product",
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      }
    );

    return response;
  } catch (error) {
    console.log(error);
  }
};

submitBtn.addEventListener("click", async () => {
  if (
    !productName.value ||
    !price.value ||
    !imgUrl.value ||
    !description.value ||
    !city.value
  ) {
    failedMessage("One of the fields is empty");

    return;
  }

  const priceRegex = /^"?[-+]?\d*\.?\d+"?$/;

  if (!priceRegex.test(price.value)) {
    failedMessage("Price must be a number");

    return;
  }

  const product = {
    name: productName.value,
    price: price.value,
    imageUrl: imgUrl.value,
    description: description.value,
    location: city.value,
  };

  const response = await insertProduct(product);

  if (response.status === 201) {
    const successMessage = document.createElement("h3");
    successMessage.setAttribute("class", "successMessage");
    successMessage.textContent = "Data sent successfully";
    formWrapper.append(successMessage);

    setTimeout(() => {
      document.location.href = "../index.html";
    }, 2000);
  }

  productName.value = "";
  price.value = "";
  imgUrl.value = "";
  description.value = "";
  city.value = "";
});
