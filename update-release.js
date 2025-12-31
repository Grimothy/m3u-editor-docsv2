#!/usr/bin/env node

/**
 * Script to update the latest release information in the GitHubRelease component
 * Run this after publishing a new release to keep the docs site updated
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const REPO = 'sparkison/m3u-editor';
const COMPONENT_PATH = path.join(__dirname, 'src/components/GitHubRelease/index.js');
const VERSIONS_PATH = path.join(__dirname, 'src/components/ReleaseVersions/index.js');

function fetchLatestRelease() {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.github.com',
      path: `/repos/${REPO}/releases/latest`,
      method: 'GET',
      headers: {
        'User-Agent': 'M3U-Editor-Docs-Updater',
        'Accept': 'application/vnd.github.v3+json'
      }
    };

    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        if (res.statusCode === 200) {
          try {
            const release = JSON.parse(data);
            resolve(release);
          } catch (err) {
            reject(new Error('Failed to parse JSON response'));
          }
        } else {
          reject(new Error(`GitHub API returned ${res.statusCode}`));
        }
      });
    });

    req.on('error', (err) => {
      reject(err);
    });

    req.end();
  });
}

function updateVersionsComponent(release) {
  // Read the current versions component file
  let content = fs.readFileSync(VERSIONS_PATH, 'utf8');

  // Extract version number without 'v' prefix
  const versionNumber = release.tag_name.replace('v', '');

  // Update production version (assuming latest release is production)
  const prodRegex = /version: 'v[\d\.\-]+', \/\/ Production/;
  content = content.replace(prodRegex, `version: 'v${versionNumber}', // Production`);

  // Write back to file
  fs.writeFileSync(VERSIONS_PATH, content, 'utf8');
  console.log(`✅ Updated production version to v${versionNumber}`);
}

async function main() {
  try {
    console.log('🔄 Fetching latest release from GitHub...');
    const release = await fetchLatestRelease();
    console.log(`📦 Found release: ${release.tag_name}`);

    updateComponent(release);
    updateVersionsComponent(release);
    console.log('🎉 Release information updated successfully!');
  } catch (error) {
    console.error('❌ Error updating release info:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}