const productGrid = document.querySelector("#productGrid");
const searchInput = document.querySelector("#searchInput");
const addSampleBtn = document.querySelector("#addSampleBtn");
const fallbackImage =
  "https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=900&q=80";

const catalogProducts = [
  {
    title: "Portable Bluetooth Speaker",
    description: "Compact design with deep bass and water-resistant build.",
    price: "$89.00",
    image:
      "https://images.unsplash.com/photo-1589003077984-894e133dabab?auto=format&fit=crop&w=900&q=80",
    alt: "Portable speaker"
  },
  {
    title: "Noise-Canceling Earbuds",
    description: "Crystal-clear calls and immersive sound with adaptive ANC.",
    price: "$139.00",
    image:
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=900&q=80",
    alt: "Wireless earbuds"
  },
  {
    title: "Minimal Desk Lamp",
    description: "Soft warm light and modern design for home-office setups.",
    price: "$64.50",
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=80",
    alt: "Desk lamp"
  },
  {
    title: "Wireless Charging Stand",
    description: "Fast charging with stable support for portrait and landscape use.",
    price: "$39.90",
    image:
      "https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=900&q=80",
    alt: "Wireless charging stand"
  },
  {
    title: "4K Streaming Device",
    description: "Smooth playback, voice remote, and quick setup for any TV.",
    price: "$69.00",
    image:
      "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=900&q=80",
    alt: "Streaming device and remote"
  },
  {
    title: "Smart Home Camera",
    description: "1080p video, night vision, and instant alerts on motion detection.",
    price: "$79.99",
    image:
      "https://unsplash.com/photos/a-camera-mounted-to-the-side-of-a-door-H_T8GaFGEjY?auto=format&fit=crop&w=900&q=80",
    alt: "Indoor smart camera"
  },
  {
    title: "Portable SSD 1TB",
    description: "High-speed storage for backups, media files, and project assets.",
    price: "$119.00",
    image:
      "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=900&q=80",
    alt: "Portable SSD drive"
  },
  {
    title: "Mechanical Keyboard",
    description: "Tactile switches, compact layout, and white backlight.",
    price: "$99.00",
    image:
      "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&w=900&q=80",
    alt: "Mechanical keyboard"
  },
  {
    title: "Webcam Full HD",
    description: "Clear 1080p image, built-in microphone, and easy clip mount.",
    price: "$49.50",
    image:
      "https://images.unsplash.com/photo-1623949556303-b0d17d198863?auto=format&fit=crop&w=900&q=80",
    alt: "Desktop webcam"
  },
  {
    title: "USB-C Hub 7-in-1",
    description: "Expand connectivity with HDMI, USB-A, USB-C and SD card support.",
    price: "$34.75",
    image:
      "https://images.unsplash.com/photo-1625842268584-8f3296236761?auto=format&fit=crop&w=900&q=80",
    alt: "USB-C hub adapter"
  },
  {
    title: "Gaming Mouse",
    description: "Precision sensor, ergonomic shape, and customizable side buttons.",
    price: "$44.90",
    image:
      "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=900&q=80",
    alt: "Gaming mouse"
  }
];

let productPool = shuffleProducts(catalogProducts);
let nextProductIndex = 0;

function shuffleProducts(products) {
  const copy = [...products];

  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy;
}

function createProductCard(product) {
  const card = document.createElement("article");
  card.className = "product-card";
  card.dataset.title = product.title;

  card.innerHTML = `
    <img src="${product.image}" alt="${product.alt}" loading="lazy" />
    <div class="product-content">
      <div class="title-row">
        <h2 class="product-title">${product.title}</h2>
        <p class="product-price">${product.price}</p>
      </div>
      <p class="product-description">${product.description}</p>
      <button class="add-to-cart-btn" type="button">Add to Cart</button>
    </div>
  `;

  const image = card.querySelector("img");
  image.addEventListener("error", () => {
    image.src = fallbackImage;
  });

  return card;
}

function applyFilter(term) {
  const normalized = term.trim().toLowerCase();
  const cards = productGrid.querySelectorAll(".product-card");

  cards.forEach((card) => {
    const title = (card.dataset.title || "").toLowerCase();
    const matches = title.includes(normalized);
    card.classList.toggle("is-hidden", !matches);
  });
}

productGrid.addEventListener("click", (event) => {
  const button = event.target.closest(".add-to-cart-btn");
  if (!button) {
    return;
  }

  const card = button.closest(".product-card");
  const added = card.classList.toggle("is-added");
  button.textContent = added ? "Added" : "Add to Cart";
});

searchInput.addEventListener("input", (event) => {
  applyFilter(event.target.value);
});

addSampleBtn.addEventListener("click", () => {
  if (nextProductIndex >= productPool.length) {
    productPool = shuffleProducts(catalogProducts);
    nextProductIndex = 0;
  }

  const product = productPool[nextProductIndex];
  const card = createProductCard(product);

  productGrid.appendChild(card);
  nextProductIndex += 1;

  applyFilter(searchInput.value);
});
