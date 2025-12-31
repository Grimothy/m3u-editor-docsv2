import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import styles from './index.module.css';

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout title={siteConfig.title} description={siteConfig.tagline}>
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <img src="/img/logo.svg" alt="logo" className={styles.logo} />
          <h1 className="hero__title">M3U Editor</h1>
          <p className="hero__subtitle">A full-featured IPTV editor — EPG, Xtream API output, series & playlist management, and more.</p>
          <div className={styles.buttons}>
            <Link className="button button--primary button--lg" to="/docs/intro">Get Started</Link>
            <Link className="button button--secondary button--lg" to="/docs/intro" style={{marginLeft: 12}}>Documentation</Link>
            <a className="button button--secondary button--lg" href="https://github.com/sparkison/m3u-editor" style={{marginLeft: 12}}>GitHub</a>
          </div>
        </div>
      </header>

      <main>
        <section className="container" style={{padding: '3rem 0'}}>
          <div className={styles.featureGrid}>
            <article className={styles.featureCard}>
              <h3>Full EPG Support</h3>
              <p>XMLTV, remote EPG URLs, and Schedules Direct integration for accurate program data.</p>
            </article>
            <article className={styles.featureCard}>
              <h3>Xtream & M3U Output</h3>
              <p>Export playlists as M3U/M3U8 or use the Xtream API to serve streams.</p>
            </article>
            <article className={styles.featureCard}>
              <h3>Series & Playlist Management</h3>
              <p>Manage series, save .strm files, and perform post-processing scripts or webhooks.</p>
            </article>
            <article className={styles.featureCard}>
              <h3>Multiple Deploy Modes</h3>
              <p>Run modular (Nginx/Caddy) or all-in-one Docker deployments with examples included.</p>
            </article>
          </div>
        </section>

        <section className="container" style={{padding: '2rem 0'}}>
          <h2 style={{textAlign: 'center'}}>Screenshots</h2>
          <div className={styles.screenshots}>
            <img src="https://raw.githubusercontent.com/sparkison/m3u-editor/master/screenshots/channel-editing.png" alt="Channel editor" />
            <img src="https://raw.githubusercontent.com/sparkison/m3u-editor/master/screenshots/series-mgmt.png" alt="Series management" />
            <img src="https://raw.githubusercontent.com/sparkison/m3u-editor/master/screenshots/in-app-playlist-epg-preview.png" alt="Playlist EPG preview" />
          </div>
        </section>
      </main>
    </Layout>
  );
}
