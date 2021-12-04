//配置具体修改规则
 const {
  override,
  fixBabelImports,
  addLessLoader,
  addDecoratorsLegacy,
} = require("customize-cra");
const path = require("path");
const rewirePostcss = require("react-app-rewire-postcss");

 module.exports = override(
     fixBabelImports('import', {
       libraryName: 'antd',
       libraryDirectory: 'es',
       style: true,
     }),
     addLessLoader({
       javascriptEnabled:true,
       modifyVars:{'@primary-color':'#1890ff'}
     }),
     addDecoratorsLegacy({}),
     (config, env) => {
      // 重写postcss
      rewirePostcss(config, {
        plugins: () => [
          require("postcss-flexbugs-fixes"),
          require("postcss-preset-env")({
            autoprefixer: {
              flexbox: "no-2009",
            },
            stage: 3,
          }),
          require("postcss-px2rem-exclude")({
            // 设计稿宽度/10
            remUnit: 52,//基础值 16px=1rem
            exclude: /node-modules/i,
          }),
        ],
      });
  
      return config;
    }
   );

