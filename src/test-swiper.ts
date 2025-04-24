import 'swiper/css';
import 'swiper/css/pagination';

import { Swiper } from 'swiper';
import { Pagination } from 'swiper/modules';

const testSwiper = () => {
  const mainWrapper = document.querySelector('.main-wrapper');

  if (!mainWrapper) {
    console.error('Main wrapper not found');
    return;
  }

  mainWrapper.innerHTML = `
    <div class="swiper" style="height: 400px; width: 400px;">
      <div class="swiper-wrapper" style="height: 400px; width: 400px;">
        <div class="swiper-slide" style="height: 400px; width: 400px; background-color: red;">
          <img src="https://picsum.photos/200/300" alt="Slide 1" />
          <div class="swiper-slide-title">Slide 1</div>
        </div>
        <div class="swiper-slide" style="height: 400px; width: 400px; background-color: red;">
          <img src="https://picsum.photos/200/300" alt="Slide 2" />
          <div class="swiper-slide-title">Slide 2</div>
        </div>
        <div class="swiper-slide" style="height: 100px; width: 100px; background-color: red;">
          <img src="https://picsum.photos/200/300" alt="Slide 3" />
          <div class="swiper-slide-title">Slide 3</div>
        </div>
        <div class="swiper-slide" style="height: 100px; width: 100px; background-color: red;">
          <img src="https://picsum.photos/200/300" alt="Slide 4" />
          <div class="swiper-slide-title">Slide 4</div>
        </div>
        <div class="swiper-slide" style="height: 100px; width: 100px; background-color: red;">
          <img src="https://picsum.photos/200/300" alt="Slide 5" />
          <div class="swiper-slide-title">Slide 5</div>
        </div>
        <div class="swiper-slide" style="height: 100px; width: 100px; background-color: red;">
          <img src="https://picsum.photos/200/300" alt="Slide 6" />
          <div class="swiper-slide-title">Slide 6</div>
        </div>
        <div class="swiper-slide" style="height: 100px; width: 100px; background-color: red;">
          <img src="https://picsum.photos/200/300" alt="Slide 7" />
          <div class="swiper-slide-title">Slide 7</div>
        </div>
        <div class="swiper-slide" style="height: 100px; width: 100px; background-color: red;">
          <img src="https://picsum.photos/200/300" alt="Slide 8" />
          <div class="swiper-slide-title">Slide 8</div>
        </div>
      </div>
      <div class="swiper-pagination"></div>
    </div>
  `;

  const slides = document.querySelectorAll('.swiper-slide');
  slides.forEach((slide) => {
    (slide as HTMLElement).style.height = '50px';
    (slide as HTMLElement).style.width = '50px';
  });

  console.log('init test swiper');

  const swiper = new Swiper('.swiper', {
    // Optional parameters
    direction: 'horizontal',
    modules: [Pagination],
    loop: true,
    slidesPerView: 1,
    centeredSlides: true,
    // spaceBetween: 10,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: true,
    },
    // createElements: true,
  });

  console.log(swiper.slides.length);

  console.log('swiper', swiper);
};

export { testSwiper };
