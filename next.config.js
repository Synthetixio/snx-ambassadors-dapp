const withPlugins = require('next-compose-plugins');
const optimizedImages = require('next-optimized-images');

module.exports = withPlugins(
	[
		[
			optimizedImages,
			{
				images: {
					handleImages: ['jpeg', 'png', 'svg', 'webp', 'gif', 'ico'],
				},
			},
		],
	],
	{
		trailingSlash: !!process.env.NEXT_PUBLIC_TRAILING_SLASH_ENABLED,
		exportPathMap: function (defaultPathMap) {
			return {
				...defaultPathMap,
			};
		},
	}
);
