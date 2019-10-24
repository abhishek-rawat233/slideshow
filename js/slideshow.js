class Slideshow {
  constructor(selectors) {
    this.slideId = $(selectors.slideId);
    this.slides = this.slideId.find(selectors.slidesEle);
    this.slidesLength = this.slides.length;
    this.slideCounterId = selectors.slideCounterId;
    this.currentSlide = 0;
    this.slideChangeTime = selectors.slideChangeTime;
    this.startShow = this.startShow.bind(this);
    this.target = $(selectors.target);
  }

  addSlideCounter() {
    var counterTextAttr = {
      firstHeadingAttr : {
        text : `Total Slides: ${this.slidesLength}`
      },
      secondHeadingAttr: {
        text : 'Current Slide: '
      },
      spanAttr : {
        id : this.slideCounterId,
        text : this.currentSlide + 1
      }
    }

    var counterText = $('<h3 />', counterTextAttr.firstHeadingAttr)
      .add($('<h3 />', counterTextAttr.secondHeadingAttr)
        .append($('<span />', counterTextAttr.spanAttr)));
    counterText.insertAfter(this.slideId);
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
    setTimeout(this.startShow, this.slideChangeTime);
  }

  init() {
    this.moveToTop();
    this.hideSlides();
    this.addSlideCounter();
    this.startShow();
  }
}

$(document).ready(function() {
  var selectors = {
    slideId : '#slideshow',
    slidesEle : 'li',
    target : '#header',
    slideCounterId : 'slideCounter',
    slideChangeTime : 3000
  };

  var slideshow = new Slideshow(selectors);
  slideshow.init();
});
