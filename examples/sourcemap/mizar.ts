export default {
  url: 'ws://127.0.0.1:9222/devtools/browser/4b24b090-0ed2-4951-b058-1d24d8fc9721',
  opts: {
    patterns: ['http://localhost:4173/**/*'],

    fetchOptions: {
      sourcemapParser: (url) => {
        return url.replace('4173', '8080')
      },
      htmlTags: [
        {
          injectTo: 'head-prepend',
          tag: '<script>console.log(\'mizar running\')</script>',
        },
      ],
    },

  },

}
