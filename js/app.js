var carouselCount = 0;
const carouselDom = document.querySelector(".carousel");
function changeCarousel(rotationUp = true) {
  if (rotationUp) {
    carouselCount++;
  } else {
    carouselCount--;
  }
  carouselDom.style.transform = `translateZ(-${angle}px) rotateX(${
    (carouselCount / 3) * -360
  }deg)`;
}

const buttonDomPreList = document.querySelectorAll(".pre-button");
const buttonDomNextList = document.querySelectorAll(".next-button");
buttonDomPreList.forEach((buttonDomPre) => {
  buttonDomPre.addEventListener("click", changeCarousel);
});
buttonDomNextList.forEach((buttonDomNext) => {
  buttonDomNext.addEventListener("click", () => {
    changeCarousel(false);
  });
});

var carouselCells = document.querySelectorAll(".carousel-cell");
var cellSize = parseInt(getComputedStyle(carouselCells[0]).height, 10);
var angle = Math.round(cellSize / 2 / Math.tan(Math.PI / 3));
function adjustZ() {
  for (let i = 0; i < carouselCells.length; i++) {
    let cell = carouselCells[i];
    let cellAngle = -120 * i;
    cell.style.transform = `rotateX(${cellAngle}deg) translateZ(${angle}px)`;
  }

  carouselDom.style.transform = `translateZ(-${angle}px)`;
}

const navbarList = [
  document.querySelector("a[href='#welcome-section']"),
  document.querySelector("a[href='#projects']"),
  document.querySelector("a[href='#profiles']"),
];
var currentCarousel = 0;
navbarList.forEach((navbarItem) => {
  navbarItem.addEventListener("click", (e) => {
    let CarouselList;
    if (carouselCount > 0) {
      CarouselList = [0, 2, 1];
    } else {
      CarouselList = [0, 1, 2];
    }
    currentCarousel = Math.abs(carouselCount % 3);
    let expectedCarousel;
    switch (e.target.hash) {
      case "#welcome-section":
        expectedCarousel = CarouselList[0];
        break;
      case "#projects":
        expectedCarousel = CarouselList[1];
        break;
      case "#profiles":
        expectedCarousel = CarouselList[2];
        break;
    }
    if (currentCarousel != expectedCarousel) {
      if (
        (CarouselList.indexOf(currentCarousel) + 1) % 3 ==
        CarouselList.indexOf(expectedCarousel)
      ) {
        changeCarousel(false);
      } else {
        changeCarousel();
      }
    }
  });
});

if (!window.matchMedia("(max-width: 768px)").matches) {
  window.addEventListener("wheel", (e) => {
    e.deltaY < 0 ? changeCarousel() : changeCarousel(false);
  });
}

adjustZ();
