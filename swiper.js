class Swiper {
  constructor() {
    this.initalY = null;
    this.initalX = null;

    document.addEventListener('touchstart', (event) => this.startTouch(event));
    document.addEventListener('touchmove', (event) => this.moveTouch(event));

    this.events = {
      swipeUp: new Event('swipeUp'),
      swipeDown: new Event('swipeDown'),
      swipeLeft: new Event('swipeLeft'),
      swipeRight: new Event('swipeRight'),
    }

  }

  // To start
  startTouch(event) {
    event.preventDefault();
    console.log(event);
    this.initalX = event.touches[0].clientX;
    this.initalY = event.touches[0].clientY;
  }

  // To finish
  moveTouch(event) {
    if (!this.initalX || !this.initalY) return;

    const currentX = event.touches[0].clientX;
    const currentY = event.touches[0].clientY;


    const diffX = this.initalX - currentX;
    const diffY = this.initalY - currentY;

    console.log({
      diffX
    });
    console.log(diffY);

    // Horizontal 
    if (Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX > 0) {
        // left
        document.dispatchEvent(this.events.swipeLeft);
      } else {
        // right
        document.dispatchEvent(this.events.swipeRight);
      }
    }
    // Vertical V
    else {
      if (diffY > 0) {
        // up
        document.dispatchEvent(this.events.swipeUp);

      } else {
        // down
        document.dispatchEvent(this.events.swipeDown);
      }

    }

    this.initalX = null;
    this.initalY = null;


  }


}

new Swiper();