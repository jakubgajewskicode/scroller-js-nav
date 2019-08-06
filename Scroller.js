class Scroller {
  constructor(rootSelector) {
    const rootElement = document.querySelector(rootSelector);
    this.sections = document.querySelectorAll('section');

    // Making an array from sections thanks to Array and slice * option 1
    // const sectionsArr = Array.prototype.slice.call(this.sections) 

    // options 2 
    const sectionsArr = [...this.sections]

    const currentSectionIndex = sectionsArr.findIndex(this.isScrolledIntoView);

    // option 1
    // this.currentSectionIndex = currentSectionIndex < 0 ? 0 : currentSectionIndex;

    // option 2 the same as before 
    this.currentSectionIndex = Math.max(currentSectionIndex, 0);

    this.drawNavigation();

    this.isThrottled = false;

    this.isScrolledIntoView(this.sections[0]);
  }
  // To move always to the first section
  isScrolledIntoView(el) {
    const rect = el.getBoundingClientRect();
    const elemTop = rect.top;
    const elemBottom = Math.floor(rect.bottom);


    const isVisiable = (elemTop >= 0) && (elemBottom <= window.innerHeight)
    return isVisiable;
  }
  // 1.
  listenScroll = (event) => {
    if (this.isThrottled) return;
    this.isThrottled = true;

    setTimeout(() => {
      this.isThrottled = false;
    }, 1000);
    const direction = event.wheelDelta < 0 ? 1 : -1;

    this.scroll(direction);
  }
  scroll = (direction) => {

    if (direction === 1) {
      const isLastSection = this.currentSectionIndex === this.sections.length - 1;
      if (isLastSection) return;

    } else if (direction === -1) {
      const firstSection = this.currentSectionIndex === 0;
      if (firstSection) return;

    }
    this.currentSectionIndex = this.currentSectionIndex + direction;
    this.scrollToCurrentSection();

  }
  scrollToCurrentSection() {
    this.selectActiveNavItem();
    this.sections[this.currentSectionIndex].scrollIntoView({
      behavior: "smooth",
      block: "start",


    })
  }
  drawNavigation = () => {
    this.naviagationContainer = document.createElement('aside');
    this.naviagationContainer.setAttribute('class', 'scroller__navigation')
    const list = document.createElement('ul');


    // index for eventListener - dots
    this.sections.forEach((section, index) => {
      const listItem = document.createElement('li');


      listItem.addEventListener('click', () => {
        this.currentSectionIndex = index;
        this.scrollToCurrentSection();
      })

      list.appendChild(listItem);
    })
    this.naviagationContainer.appendChild(list);

    document.body.appendChild(this.naviagationContainer);

    this.scrollToCurrentSection();


  }

  selectActiveNavItem = () => {
    if (this.naviagationContainer) {
      const navigationItems = this.naviagationContainer.querySelectorAll('li');

      navigationItems.forEach((item, index) => {
        if (index === this.currentSectionIndex) {
          item.classList.add('active');

        } else {
          item.classList.remove('active');
        }
      })
    }
  }

}