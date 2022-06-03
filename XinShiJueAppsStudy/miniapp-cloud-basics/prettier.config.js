module.exports = {
  printWidth: 180, //超过最大值换行
  jsxBracketSameLine: true, // 不换行
  jsxSingleQuote: true, // 在jsx中使用单引号代替双引号
  semi: false, // 设置语句末尾加分号
  tabWidth: 2, // 缩进字节数
  useTabs: false, // 缩进不使用tab，使用空格
  arrowParens: 'avoid', //  (x) => {} 箭头函数参数只有一个时是否要有小括号。avoid：省略括号
  singleQuote: true, // 设置强制单引号
  trailingComma: 'none', // none是禁止随时添加逗号 在对象或数组最后一个元素后面是否加逗号（在ES5中加尾逗号）
  bracketSpacing: true, // 在对象，数组括号与文字之间加空格 "{ foo: bar }"
  htmlWhitespaceSensitivity: 'ignore',
  ignorePath: '.prettierignore', // 在jsx中把'>' 是否单独放一行
  endOfLine: 'auto', // 结尾是 \n \r \n\r auto
  parsers: {
    '.jsx': 'flow',
    '.scss': 'scss',
    '.ts': 'typescript',
    '.less': 'css',
    '.vue': 'vue',
    '.nvue': 'vue',
    '.ux': 'vue',
    '.yml': 'yaml'
  }
}
