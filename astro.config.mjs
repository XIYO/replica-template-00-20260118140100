// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import cloudflare from '@astrojs/cloudflare';
import { readFileSync } from 'node:fs';

const siteConfig = JSON.parse(readFileSync('./site.config.json', 'utf-8'));
const siteUrl = `https://${siteConfig.subdomain}.xiyo.dev`;

export default defineConfig({
	site: siteUrl,
	output: 'static',
	adapter: cloudflare(),
	integrations: [
		starlight({
			title: siteConfig.title,
			defaultLocale: 'root',
			locales: {
				root: { label: '한국어', lang: 'ko-KR' }
			},
			customCss: ['./src/styles/custom.css'],
			social: [
				{
					icon: 'github',
					label: 'GitHub',
					href: `https://github.com/${siteConfig.githubRepo}`,
				},
			],
			sidebar: [
				{ label: '디지털 자산 및 기술 트렌드', autogenerate: { directory: 'digital-asset-trends' } },
				{ label: 'MZ세대 특화 실전 투자 전략', autogenerate: { directory: 'practical-investment-models' } },
			],
		}),
	],
});
