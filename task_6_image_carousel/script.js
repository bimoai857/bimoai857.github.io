const imageSlide = document.getElementById("image-slide");
const leftIcon = document.getElementById("arrow-left");
const rightIcon = document.getElementById("arrow-right");
const slideIndicators = document.getElementById("slide-indicators");

const imageSlideWidth = imageSlide.offsetWidth;


const images = [
  {
    src: "./assets/img/one.jpg",
    alt: "Image 1",
  },
  {
    src: "./assets/img/three.jpg",
    alt: "Image 2",
  },
  {
    src: "./assets/img/four.jpg",
    alt: "Image 3",
  },

  

];

const imagesLength = images.length;
let currentImageIndex = 0;

const createImageSlide = (image) => {
  // Image Slide
  const figureElement = document.createElement("figure");
  figureElement.classList.add("image-slide__item");
  const imageElement = document.createElement("img");
  imageElement.src = image.src;
  imageElement.alt = image.alt;
  figureElement.appendChild(imageElement);
  imageSlide.appendChild(figureElement);
};

const createSlideIndicator = (index) => {

  const slideIndicator = document.createElement("div");
  slideIndicator.classList.add("slide-indicator");
  if (index === 0) {
    slideIndicator.classList.add("slide-indicator--active");
  }

  slideIndicator.addEventListener("click", () => slideToImage(index));
  slideIndicators.appendChild(slideIndicator);
};

for (let i = 0; i < imagesLength; i++) {
  createImageSlide(images[i]);
  createSlideIndicator(i);
}

function toNegativePX(value) {
  return `-${value}px`;
}

function toggleActiveSlideIndicator() {
  const currentImage = document.querySelector(".slide-indicator--active");
  currentImage.classList.remove("slide-indicator--active");
  slideIndicators.children[currentImageIndex].classList.add(
    "slide-indicator--active"
  );
}

function slideTOPreviousImage() {
  if (currentImageIndex > 0) {
    currentImageIndex--;
  } else {
    currentImageIndex = imagesLength - 1;
  }
  const leftValue = currentImageIndex * imageSlideWidth;
  imageSlide.style.left = toNegativePX(leftValue);

  toggleActiveSlideIndicator();
}

function slideToNextImage() {
  if (currentImageIndex < imagesLength - 1) {
    currentImageIndex++;
  } else {
    currentImageIndex = 0;
  }
  const leftValue = currentImageIndex * imageSlideWidth;
  imageSlide.style.left = toNegativePX(leftValue);

  toggleActiveSlideIndicator();
}

function slideToImage(index) {
  currentImageIndex = index;
  const leftValue = currentImageIndex * imageSlideWidth;
  imageSlide.style.left = toNegativePX(leftValue);

  toggleActiveSlideIndicator();
}

leftIcon.addEventListener("click", () => {
  slideTOPreviousImage();
});


rightIcon.addEventListener("click", () => {
  slideToNextImage();
});


setInterval(() => slideToNextImage(), 3000);
