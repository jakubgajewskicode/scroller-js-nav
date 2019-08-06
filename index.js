document.addEventListener('DOMContentLoaded', function () {
  const scroller = new Scroller('#root');

  // Changing for a 'wheel' to be able to open in firefox
  document.addEventListener('wheel', (event) => scroller.listenScroll(event));

  document.addEventListener('swipeUp', () => scroller.scroll(1));
  document.addEventListener('swipeDown', () => scroller.scroll(-1));



})