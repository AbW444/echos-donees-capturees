import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, GlassPanel, colors, fonts } from '@echos/ui';
import { useTranslation } from '../i18n/index.js';
import { useTheme } from '../theme/index.js';
import { IconImage } from '../components/Icons.js';
import { ImageLightbox } from '../components/ImageLightbox.js';
import { DocsSection } from '../components/DocsSection.js';

export function HomePage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
  const [hoveredGallery, setHoveredGallery] = useState<number | null>(null);

  const FEATURES = [
    { title: t('home.feat1.title'), desc: t('home.feat1.desc'), num: '01' },
    { title: t('home.feat2.title'), desc: t('home.feat2.desc'), num: '02' },
    { title: t('home.feat3.title'), desc: t('home.feat3.desc'), num: '03' },
    { title: t('home.feat4.title'), desc: t('home.feat4.desc'), num: '04' },
  ];

  const STATS = [
    { value: '100%', label: t('home.stat.clientSide') },
    { value: '6', label: t('home.stat.steps') },
    { value: 'NRRD', label: t('home.stat.export') },
    { value: '0', label: t('home.stat.dataSent') },
  ];

  const openLightbox = (images: string[], startIndex: number) => {
    setLightboxImages(images);
    setLightboxIndex(startIndex);
    setLightboxOpen(true);
  };

  const heroImages = [
    `${import.meta.env.BASE_URL}hero-main.png`,
    `${import.meta.env.BASE_URL}hero-side.png`,
  ];

  const galleryItems = [
    { file: 'gallery-01.png', flex: 2 },
    { file: 'gallery-03.png', flex: 1 },
    { file: 'gallery-04.png', flex: 1 },
    { file: 'gallery-05.png', flex: 1 },
    { file: 'gallery-06.png', flex: 1 },
  ];

  const galleryImages = galleryItems.map((item) => `${import.meta.env.BASE_URL}${item.file}`);

  // Margins reduced: tighter on desktop for more image space
  const sectionPadding = '0 clamp(16px, 2.5vw, 24px)';

  return (
    <div style={{ background: colors.black }}>
      {/* Hero */}
      <section
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: 'clamp(48px, 8vw, 100px) clamp(16px, 2.5vw, 24px) clamp(32px, 4vw, 64px)',
        }}
      >
        <div style={{ marginBottom: '32px' }}>
          <img
            src={`${import.meta.env.BASE_URL}${theme === 'dark' ? 'logotype.png' : 'logotype_dark.png'}`}
            alt="echos - donnees capturees"
            style={{ width: 'clamp(280px, 35vw, 480px)', height: 'auto', display: 'block' }}
          />
        </div>

        <p
          style={{
            fontSize: 'clamp(15px, 1.2vw, 17px)',
            color: colors.text3,
            maxWidth: '560px',
            lineHeight: 1.7,
            marginBottom: '36px',
          }}
        >
          {t('home.description')}
        </p>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Button variant="primary" size="lg" onClick={() => navigate('/scan')}>
            {t('home.cta')}
          </Button>
          <Button variant="secondary" size="lg" onClick={() => navigate('/manifesto')}>
            {t('home.cta2')}
          </Button>
        </div>
      </section>

      {/* Hero visual zone */}
      <section style={{ maxWidth: '1400px', margin: '0 auto', padding: `0 clamp(16px, 2.5vw, 24px) clamp(48px, 5vw, 80px)` }}>
        <div
          className="hero-visual-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr',
            gridTemplateRows: 'minmax(240px, 360px)',
            gap: '16px',
          }}
        >
          {heroImages.map((src, i) => (
            <div
              key={src}
              className="visual-placeholder"
              style={{ minHeight: '240px', cursor: 'pointer', position: 'relative', overflow: 'hidden' }}
              onClick={() => openLightbox(heroImages, i)}
              onMouseEnter={(e) => {
                const img = e.currentTarget.querySelector('img');
                if (img) { img.style.transform = 'scale(1.05)'; img.style.filter = 'brightness(1.1)'; }
              }}
              onMouseLeave={(e) => {
                const img = e.currentTarget.querySelector('img');
                if (img) { img.style.transform = 'scale(1)'; img.style.filter = 'brightness(1)'; }
              }}
            >
              <img
                src={src}
                alt=""
                style={{ transition: 'transform 400ms cubic-bezier(0.34, 1.56, 0.64, 1), filter 300ms ease' }}
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
              <div style={{ position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', pointerEvents: 'none' }}>
                <IconImage size={32} color={colors.text3} />
                <span style={{ fontSize: '13px' }}>{i === 0 ? 'hero-main.png' : 'hero-side.png'}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section style={{ maxWidth: '1400px', margin: '0 auto', padding: `0 clamp(16px, 2.5vw, 24px) clamp(40px, 4vw, 64px)` }}>
        <div
          className="stats-row"
          style={{
            display: 'flex',
            background: colors.surface,
            border: `1px solid ${colors.border}`,
            borderRadius: '12px',
            padding: '24px 0',
          }}
        >
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              style={{
                textAlign: 'center',
                padding: '0 32px',
                borderRight: i < STATS.length - 1 ? `1px solid ${colors.border}` : 'none',
                flex: 1,
              }}
            >
              <div style={{ fontSize: '24px', fontWeight: 600, color: colors.text1, fontVariantNumeric: 'tabular-nums' }}>
                {stat.value}
              </div>
              <div style={{ fontSize: '13px', color: colors.text3, marginTop: '4px' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section style={{ maxWidth: '1400px', margin: '0 auto', padding: `clamp(40px, 4vw, 64px) clamp(16px, 2.5vw, 24px)` }}>
        <h2
          style={{
            fontFamily: fonts.display,
            fontVariationSettings: "'wght' 600",
            fontSize: 'clamp(28px, 3vw, 36px)',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            color: colors.text1,
            marginBottom: '32px',
          }}
        >
          {t('home.howItWorks')}
        </h2>
        <div
          className="grid-4-cols"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}
        >
          {FEATURES.map((f) => (
            <GlassPanel key={f.title} padding="28px">
              <div
                style={{
                  fontSize: '12px',
                  fontWeight: 600,
                  color: colors.accent,
                  fontVariantNumeric: 'tabular-nums',
                  marginBottom: '16px',
                  letterSpacing: '0.5px',
                }}
              >
                {f.num}
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 600, color: colors.text1, marginBottom: '10px' }}>
                {f.title}
              </h3>
              <p style={{ fontSize: '15px', color: colors.text2, lineHeight: 1.6 }}>{f.desc}</p>
            </GlassPanel>
          ))}
        </div>
      </section>

      {/* Gallery — flex layout with dynamic hover grow */}
      <section style={{ maxWidth: '1400px', margin: '0 auto', padding: `0 clamp(16px, 2.5vw, 24px) clamp(48px, 6vw, 100px)` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '24px' }}>
          <div>
            <h2
              style={{
                fontFamily: fonts.display,
                fontVariationSettings: "'wght' 600",
                fontSize: 'clamp(28px, 3vw, 36px)',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                color: colors.text1,
                marginBottom: '8px',
              }}
            >
              {t('home.gallery.title')}
            </h2>
            <p style={{ fontSize: '15px', color: colors.text3 }}>{t('home.gallery.subtitle')}</p>
          </div>
        </div>

        {/* Row 1: gallery-01 (wide) + gallery-03 */}
        <div className="gallery-row" style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
          {galleryItems.slice(0, 2).map((item, i) => {
            const isHovered = hoveredGallery === i;
            const otherHovered = hoveredGallery !== null && hoveredGallery !== i && hoveredGallery < 2;
            return (
              <div
                key={item.file}
                className="gallery-item visual-placeholder"
                style={{
                  flex: isHovered ? item.flex + 0.6 : otherHovered ? Math.max(item.flex - 0.3, 0.5) : item.flex,
                  height: isHovered ? '240px' : '200px',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'flex 500ms cubic-bezier(0.34, 1.56, 0.64, 1), height 500ms cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 300ms ease',
                  boxShadow: isHovered ? '0 12px 40px rgba(0,0,0,0.4)' : 'none',
                  zIndex: isHovered ? 2 : 1,
                }}
                onClick={() => openLightbox(galleryImages, i)}
                onMouseEnter={() => setHoveredGallery(i)}
                onMouseLeave={() => setHoveredGallery(null)}
              >
                <img
                  src={`${import.meta.env.BASE_URL}${item.file}`}
                  alt=""
                  style={{ transition: 'filter 300ms ease' }}
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
                <div style={{ position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', pointerEvents: 'none' }}>
                  <IconImage size={24} color={colors.text3} />
                  <span style={{ fontSize: '11px' }}>{item.file}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Row 2: gallery-04, gallery-05, gallery-06 */}
        <div className="gallery-row" style={{ display: 'flex', gap: '16px' }}>
          {galleryItems.slice(2).map((item, localI) => {
            const globalI = localI + 2;
            const isHovered = hoveredGallery === globalI;
            const otherHovered = hoveredGallery !== null && hoveredGallery !== globalI && hoveredGallery >= 2;
            return (
              <div
                key={item.file}
                className="gallery-item visual-placeholder"
                style={{
                  flex: isHovered ? 1.6 : otherHovered ? 0.85 : 1,
                  height: isHovered ? '240px' : '200px',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'flex 500ms cubic-bezier(0.34, 1.56, 0.64, 1), height 500ms cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 300ms ease',
                  boxShadow: isHovered ? '0 12px 40px rgba(0,0,0,0.4)' : 'none',
                  zIndex: isHovered ? 2 : 1,
                }}
                onClick={() => openLightbox(galleryImages, globalI)}
                onMouseEnter={() => setHoveredGallery(globalI)}
                onMouseLeave={() => setHoveredGallery(null)}
              >
                <img
                  src={`${import.meta.env.BASE_URL}${item.file}`}
                  alt=""
                  style={{ transition: 'filter 300ms ease' }}
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
                <div style={{ position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', pointerEvents: 'none' }}>
                  <IconImage size={24} color={colors.text3} />
                  <span style={{ fontSize: '11px' }}>{item.file}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Documentation — inline continuation */}
      <section
        id="docs-section"
        style={{
          padding: `clamp(48px, 5vw, 80px) clamp(16px, 2.5vw, 24px) clamp(64px, 6vw, 120px)`,
        }}
      >
        <DocsSection />
      </section>

      {/* Lightbox */}
      {lightboxOpen && (
        <ImageLightbox
          images={lightboxImages}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
          onNavigate={(index) => setLightboxIndex(index)}
        />
      )}
    </div>
  );
}
