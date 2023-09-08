[{"name":"ConfigModule","tag":"ConfigModule","method":"init","params":[],"define":{},"header":{},"middlewares":[],"guards":[],"interceptors":[]},{"route":{"route":"/user","type":"get"},"name":"UserController","tag":"UserController","method":"get","params":[],"define":{"auth":"user"},"header":{},"middlewares":[],"guards":[],"interceptors":[]},{"route":{"route":"/user/login","type":"post"},"name":"UserController","tag":"UserController","method":"login","params":[{"type":"body","key":"","index":0}],"define":{"auth":false},"header":{},"middlewares":[],"guards":[],"interceptors":[]},{"route":{"route":"/team","type":"get"},"name":"TeamController","tag":"TeamController","method":"findByUser","params":[],"define":{"auth":"user"},"header":{},"middlewares":[],"guards":[],"interceptors":[]},{"route":{"route":"/team/:id","type":"get"},"name":"TeamController","tag":"TeamController","method":"findById","params":[{"type":"params","key":"id","index":0}],"define":{"auth":"user"},"header":{},"middlewares":[],"guards":[],"interceptors":[]},{"route":{"route":"/team","type":"post"},"name":"TeamController","tag":"TeamController","method":"create","params":[{"type":"body","key":"","index":0}],"define":{"auth":"user"},"header":{},"middlewares":[],"guards":[],"interceptors":[]},{"route":{"route":"/team/:id","type":"put"},"name":"TeamController","tag":"TeamController","method":"updateById","params":[{"type":"params","key":"id","index":0},{"type":"body","key":"","index":1}],"define":{"auth":"user"},"header":{},"middlewares":[],"guards":[],"interceptors":[]},{"route":{"route":"/team/:id","type":"delete"},"name":"TeamController","tag":"TeamController","method":"deleteById","params":[{"type":"params","key":"id","index":0}],"define":{"auth":"user"},"header":{},"middlewares":[],"guards":[],"interceptors":[]},{"route":{"route":"/team/user","type":"post"},"name":"TeamController","tag":"TeamController","method":"addUser","params":[{"type":"body","key":"","index":0}],"define":{"auth":"user"},"header":{},"middlewares":[],"guards":[],"interceptors":[]},{"route":{"route":"/namespace","type":"get"},"name":"NamespaceController","tag":"NamespaceController","method":"findByTeam","params":[{"type":"query","key":"teamId","index":0}],"define":{"auth":"user"},"header":{},"middlewares":[],"guards":[],"interceptors":[]},{"route":{"route":"/namespace/:id","type":"get"},"name":"NamespaceController","tag":"NamespaceController","method":"findById","params":[{"type":"params","key":"id","index":0}],"define":{"auth":"user"},"header":{},"middlewares":[],"guards":[],"interceptors":[]},{"route":{"route":"/namespace/query","type":"post"},"name":"NamespaceController","tag":"NamespaceController","method":"query","params":[{"type":"body","key":"","index":0}],"define":{"auth":"user"},"header":{},"middlewares":[],"guards":[],"interceptors":[]},{"route":{"route":"/namespace","type":"post"},"name":"NamespaceController","tag":"NamespaceController","method":"create","params":[{"type":"body","key":"","index":0}],"define":{"auth":"user"},"header":{},"middlewares":[],"guards":[],"interceptors":[]},{"route":{"route":"/namespace/:id","type":"put"},"name":"NamespaceController","tag":"NamespaceController","method":"updateById","params":[{"type":"params","key":"id","index":0},{"type":"body","key":"","index":1}],"define":{"auth":"user"},"header":{},"middlewares":[],"guards":[],"interceptors":[]},{"route":{"route":"/namespace/:id","type":"delete"},"name":"NamespaceController","tag":"NamespaceController","method":"deleteById","params":[{"type":"params","key":"id","index":0}],"define":{"auth":"user"},"header":{},"middlewares":[],"guards":[],"interceptors":[]},{"route":{"route":"/asset","type":"get"},"name":"AssetController","tag":"AssetController","method":"findByNamespace","params":[{"type":"query","key":"namespaceId","index":0}],"define":{"auth":"user"},"header":{},"middlewares":[],"guards":[],"interceptors":[]},{"route":{"route":"/asset/query","type":"post"},"name":"AssetController","tag":"AssetController","method":"query","params":[{"type":"body","key":"","index":0}],"define":{"auth":"user"},"header":{},"middlewares":[],"guards":[],"interceptors":[]},{"route":{"route":"/asset/:id","type":"get"},"name":"AssetController","tag":"AssetController","method":"findById","params":[{"type":"params","key":"id","index":0}],"define":{"auth":"user"},"header":{},"middlewares":[],"guards":[],"interceptors":[]},{"route":{"route":"/asset","type":"post"},"name":"AssetController","tag":"AssetController","method":"create","params":[{"type":"body","key":"","index":0},{"type":"query","key":"namespace","index":1}],"define":{"auth":"user"},"header":{},"middlewares":[],"guards":[],"interceptors":[]},{"route":{"route":"/asset/:id","type":"put"},"name":"AssetController","tag":"AssetController","method":"updateById","params":[{"type":"params","key":"id","index":0},{"type":"body","key":"","index":1}],"define":{"auth":"user"},"header":{},"middlewares":[],"guards":[],"interceptors":[]},{"route":{"route":"/asset/:id","type":"delete"},"name":"AssetController","tag":"AssetController","method":"deleteById","params":[{"type":"params","key":"id","index":0}],"define":{"auth":"user"},"header":{},"middlewares":[],"guards":[],"interceptors":[]}]