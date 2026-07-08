// @ts-check
import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: {
        en: "TrucklineMP",
        pl: "TrucklineMP",
        de: "TrucklineMP",
        fr: "TrucklineMP",
        ru: "TrucklineMP",
      },
      defaultLocale: "root",
      locales: {
        root: {
          label: "English",
          lang: "en",
        },
        pl: {
          label: "Polski",
          lang: "pl",
        },
        de: {
          label: "Deutsch",
          lang: "de",
        },
        fr: {
          label: "Français",
          lang: "fr",
        },
        ru: {
          label: "Русский",
          lang: "ru",
        },
      },
      logo: {
        src: "./src/assets/truckline_large_no_shadow.svg",
        alt: "TrucklineMP",
        replacesTitle: true,
      },
      favicon: "/truckline_no_shadow.svg",
      customCss: [
        "@fontsource-variable/geist",
        "@fontsource-variable/geist-mono",
        "./src/styles/marathon.css",
      ],
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/TrucklineMP/docs",
        },
        {
          icon: "discord",
          label: "Discord",
          href: "https://discord.gg/trucklinemp",
        },
        { icon: "external", label: "Website", href: "https://trucklinemp.com" },
      ],
      components: {
        SiteTitle: "./src/components/SiteTitle.astro",
        Footer: "./src/components/Footer.astro",
        SidebarSublist: "./src/components/SidebarSublist.astro",
      },
      sidebar: [
        {
          label: "VTC Programs",
          translations: {
            ru: "Программы VTC",
            de: "VTC Programme",
          },
          collapsed: false,
          items: [
            {
              slug: "guides/verified-vtc-program",
              label: "Verified VTC Program",
              translations: {
                pl: "Zweryfikowany Program VTC",
                ru: "Программа верификации VTC",
                de: "Verifizierungsprogramm für VTCs",
              },
            },
            {
              slug: "guides/verified-vtc-discord-role",
              label: "Verified VTC Discord Role",
              translations: {
                pl: "Rola Discord Zweryfikowanego VTC",
                ru: "Роль Discord верифицированного VTC",
              },
            },
            {
              slug: "guides/partnered-vtc-program",
              label: "Partnered VTC Program",
              translations: {
                pl: "Partnerski Program VTC",
                ru: "Партнёрская программа VTC",
              },
            },
            {
              slug: "guides/vtc-livery-guidelines",
              label: "VTC Livery Guidelines",
              translations: {
                pl: "Wytyczne Malowania VTC",
                ru: "Правила оформления окрасок VTC",
              },
            },
          ],
        },
        {
          label: "VTC Guides",
          translations: {
            ru: "Руководства по VTC",
          },
          collapsed: false,
          items: [
            {
              slug: "guides/vtc-creating",
              label: "Creating a VTC",
            },
            {
              slug: "guides/vtc-directory",
              label: "VTC Directory",
            },
            {
              slug: "guides/vtc-general-settings",
              label: "General Settings",
              translations: {
                pl: "Ustawienia Ogólne",
                ru: "Общие настройки",
                de: "Allgemeine VTC-Einstellungen",
              },
            },
            {
              slug: "guides/vtc-roles-permissions",
              label: "Roles & Permissions",
              translations: {
                pl: "Role i Uprawnienia",
                ru: "Роли и права доступа",
              },
            },
            {
              slug: "guides/vtc-member-management",
              label: "Member Management",
              translations: {
                pl: "Zarządzanie Członkami",
                ru: "Управление участниками",
              },
            },
            {
              slug: "guides/vtc-recruitment",
              label: "Recruitment",
              translations: {
                pl: "Rekrutacja",
                ru: "Набор участников",
              },
            },
            {
              slug: "guides/vtc-events",
              label: "Events",
            },
            {
              slug: "guides/vtc-news",
              label: "News",
            },
            {
              slug: "guides/vtc-announcements",
              label: "Announcements",
              translations: {
                pl: "Ogłoszenia",
                ru: "Уведомления",
              },
            },
            {
              slug: "guides/vtc-discord-verification",
              label: "Discord Verification",
              translations: {
                pl: "Weryfikacja Discord",
                ru: "Верификация Discord",
              },
            },
            {
              slug: "guides/vtc-visibility",
              label: "Visibility",
              translations: {
                pl: "Widoczność",
                ru: "Видимость",
              },
            },
            {
              slug: "guides/vtc-activity-log",
              label: "Activity Log",
            },
            {
              slug: "guides/vtc-disbanding",
              label: "Disbanding a VTC",
            },
          ],
        },
        {
          label: "Discord Bot",
          translations: {
            pl: "Bot Discord",
            ru: "Бот Discord",
          },
          collapsed: false,
          items: [
            {
              slug: "guides/discord-connection-flows",
              label: "Connection Flows",
            },
            {
              slug: "guides/discord-linked-roles",
              label: "Linked Roles",
              translations: {
                pl: "Połączone Role",
                ru: "Привязанные Роли",
              },
            },
            {
              slug: "guides/discord-notifications",
              label: "Discord Notifications",
            },
            {
              slug: "guides/official-discord-server",
              label: "Official Discord Server",
            },
          ],
        },
        {
          label: "Account Guides",
          translations: {
            ru: "Руководства по учетным записям",
          },
          collapsed: false,
          items: [
            {
              slug: "guides/profile-settings",
              label: "Profile Settings",
              translations: {
                pl: "Ustawienia Profilu",
                ru: "Настройки профиля",
              },
            },
            {
              slug: "guides/public-profile",
              label: "Public Profile",
            },
            {
              slug: "guides/user-directory",
              label: "User Directory",
            },
            {
              slug: "guides/account-security",
              label: "Account Security",
              translations: {
                pl: "Bezpieczeństwo Konta",
                ru: "Безопасность аккаунта",
              },
            },
            {
              slug: "guides/connections",
              label: "Connections",
              translations: {
                pl: "Połączenia",
                ru: "Подключённые аккаунты",
              },
            },
            {
              slug: "guides/regional-timezone",
              label: "Regional & Timezone",
            },
            {
              slug: "guides/notifications",
              label: "Notifications",
            },
            {
              slug: "guides/appearance-preferences",
              label: "Appearance & Preferences",
              translations: {
                pl: "Wygląd i Preferencje",
                ru: "Внешний вид и предпочтения",
              },
            },
            {
              slug: "guides/forum",
              label: "Forum",
            },
            {
              slug: "guides/support-tickets",
              label: "Support Tickets",
            },
            {
              slug: "guides/bans-appeals",
              label: "Bans & Appeals",
            },
            {
              slug: "guides/account-deletion",
              label: "Account Deletion",
              translations: {
                pl: "Usunięcie Konta",
                ru: "Удаление аккаунта",
              },
            },
          ],
        },
        {
          label: "Developers",
          translations: {
            ru: "Разработчикам",
          },
          collapsed: false,
          items: [
            {
              slug: "guides/developers/overview",
              label: "Platform Overview",
              translations: {
                ru: "Обзор платформы",
              },
            },
            {
              slug: "guides/developers/public-api",
              label: "Public API",
              translations: {
                ru: "Публичный API",
              },
            },
            {
              slug: "guides/developers/oauth-apps",
              label: "OAuth Apps",
              translations: {
                ru: "Приложения OAuth",
              },
            },
            {
              slug: "guides/developers/webhooks",
              label: "Webhooks",
              translations: {
                ru: "Вебхуки",
              },
            },
            {
              slug: "guides/developers/console",
              label: "Developer Console",
            },
          ],
        },
        {
          label: "Contribute",
          translations: {
            ru: "Внесите вклад",
          },
          collapsed: false,
          items: [
            {
              slug: "guides/contributors",
              label: "Contributors",
              translations: {
                pl: "Współtwórcy",
                ru: "Участники",
              },
            },
            {
              slug: "guides/contributing",
              label: "Translate Documentation",
              translations: {
                pl: "Tłumacz Dokumentację",
                ru: "Перевод документации",
              },
            },
          ],
        },
      ],
    }),
  ],
});
