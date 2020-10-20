// file loaded up automatically by Next.js when project starts up
// Next will then attempt to read file in by looking at webpackDevMiddleware function
// call it with middlepack configuration it has created by default
// overwrites it's default, and instead polls all files together every 300ms
// fixes file change detection when being run inside Docekr container

module.exports = {
	webpackDevMiddleware: config => {
		config.watchOptions.poll = 300;
		return config;
	}
};