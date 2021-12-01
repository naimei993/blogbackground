// //配置具体修改规则
//  const {
//   override,
//   fixBabelImports,
//   addLessLoader,
//   addDecoratorsLegacy,
// } = require("customize-cra");
// const path = require("path");
// const rewirePostcss = require("react-app-rewire-postcss");


//  module.exports = override(
//      fixBabelImports('import', {
//        libraryName: 'antd',
//        libraryDirectory: 'es',
//        style: 'css',
//      }),
//      addLessLoader({
//        javascriptEnabled:true,
//        modifyVars:{'@primary-color':'#1DA57A'}
//      }),
//      addDecoratorsLegacy({}),
//     //  (config, env) => {
//     //   // 重写postcss
//     //   rewirePostcss(config, {
//     //     plugins: () => [
//     //       require("postcss-flexbugs-fixes"),
//     //       require("postcss-preset-env")({
//     //         autoprefixer: {
//     //           flexbox: "no-2009",
//     //         },
//     //         stage: 3,
//     //       }),
//     //       require("postcss-px2rem-exclude")({
//     //         // 设计稿宽度/10
//     //         remUnit: 160,//基础值 160px=1rem
//     //         exclude: /node-modules/i,
//     //       }),
//     //     ],
//     //   });
  
//     //   return config;
//     // }
//    );

 
const { override, fixBabelImports, addLessLoader,addDecoratorsLegacy } = require('customize-cra');


module.exports = override(
    fixBabelImports('import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: 'css',
    }),
    addLessLoader({
      javascriptEnabled:true,
      modifyVars:{'@primary-color':'#1DA57A'}
    }),
    addDecoratorsLegacy({})
  );
