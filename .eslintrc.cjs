/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: "module", // 允许使用导入
  },
  parser: "@typescript-eslint/parser", // 指定ESLint解析器
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting',
    "plugin:@typescript-eslint/recommended", // 使用@ typescript-eslint / eslint-plugin中的推荐规则
    "prettier/@typescript-eslint", // 使用eslint-config-prettier禁用一些与Prettier冲突的ESLint规则
    "plugin:prettier/recommended" // 启用eslint-plugin-prettier和eslint-config-prettier，使编辑器显示错误提示，确保这项是扩展数组中的最后一个配置
  ],
  rules: {
    // 放置ESLint规则的位置。可用于覆盖从扩展配置中指定的规则
    // 例如 "@typescript-eslint/explicit-function-return-type": "off",
    "no-alert": "error", //禁止使用 alert、confirm 和 prompt
    "no-empty-function": "error", //禁止空函数
    "no-var": "error", //禁止使用var
  },
}
