import React from 'react';
import styles from './DownloadBadge.module.css';

// You can update this number or label as needed
const DOWNLOADS = '120,000+';

export default function DownloadBadge() {
  return (
    <div className={styles.downloadBadge}>
      <span className={styles.emoji} aria-hidden="true">🚀</span>
      {DOWNLOADS} Downloads
    </div>
  );
}
