import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styles from './ScreenshotsCarousel.module.css';

const screenshots = [
  {
    src: 'https://raw.githubusercontent.com/sparkison/m3u-editor/master/screenshots/channel-editing.png',
    alt: 'Channel editor',
  },
  {
    src: 'https://raw.githubusercontent.com/sparkison/m3u-editor/master/screenshots/series-mgmt.png',
    alt: 'Series management',
  },
  {
    src: 'https://raw.githubusercontent.com/sparkison/m3u-editor/master/screenshots/in-app-playlist-epg-preview.png',
    alt: 'Playlist EPG preview',
  },
  {
    src: 'https://raw.githubusercontent.com/sparkison/m3u-editor/master/screenshots/in-app-playlist-epg-playback.png',
    alt: 'EPG preview with playback',
  },
  {
    src: 'https://raw.githubusercontent.com/sparkison/m3u-editor/master/screenshots/proxy-monitor.png',
    alt: 'Proxy stats',
  },
  {
    src: 'https://raw.githubusercontent.com/sparkison/m3u-editor/master/screenshots/api.png',
    alt: 'API interface',
  },
];

export default function ScreenshotsCarousel() {
  const [lightbox, setLightbox] = useState({ open: false, src: '', alt: '' });

  const openLightbox = (src, alt) => setLightbox({ open: true, src, alt });
  const closeLightbox = () => setLightbox({ open: false, src: '', alt: '' });

  return (
    <>
      <Swiper
        modules={[Navigation, Pagination, A11y]}
        spaceBetween={16}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          600: { slidesPerView: 2 },
          900: { slidesPerView: 3 },
        }}
        style={{ paddingBottom: 32 }}
        className={styles.carousel}
      >
        {screenshots.map((img, idx) => (
          <SwiperSlide key={idx}>
            <img
              src={img.src}
              alt={img.alt}
              className={styles.screenshotImg}
              onClick={() => openLightbox(img.src, img.alt)}
              tabIndex={0}
              role="button"
              aria-label={`Expand ${img.alt}`}
              onKeyDown={(e) => { if (e.key === 'Enter') openLightbox(img.src, img.alt); }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      {lightbox.open && (
        <div className={styles.lightboxOverlay} onClick={closeLightbox} role="dialog" aria-modal="true">
          <button className={styles.lightboxClose} onClick={closeLightbox} aria-label="Close">&times;</button>
          <img src={lightbox.src} alt={lightbox.alt} className={styles.lightboxImg} />
        </div>
      )}
    </>
  );
}
