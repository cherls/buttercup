class ImageDrifter {
  constructor(img) {
    this.img = img;
    this.offsetTop = 0;
    this.offsetLeft = 0;
    this.movingDown = true;
    this.movingRight = true;

    this.resizeImage();  
    this.setDimensions();
    this.startDrift();
    
    window.addEventListener("resize", () => this.resizeImage());  
  }  
  
  resizeImage() {  
    const aspectRatio = this.img.naturalWidth / this.img.naturalHeight;  
    const windowRatio = window.innerWidth / window.innerHeight;  
      
    if (windowRatio > aspectRatio) {  
      this.img.style.width = "auto";  
      this.img.style.height = `${window.innerHeight * 0.5}px`; // Ensuring a margin  
    } else {  
      this.img.style.width = `${window.innerWidth * 0.2}px`;  // Ensuring a margin  
      this.img.style.height = "auto";  
    }  
  
    this.setDimensions(); // Update the image dimensions  
  }  
  
  setDimensions() {  
    this.imageWidth = this.img.offsetWidth;  
    this.imageHeight = this.img.offsetHeight;  
    this.windowWidth = window.innerWidth;  
    this.windowHeight = window.innerHeight;  
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
    this.offsetTop += this.movingDown ? 2 : -2;
    this.offsetLeft += this.movingRight ? 2 : -2;
  }

  checkBounds() {
    if (this.offsetTop + this.imageHeight >= this.windowHeight || this.offsetTop <= 0) {
      this.movingDown = !this.movingDown;
    }
    if (this.offsetLeft + this.imageWidth >= this.windowWidth || this.offsetLeft <= 0) {
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
