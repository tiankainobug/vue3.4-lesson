const config = {
    // 每行最大长度
    printWidth: 100,

    // 缩进空格数
    tabWidth: 4,

    // 使用空格而不是制表符
    useTabs: false,

    // 语句末尾是否加分号
    semi: false,

    // 是否使用单引号
    singleQuote: true,

    // 对象属性是否加引号: “as-needed” 仅在必须时添加
    quoteProps: 'as-needed',

    // 多行尾部是否加逗号：ES5
    trailingComma: 'es5',

    // 对象左右空格 { foo: bar }
    bracketSpacing: true,

    // 箭头函数参数是否总是加括号
    arrowParens: 'always',

    // 换行风格（auto、lf、crlf）
    endOfLine: 'lf',

    // Vue 文件中 <script> 和 <style> 的缩进
    vueIndentScriptAndStyle: false,

    // 是否格式化嵌入的代码，比如 markdown 中的代码块
    embeddedLanguageFormatting: 'auto',
}

export default config
