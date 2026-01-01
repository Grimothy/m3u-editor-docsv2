import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import GitHubRelease from '@site/src/components/GitHubRelease';
import ReleaseVersions from '@site/src/components/ReleaseVersions';
import ScreenshotsCarousel from '../components/ScreenshotsCarousel';
import styles from './index.module.css';
import DownloadBadge from '../components/DownloadBadge';

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout title={siteConfig.title} description={siteConfig.tagline}>
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <img src="/img/logo.svg" alt="logo" className={styles.logo} />
          <h1 className="hero__title">M3U Editor</h1>
          <p className="hero__subtitle">A full-featured IPTV editor — EPG, Xtream API output, series & playlist management, and more.</p>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
            <DownloadBadge />
          </div>
          <div className={styles.buttons}>
            <Link className="button button--primary button--lg" to="/docs/intro">Quick Start</Link>
            <Link className="button button--secondary button--lg" to="/docs/intro" style={{marginLeft: 12}}>Documentation</Link>
            <a className="button button--secondary button--lg" href="https://github.com/sparkison/m3u-editor" style={{marginLeft: 12}}>GitHub</a>
          </div>
        </div>
      </header>

      <main>
        <section className={clsx('container', styles.fadeIn)} style={{padding: '3rem 0'}}>
          <h2 className={styles.featuresHeading}>Features</h2>
          <div className={styles.featureGrid}>
            <article className={styles.featureCard}>
              <span className={styles.featureIcon} aria-hidden="true">📺</span>
              <h3>Full EPG Support</h3>
              <p>XMLTV, remote EPG URLs, and Schedules Direct integration for accurate program data.</p>
            </article>
            <article className={styles.featureCard}>
              <span className={styles.featureIcon} aria-hidden="true">🔗</span>
              <h3>Xtream & M3U Output</h3>
              <p>Export playlists as M3U/M3U8 or use the Xtream API to serve streams.</p>
            </article>
            <article className={styles.featureCard}>
              <span className={styles.featureIcon} aria-hidden="true">📂</span>
              <h3>Series & Playlist Management</h3>
              <p>Manage series, save .strm files, and perform post-processing scripts or webhooks.</p>
            </article>
            <article className={styles.featureCard}>
              <span className={styles.featureIcon} aria-hidden="true">⚡</span>
              <h3>Multiple Deploy Modes</h3>
              <p>Run modular (Nginx/Caddy) or all-in-one Docker deployments with examples included.</p>
            </article>
          </div>
        </section>

        <section className={clsx('container', styles.fadeIn)}>
          <ReleaseVersions />
        </section>


        <section className={clsx('container', styles.fadeIn)} style={{padding: '2.5rem 0'}}>
          <h2 className={styles.screenshotsHeading}>Screenshots</h2>
          <ScreenshotsCarousel />
        </section>
      </main>
    </Layout>
  );
}
