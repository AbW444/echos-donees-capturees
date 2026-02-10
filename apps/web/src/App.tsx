import React, { useReducer, useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { colors } from '@echos/ui';
import { useTranslation } from './i18n/index.js';
import { useTheme } from './theme/index.js';
import { IconGlobe, IconSun, IconMoon } from './components/Icons.js';
import { AppContext, appReducer, INITIAL_STATE } from './store/app-state.js';
import { HomePage } from './pages/HomePage.js';
import { WizardPage } from './pages/WizardPage.js';
import { ManifestoPage } from './pages/ManifestoPage.js';
import { DocsPage } from './pages/DocsPage.js';

function Topbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t, lang, setLang } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const [docsInView, setDocsInView] = useState(false);
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);

  // IntersectionObserver for docs section on home page
  useEffect(() => {
    if (location.pathname !== '/') {
      setDocsInView(false);
      return;
    }

    let observer: IntersectionObserver | null = null;
    let timeoutId: ReturnType<typeof setTimeout>;

    const setup = () => {
      const el = document.getElementById('docs-section');
      if (!el) {
        timeoutId = setTimeout(setup, 200);
        return;
      }
      observer = new IntersectionObserver(
        ([entry]) => setDocsInView(entry.isIntersecting),
        { threshold: 0.1 },
      );
      observer.observe(el);
    };

    setup();

    return () => {
      clearTimeout(timeoutId);
      observer?.disconnect();
    };
  }, [location.pathname]);

  const navItems = [
    { label: t('nav.docs'), key: 'docs', isDocsScroll: true },
    { label: t('nav.manifesto'), key: 'manifesto', path: '/manifesto' },
    { label: t('nav.scan'), key: 'scan', path: '/scan' },
  ];

  const handleNavClick = (item: (typeof navItems)[0]) => {
    if (item.isDocsScroll) {
      if (location.pathname === '/') {
        document.getElementById('docs-section')?.scrollIntoView({ behavior: 'smooth' });
      } else {
        navigate('/');
        setTimeout(() => {
          document.getElementById('docs-section')?.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      }
    } else if (item.path) {
      navigate(item.path);
    }
  };

  const isTabActive = (item: (typeof navItems)[0]) => {
    if (item.isDocsScroll) return docsInView;
    return item.path ? location.pathname === item.path : false;
  };

  // Logo: dark.png en mode sombre, white.png en mode clair
  const darkLogoSrc = `${import.meta.env.BASE_URL}logotype-02-dark.png`;
  const lightLogoSrc = `${import.meta.env.BASE_URL}logotype-02-white.png`;
  const logoSrc = theme === 'dark' ? darkLogoSrc : lightLogoSrc;

  return (
    <header className="echos-topbar">
      {/* Logo */}
      <button
        onClick={() => {
          navigate('/');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          padding: 0,
          flexShrink: 0,
        }}
      >
        <img
          src={logoSrc}
          alt="echos"
          style={{ height: '28px', width: 'auto' }}
        />
      </button>

      {/* Nav — hidden on mobile via CSS */}
      <nav
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0',
          marginLeft: '40px',
        }}
        className="topbar-nav"
      >
        {navItems.map((item) => {
          const active = isTabActive(item);
          const hovered = hoveredTab === item.key;
          return (
            <button
              key={item.key}
              onClick={() => handleNavClick(item)}
              onMouseEnter={() => setHoveredTab(item.key)}
              onMouseLeave={() => setHoveredTab(null)}
              style={{
                position: 'relative',
                padding: '24px 18px',
                background: 'none',
                border: 'none',
                color: active ? 'var(--c-text-1)' : 'var(--c-text-2)',
                fontSize: '15px',
                fontWeight: active ? 500 : 400,
                cursor: 'pointer',
                fontFamily: 'inherit',
                transition: 'color 150ms ease',
              }}
            >
              {item.label}
              {/* Active indicator — thick, rounded, higher */}
              {active && (
                <span
                  className="tab-active-indicator"
                  style={{
                    position: 'absolute',
                    bottom: '10px',
                    left: '14px',
                    right: '14px',
                    height: '4px',
                    background: 'var(--c-accent)',
                    borderRadius: '3px',
                  }}
                />
              )}
              {/* Hover wave indicator — CSS animated */}
              {hovered && !active && <span className="tab-wave-indicator" />}
            </button>
          );
        })}
      </nav>

      <div style={{ flex: 1 }} />

      {/* Theme toggle */}
      <button
        onClick={toggleTheme}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '36px',
          height: '36px',
          borderRadius: '9999px',
          border: '1px solid var(--c-border)',
          background: 'transparent',
          color: 'var(--c-text-2)',
          cursor: 'pointer',
          transition: 'all 150ms ease',
          marginRight: '8px',
        }}
        title={theme === 'dark' ? 'Mode clair' : 'Mode sombre'}
      >
        {theme === 'dark' ? <IconSun size={16} /> : <IconMoon size={16} />}
      </button>

      {/* Language toggle */}
      <button
        onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '6px 12px',
          borderRadius: '9999px',
          border: '1px solid var(--c-border)',
          background: 'transparent',
          color: 'var(--c-text-2)',
          fontSize: '13px',
          fontWeight: 500,
          cursor: 'pointer',
          fontFamily: 'inherit',
          transition: 'all 150ms ease',
          marginRight: '12px',
        }}
        title={lang === 'fr' ? 'Switch to English' : 'Passer en français'}
      >
        <IconGlobe size={14} />
        {lang === 'fr' ? 'EN' : 'FR'}
      </button>

      {/* CTA — hidden on mobile via CSS */}
      {!location.pathname.startsWith('/scan') && (
        <button
          className="topbar-cta"
          onClick={() => navigate('/scan')}
          style={{
            padding: '10px 24px',
            borderRadius: '9999px',
            border: 'none',
            background: colors.accent,
            color: '#FFFFFF',
            fontSize: '14px',
            fontWeight: 500,
            cursor: 'pointer',
            fontFamily: 'inherit',
            transition: 'background 150ms ease',
          }}
          onMouseEnter={(e) => { (e.target as HTMLElement).style.background = colors.accentHover; }}
          onMouseLeave={(e) => { (e.target as HTMLElement).style.background = colors.accent; }}
        >
          {t('nav.newScan')}
        </button>
      )}
    </header>
  );
}

export function App() {
  const [state, dispatch] = useReducer(appReducer, INITIAL_STATE);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--c-black)', transition: 'background 350ms ease' }}>
        <Topbar />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/scan" element={<WizardPage />} />
            <Route path="/manifesto" element={<ManifestoPage />} />
            <Route path="/docs" element={<DocsPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </AppContext.Provider>
  );
}
