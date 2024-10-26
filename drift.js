class ImageDrifter {
    constructor(img) {
      this.img = img;
      this.offsetTop = 0;
      this.offsetLeft = 0;
      this.movingDown = true;
      this.movingRight = true;
  
      this.imageWidth = img.offsetWidth;
      this.imageHeight = img.offsetHeight;
      this.windowWidth = window.innerWidth;
      this.windowHeight = window.innerHeight;
  
      console.log(
        `${this.img.alt} is: ${this.imageWidth}px x ${this.imageHeight}px`,
      );
      console.log("READY");
  
      this.img.addEventListener("click", () => this.startDrift());
    }
  
    startDrift() {
      console.log("DRIFT");
      this.drift();
    }
  
    drift() {
      this.updatePosition();
      this.checkBounds();
      this.applyTransform();
  
      requestAnimationFrame(() => this.drift());
    }
  
    updatePosition() {
      this.offsetTop += this.movingDown ? 4 : -4;
      this.offsetLeft += this.movingRight ? 4 : -4;
    }
  
    checkBounds() {
      if (
        this.offsetTop + this.imageHeight >= this.windowHeight ||
        this.offsetTop <= 0
      ) {
        this.movingDown = !this.movingDown;
      }
      if (
        this.offsetLeft + this.imageWidth >= this.windowWidth ||
        this.offsetLeft <= 0
      ) {
        this.movingRight = !this.movingRight;
      }
    }
  
    applyTransform() {
      this.img.style.transform = `translate(${this.offsetLeft}px, ${this.offsetTop}px)`;
    }
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    const imgElement = document.querySelector("img");
    if (imgElement) {
      new ImageDrifter(imgElement);
    }
  });