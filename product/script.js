const productName = document.querySelector("#product_name");
const price = document.querySelector("#product_price");
const description = document.querySelector("#product_description");
const img = document.querySelector("#product_img");
const deleteBtn = document.querySelector("#delete_btn");
const productWrapper = document.querySelector("#product_wrapper");

const fetchProductById = async () => {
  try {
    const url = new URL(window.location.href);
    const id = url.searchParams.get("productId");

    const response = await fetch(
      `https://67db075c1fd9e43fe473536b.mockapi.io/product/${id}`
    );

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const buildScreen = (data) => {
  productName.innerText = data.name;
  price.innerText = `${data.price} €`;
  description.innerText = data.description;
  img.src = data.imageUrl;
};

const startApp = async () => {
  const data = await fetchProductById();
  buildScreen(data);
};

startApp();

const deleteProductById = async () => {
  const url = new URL(window.location.href);
  const id = url.searchParams.get("productId");

  const response = await fetch(
    `https://67db075c1fd9e43fe473536b.mockapi.io/product/${id}`,
    { method: "DELETE" }
  );

  const data = await response.json();

  return data;
};

deleteBtn.addEventListener("click", async () => {
  const data = await deleteProductById();

  if (data) {
    const message = document.createElement("h3");
    message.setAttribute("class", "success");
    message.textContent = "Deleted";
    productWrapper.append(message);

    setTimeout(() => {
      document.location.href = "../index.html";
    }, 2000);
  }
});
