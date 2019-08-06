document.addEventListener('DOMContentLoaded', function () {
  const scroller = new Scroller('#root');

  // Changing for a 'wheel' to be able to open in firefox
  document.addEventListener('wheel', (event) => scroller.listenScroll(event))


})