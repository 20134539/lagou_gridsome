// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
	siteName: '辣子鸡的博客',
	plugins: [
		{
			use: "@gridsome/source-strapi",
			options: {
				apiURL: process.env.GRIDSOME_API_URL,
				queryLimit: 100,
				contentTypes: ['post', 'project', 'fans']
			}
		}
	],
	templates: {
		StrapiPost: [
			{
				path: '/blog/post/:id',
				component: './src/templates/post.vue'
			}
		],
		StrapiProject: [
			{
				path: '/project/content/:id',
				component: './src/templates/content.vue'
			}
		],
		StrapiFans: [
			{
				path: '/social/user/:id',
				component: './src/templates/user.vue'
			}
		],
	}
}
