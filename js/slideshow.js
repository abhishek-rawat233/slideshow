class Slideshow {
  constructor(selectors) {
    this.slideId = $(selectors.slideId);
    this.slides = this.slideId.find(selectors.slidesEle)
    this.slidesLength = this.slides.length;
    this.slideCounterId = selectors.slideCounterId;
    this.currentSlide = 0;
    this.startShow = this.startShow.bind(this);
    this.target = $(selectors.target);
  }

  addSlideCounter() {
    var counterText = '<h3>total slides: 3</h3><h3>Current Slide: <span id="slideCounter">1</span></h3>'
    $(counterText).insertAfter(this.slideId);
  }

  moveToTop() {
    this.target.prepend(this.slideId);
  }

  hideSlides() {
    this.slides.hide();
  }

  startShow() {
    this.slides.eq(this.currentSlide -1).fadeOut('slow', () => {
      if (this.currentSlide === this.slidesLength) {
        this.currentSlide = 0;
      }
      this.slides.eq(this.currentSlide).fadeIn('slow');
      $('#'+this.slideCounterId).text(this.currentSlide + 1);
      this.currentSlide++;
    });
    setTimeout(this.startShow, 3000);
  }

  init() {
    this.moveToTop();
    this.hideSlides();
    this.addSlideCounter();
    this.startShow();
  }
}

selectors = {
  slideId: '#slideshow',
  slidesEle: 'li',
  target: '#header',
  slideCounterId: 'slideCounter'
};

$(document).ready((new Slideshow(selectors)).init());
