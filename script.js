const wrapper = document.querySelector("#wrapper");
const productWrapper = document.querySelector("#product_wrapper");

const fetchData = async () => {
  try {
    const response = await fetch(
      "https://67db075c1fd9e43fe473536b.mockapi.io/product"
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const buildCards = (items) => {
  items.forEach((item) => {
    const card = document.createElement("a");
    card.setAttribute("class", "card");
    card.href = `product/index.html?productId=${item.id}`;

    const img = document.createElement("img");
    img.src = item.imageUrl;

    const price = document.createElement("p");
    price.textContent = `${item.price} €`;

    const productName = document.createElement("h3");
    productName.textContent = item.name;

    card.append(img);
    card.append(price);
    card.append(productName);
    productWrapper.append(card);
  });
};

const startAplication = async () => {
  const products = await fetchData();
  const sortedProducts = products.sort((a, b) => a.price - b.price);

  buildCards(sortedProducts);
};

startAplication();
