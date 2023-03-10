/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  serverBuildTarget: "vercel",
  future: {},
  ignoredRouteFiles: ["**/.*", "**/.css*"],
  server: process.env.NODE_ENV === "development" ? undefined : "./server.js",
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // serverBuildPath: "build/index.js",
  // publicPath: "/build/",
};
