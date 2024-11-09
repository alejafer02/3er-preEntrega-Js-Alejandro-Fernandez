// Array para almacenar los productos
let products = [];

// Clase para crear objetos Producto
class Product {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }
}

// Cargar productos del Local Storage al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  loadProductsFromStorage();
  displayProducts(products);
});

// Agregar eventos de clic
document.getElementById("addProductButton").addEventListener("click", addProduct);
document.getElementById("searchButton").addEventListener("click", searchProduct);

// Función para agregar un nuevo producto al array y al Storage
function addProduct() {
  const name = document.getElementById("productName").value;
  const price = parseFloat(document.getElementById("productPrice").value);

  // Validación simple
  if (!name || isNaN(price)) {
    alert("Por favor, ingresa un nombre y un precio válidos.");
    return;
  }

  // Crear y agregar el producto al array
  const newProduct = new Product(name, price);
  products.push(newProduct);

  // Guardar productos en el Local Storage
  saveProductsToStorage();

  // Actualizar la lista en el HTML
  displayProducts(products);

  // Limpiar los campos de entrada
  document.getElementById("productName").value = "";
  document.getElementById("productPrice").value = "";
}

// Función para mostrar los productos en el HTML
function displayProducts(productList) {
  const productsContainer = document.getElementById("productsContainer");
  productsContainer.innerHTML = ""; // Limpiar la lista

  productList.forEach((product) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${product.name} - $${product.price.toFixed(2)}`;
    productsContainer.appendChild(listItem);
  });
}

// Función para buscar un producto en el array
function searchProduct() {
  const query = document.getElementById("searchQuery").value.toLowerCase();

  // Filtrar los productos que coincidan con la consulta
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(query)
  );

  // Mostrar productos filtrados
  displayProducts(filteredProducts);
}

// Función para guardar productos en el Local Storage
function saveProductsToStorage() {
  localStorage.setItem("products", JSON.stringify(products));
}

// Función para cargar productos desde el Local Storage
function loadProductsFromStorage() {
  const storedProducts = localStorage.getItem("products");
  if (storedProducts) {
    products = JSON.parse(storedProducts);
  }
}
