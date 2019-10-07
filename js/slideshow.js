class Slideshow {
  constructor(slideId, slides, target) {
    this.slideId = $(slideId);
    this.slides = this.slideId.find(slides)
    this.slidesLength = this.slides.length;
    this.currentSlide = 0;
    this.startShow = this.startShow.bind(this);
    this.target = $(target);
  }

  addSlideCounter() {
    var counterText = '<h3>total slides: 3</h3><h3>Current Slide: <span id="slideNumber">1</span></h3>'
    $(counterText).insertAfter(this.slideId);
  }

  moveToTop() {
    this.target.prepend(this.slideId);
  }

  hideSlides() {
    this.slides.hide();
  }

  startShow() {
    this.slides.eq(this.currentSlide -1).fadeOut('slow', ()=>{
    if (this.currentSlide === 3) this.currentSlide = 0;
    this.slides.eq(this.currentSlide).fadeIn('slow');
    $('#slideNumber').text(this.currentSlide + 1);
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

(new Slideshow('#slideshow', 'li', '#header')).init();
