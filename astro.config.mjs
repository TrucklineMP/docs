// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: {
				en: 'TrucklineMP',
				pl: 'TrucklineMP',
			},
			defaultLocale: 'root',
			locales: {
				root: {
					label: 'English',
					lang: 'en',
				},
				pl: {
					label: 'Polski',
					lang: 'pl',
				},
			},
			logo: {
				src: './src/assets/truckline_large_no_shadow.svg',
				alt: 'TrucklineMP',
				replacesTitle: true,
			},
			favicon: '/truckline_no_shadow.svg',
			customCss: [
				'@fontsource-variable/geist',
				'@fontsource-variable/geist-mono',
				'./src/styles/marathon.css',
			],
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/TrucklineMP/docs' },
				{ icon: 'discord', label: 'Discord', href: 'https://discord.gg/trucklinemp' },
				{ icon: 'external', label: 'Website', href: 'https://trucklinemp.com' },
				{ icon: 'external', label: 'Made with Starlight', href: 'https://starlight.astro.build/' },
			],
			components: {
				SiteTitle: './src/components/SiteTitle.astro',
			},
			sidebar: [
				{
					label: 'VTC Programs',
					collapsed: false,
					items: [
						{
							slug: 'guides/verified-vtc-program',
							label: 'Verified VTC Program',
							translations: {
								pl: 'Zweryfikowany Program VTC',
							},
						},
						{
							slug: 'guides/partnered-vtc-program',
							label: 'Partnered VTC Program',
							translations: {
								pl: 'Partnerski Program VTC',
							},
						},
					],
				},
				{
					label: 'VTC Guides',
					collapsed: false,
					items: [
						{
							slug: 'guides/vtc-general-settings',
							label: 'General Settings',
							translations: {
								pl: 'Ustawienia Ogólne',
							},
						},
						{
							slug: 'guides/vtc-roles-permissions',
							label: 'Roles & Permissions',
							translations: {
								pl: 'Role i Uprawnienia',
							},
						},
						{
							slug: 'guides/vtc-member-management',
							label: 'Member Management',
							translations: {
								pl: 'Zarządzanie Członkami',
							},
						},
						{
							slug: 'guides/vtc-recruitment',
							label: 'Recruitment',
							translations: {
								pl: 'Rekrutacja',
							},
						},
						{
							slug: 'guides/vtc-discord-verification',
							label: 'Discord Verification',
							translations: {
								pl: 'Weryfikacja Discord',
							},
						},
					],
				},
				{
					label: 'Account Guides',
					collapsed: false,
					items: [
						{
							slug: 'guides/profile-settings',
							label: 'Profile Settings',
							translations: {
								pl: 'Ustawienia Profilu',
							},
						},
						{
							slug: 'guides/account-security',
							label: 'Account Security',
							translations: {
								pl: 'Bezpieczeństwo Konta',
							},
						},
						{
							slug: 'guides/connections',
							label: 'Connections',
							translations: {
								pl: 'Połączenia',
							},
						},
						{
							slug: 'guides/appearance-preferences',
							label: 'Appearance & Preferences',
							translations: {
								pl: 'Wygląd i Preferencje',
							},
						},
						{
							slug: 'guides/account-deletion',
							label: 'Account Deletion',
							translations: {
								pl: 'Usunięcie Konta',
							},
						},
					],
				},
				{
					label: 'Contribute',
					collapsed: false,
					items: [
						{
							slug: 'guides/contributing',
							label: 'Translate Documentation',
							translations: {
								pl: 'Tłumacz Dokumentację',
							},
						},
					],
				},
			],
		}),
	],
});
