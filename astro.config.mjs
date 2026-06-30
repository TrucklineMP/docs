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
				de: 'TrucklineMP',
				fr: 'TrucklineMP',
				ru: 'TrucklineMP',
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
				de: {
					label: 'Deutsch',
					lang: 'de',
				},
				fr: {
					label: 'Français',
					lang: 'fr',
				},
				ru: {
					label: 'Русский',
					lang: 'ru',
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
			],
			components: {
				SiteTitle: './src/components/SiteTitle.astro',
				Footer: './src/components/Footer.astro',
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
								ru: 'Программа верификации VTC',
							},
						},
						{
							slug: 'guides/partnered-vtc-program',
							label: 'Partnered VTC Program',
							translations: {
								pl: 'Partnerski Program VTC',
								ru: 'Партнёрская программа VTC',
							},
						},
						{
							slug: 'guides/vtc-livery-guidelines',
							label: 'VTC Livery Guidelines',
							translations: {
								pl: 'Wytyczne Malowania VTC',
								ru: 'Правила оформления окрасок VTC',
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
								ru: 'Общие настройки',
							},
						},
						{
							slug: 'guides/vtc-roles-permissions',
							label: 'Roles & Permissions',
							translations: {
								pl: 'Role i Uprawnienia',
								ru: 'Роли и права доступа',
							},
						},
						{
							slug: 'guides/vtc-member-management',
							label: 'Member Management',
							translations: {
								pl: 'Zarządzanie Członkami',
								ru: 'Управление участниками',
							},
						},
						{
							slug: 'guides/vtc-recruitment',
							label: 'Recruitment',
							translations: {
								pl: 'Rekrutacja',
								ru: 'Набор участников',
							},
						},
						{
							slug: 'guides/vtc-announcements',
							label: 'Announcements',
							translations: {
								pl: 'Ogłoszenia',
							},
						},
						{
							slug: 'guides/vtc-discord-verification',
							label: 'Discord Verification',
							translations: {
								pl: 'Weryfikacja Discord',
								ru: 'Верификация Discord',
							},
						},
						{
							slug: 'guides/vtc-visibility',
							label: 'Visibility',
							translations: {
								pl: 'Widoczność',
								ru: 'Видимость',
							},
						},
					],
				},
				{
					label: 'Discord Bot',
					translations: {
						pl: 'Bot Discord',
					},
					collapsed: false,
					items: [
						{
							slug: 'guides/discord-linked-roles',
							label: 'Linked Roles',
							translations: {
								pl: 'Połączone Role',
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
								ru: 'Настройки профиля',
							},
						},
						{
							slug: 'guides/account-security',
							label: 'Account Security',
							translations: {
								pl: 'Bezpieczeństwo Konta',
								ru: 'Безопасность аккаунта',
							},
						},
						{
							slug: 'guides/connections',
							label: 'Connections',
							translations: {
								pl: 'Połączenia',
								ru: 'Подключённые аккаунты',
							},
						},
						{
							slug: 'guides/appearance-preferences',
							label: 'Appearance & Preferences',
							translations: {
								pl: 'Wygląd i Preferencje',
								ru: 'Внешний вид и предпочтения',
							},
						},
						{
							slug: 'guides/account-deletion',
							label: 'Account Deletion',
							translations: {
								pl: 'Usunięcie Konta',
								ru: 'Удаление аккаунта',
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
								ru: 'Перевод документации',
							},
						},
					],
				},
			],
		}),
	],
});
