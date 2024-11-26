const fs = require('fs');
const xmlbuilder = require('xmlbuilder');
const baseUrl = 'https://yourwebsite.com';

const getPages = async () => {
  // Example fetching logic
  const staticPages = fs
    .readdirSync('./src/app')
    .filter((page) => !page.startsWith('_') && !page.endsWith('.js'))
    .map((page) => `${baseUrl}/${page.replace('.js', '')}`);

  // Add logic for dynamic pages if necessary
  return [...staticPages];
};

const buildSitemapXml = (urls) => {
  const urlset = xmlbuilder
    .create('urlset', { version: '1.0', encoding: 'UTF-8' })
    .att('xmlns', 'http://www.sitemaps.org/schemas/sitemap/0.9');

  urls.forEach((url) => {
    urlset.ele('url').ele('loc', url);
  });

  return urlset.end({ pretty: true });
};

const generateSitemap = async () => {
  const urls = await getPages();
  const sitemapXml = buildSitemapXml(urls);
  fs.writeFileSync('./sitemap.xml', sitemapXml);
};

generateSitemap();
