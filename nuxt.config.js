require("dotenv").config();

module.exports = {
	server: {
		port: process.env.PORT,
		host: process.env.HOST,
	},
	env: process.env,
	publicRuntimeConfig: {
		cdn: process.env.CDN_BASE_URL || "", // 페이지에서 this.$config.cdn 으로 경로 접근 가능.
	},
	build: {
		// only production mode
		publicPath:
			process.env.CDN_BASE_URL === undefined ||
			process.env.CDN_BASE_URL === "" ||
			process.env.CDN_DIST_PATH === undefined ||
			process.env.CDN_DIST_PATH === ""
				? "/_nuxt"
				: process.env.CDN_BASE_URL + process.env.CDN_DIST_PATH,
		//extractCSS: true,
		loaders: {
			scss: {
				implementation: require("sass"),
			},
			extend(config) {
				config.module.rules.push({
					test: /\.scss$/,
					loader: "sass-loader",
					exclude: /(node_modules)/,
					options: {
						additionalData: "",
					},
				});
			},
		},
	},
	buildModules: ["@nuxtjs/style-resources"],
	/* */
	styleResources: {
		scss: ["~/assets/scss/meyer-reset-scss.scss", "~/assets/scss/variables.scss", "~/assets/scss/placeholders.scss", "~/assets/scss/mixin.scss"],
	},
	generate: {
		fallback: true,
	},
	router: {
		scrollBehavior: async (to, from, savedPosition) => {
			if (savedPosition) {
				return savedPosition;
			}

			if (to.path === from.path) {
				if (to.hash) {
					return {
						x: 0,
						y: document.querySelector(to.hash).offsetTop,
					};
				}
				/*if (to.hash) { // 부드럽게 이동, 페이징 등으로 높이격차나면 끊겨서 보여서 주석
					return window.scrollTo({
						top: document.querySelector(to.hash).offsetTop,
						behavior: 'smooth'
					})
				}
				return window.scrollTo({ top: 0, behavior: 'smooth' })*/
			}

			return { x: 0, y: 0 };
		},
		middleware: ["header","certification"],
	},
	modules: ["@nuxtjs/axios", "@nuxtjs/auth-next", "@nuxtjs/robots", "@nuxtjs/device", "nuxt-clipboard"],
	module: {
		rules: [
			// ... other rules omitted

			// this will apply to both plain `.scss` files
			// AND `<style lang="scss">` blocks in `.vue` files
			/*
          {
            test: /\.scss$/,
            use: [
              'vue-style-loader',
              'css-loader',
              'sass-loader'
            ]
          } */
			{
				test: /\.s[ac]ss$/i,
				use: [
					{
						loader: "sass-loader",
						options: {
							implementation: require("sass"), // Prefer `dart-sass`
							outputStyle: "compressed", // `dart-sass` not support "compact" and "nest"
						},
					},
				],
			},
			"swiper",
		],
	},
	plugins: [
		{ src: "~/modules/initialize.js" },
		{ src: "~/plugins/layout.js" },
		{ src: "~/plugins/seo.js" },
		{ src: "~/plugins/saleson-api.js" },
		{ src: "~/plugins/saleson-app.js" },

		{ src: "~/plugins/vee-validate.js", mode: "client" },
		{ src: "~/plugins/vuex-session-storage.js", mode: "client" },
		{ src: "~/plugins/vuex-local-storage.js", mode: "client" },
		{ src: "~/plugins/vuex-cookie-storage.js" },
		{ src: "~/plugins/vue-directives.js", mode: "client" },

		{ src: "~/plugins/initialize-store-data.js"},
		{ src: "~/plugins/common-logics.js", mode: "client"},
		{ src: "~/plugins/common-utils.js", mode: "client"},
	],

	// Auto import components: https://go.nuxtjs.dev/config-components
	components: true,

	// nuxt-clipboard
	// https://www.npmjs.com/package/nuxt-clipboard
	clipboard: {
		autoSetContainer: true,
	},

	// CSP
	render: {
		csp: {
			policies: {
				"script-src": [
					"'self'",
					"'unsafe-eval'", // adobe script 적용 (eval 허용)
					"'unsafe-inline'", // Google Tag Manager script 적용 (inline 허용)
					"https",
					"https://sharer.kakao.com", // kakao api
					"https://t1.kakaocdn.net/kakao_js_sdk/1.43.0/kakao.min.js", // kakao api
					"http://t1.kakaocdn.net/kakao_js_sdk/1.43.0/kakao.min.js", // kakao api
					"http://connect.facebook.net/ko_KR/sdk.js", // facebook api
					"https://connect.facebook.net/ko_KR/sdk.js",
					"https://connect.facebook.net/en_US/sdk.js",
					"http://nsp.pay.naver.com/sdk/js/naverpay.min.js", // naver pay api
					"https://nsp.pay.naver.com/sdk/js/naverpay.min.js",

					"https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js", // daum post api
					"https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js", // daum post api
					"http://dmaps.daum.net/map_js_init/postcode.v2.js", // daum post api
					"https://ssl.daumcdn.net/dmaps/map_js_init/postcode.v2.js",

					"http://spi.maps.daum.net/imap/map_js_init/postcode.v2.js", // daum post api
					"https://spi.maps.daum.net/imap/map_js_init/postcode.v2.js",
					"https://t1.daumcdn.net/postcode/api/core/220721/1658402366639/220721.js",

					"https://checkip.amazonaws.com/",
				],
			},
		},
	},

	axios: {
		baseURL: process.env.API,
		headers: {
			common: {},
			delete: {
				"Content-Type": "application/json;charset=utf-8",
				"Access-Control-Allow-Origin": "*",
			},
			get: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			head: {},
			post: {
				"Content-Type": "application/json;charset=utf-8",
				"Access-Control-Allow-Origin": "*",
			},
			put: {
				"Content-Type": "application/json;charset=utf-8",
			},
			patch: {
				"Content-Type": "application/json;charset=utf-8",
				"Access-Control-Allow-Origin": "*",
			},
		},
		proxy: false,
		https: false,
	},

	auth: {
		localStorage: false,
		cookie: {
			prefix: "saleson.auth.",
		},
		scopeKey: "type",
		strategies: {
			local: {
				token: {
					property: "accessToken",
					required: true,
					type: "Bearer",
				},
				user: {
					property: false, // <--- Default "user"
					autoFetch: true,
				},
				endpoints: {
					user: { url: "/api/auth/auth-me", method: "get" },
					login: false,
					logout: false,
				},
			},
		},
		rewriteRedirects: true, // 로그인 후 원래 페이지로 redirect (현재는 sso redirect 때문에 정상 동작 하지 않음.)
		redirect: {
			login: "/user/login",
			logout: "/",
			callback: "/user/login",
			home: "/",
		},
	},
	robots: {
		UserAgent: "*",
		Disallow: "/",
	},

	head: {
		title: "Java 쇼핑몰 세일즈온",
		titleTemplate: "%s | 세일즈온",
		meta: [
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
			},
			{
				hid: "og:type",
				name: "og:type",
				property: "og:type",
				content: "website",
			},
			{
				hid: "og:site_name",
				name: "og:site_name",
				property: "og:site_name",
				content: "세일즈온",
			},
			{
				hid: "og:title",
				name: "og:title",
				property: "og:title",
				content: "세일즈온",
			},
			{
				hid: "og:image",
				name: "og:image",
				property: "og:image",
				content: process.env.FRONTEND + "/static/images/sns.jpg",
			},
			{
				hid: "og:description",
				name: "og:description",
				property: "og:description",
				content: "세일즈온 Description",
			},
			{ name: "apple-mobile-web-app-title", content: "세일즈온" },
			{ name: "application-name", content: "세일즈온" },
		],
		link: [
			{
				rel: "icon",
				type: "image/x-icon",
				href: process.env.FRONTEND + "/static/images/favicon.ico",
			},
			{
				rel: "shortcut icon",
				href: process.env.FRONTEND + "/static/images/shortcut-icon.png",
			},
			{
				rel: "apple-touch-icon",
				href: process.env.FRONTEND + "/static/images/apple-touch-icon.png",
			},

		],
	},
};

export default {
	css: [
		// Load a Node.js module directly (here it's a Sass file)
		"bulma",
		// SCSS file in the project
		"~/assets/scss/common.scss",
	],
	mixins: ["~/mixinsJs/togglePwd.js"],
};
