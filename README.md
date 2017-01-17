# karma-es6-webpack-config
Попытка создать универсальный конфигурационный файл к набору инструментов для тестирования

## Подключение

*/karma.conf.js*
```javascript
const config = require('karma-es6-webpack-config'),
    path = require('path');

module.exports = config({
   baseUrl: path.resolve('./')
});
```

*/package.json*
```json
"scripts": {
  "test": "karma start karma.conf.js --single-run"
},
"devDependencies": {
  "karma-es6-webpack-config": "*"
}
```

Далее создаем тесты и в нужных папках с именами, соответствующими маске *.test.js.
