const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
// const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HappyPack = require('happypack');

const path=require('path');
const theme=require('../theme');
const APP_NAME='Teye';
//
// /**
//  * 动态查找所有入口文件,暂时没什么用
//  */
// var glob = require("glob");
// var files = glob.sync('./src/vendor/json/*.json');
// var newEntries = [];
// files.forEach(function(f){
//     var name = /.*\/vendor\/json\/(.*?)\.json/.exec(f)[1];//得到pages/Dashboard/index这样的文件名
//     // console.log(name)
//     newEntries.push('"'+name+'"');
// });
// console.log(newEntries.join(','))

// 生产环境
var isProd = process.env.NODE_ENV === 'production';

function resolve(projectPath){
    return path.resolve(__dirname,'..' ,projectPath);
}

const pages = ['_dashboard','_streamView','_conversions','_dashboard2','_dashboard3','_dashboard4'];

var plugins = [
    // new webpack.optimize.CommonsChunkPlugin({
    //     name: 'vendor',
    //     minChunks: function (module) {
    //         // this assumes your vendor imports exist in the node_modules directory
    //         return module.context && module.context.includes('node_modules');
    //     }
    // }),
    new webpack.optimize.CommonsChunkPlugin({
        names: ["vendor3","vendor2","vendor1"],
        minChunks: Infinity
    }),
    // new webpack.optimize.CommonsChunkPlugin({name:'vendor'}),
    new webpack.optimize.CommonsChunkPlugin({name:'app', children:true, async:true, minChunks:2}),
    // ...pages.map(o=>{
    //     return new HtmlWebpackPlugin({
    //         title:APP_NAME,
    //         minify: {
    //             caseSensitive: false,             //是否大小写敏感
    //             collapseBooleanAttributes: true, //是否简写boolean格式的属性如：disabled="disabled" 简写为disabled
    //             collapseWhitespace: true         //是否去除空格
    //         },
    //         chunks:[o, 'vendor1','vendor2','vendor3'],
    //         favicon:'./src/img/logo.png',
    //         template:'./src/'+o+'.html',
    //         filename:'./'+o+'.html' //结合output.path
    //     })
    // }),
    // new HtmlWebpackPlugin({
    //     title:'登录 - '+APP_NAME,
    //     minify: {
    //         caseSensitive: false,             //是否大小写敏感
    //         collapseBooleanAttributes: true, //是否简写boolean格式的属性如：disabled="disabled" 简写为disabled
    //         collapseWhitespace: true         //是否去除空格
    //     },
    //     chunks:['login', 'vendor'],
    //     favicon:'./src/img/logo.png',
    //     template:'./src/login.html',
    //     filename:'./login.html' //结合output.path
    // }),
    new HtmlWebpackPlugin({
        title:APP_NAME,
        minify: {
            caseSensitive: false,             //是否大小写敏感
            collapseBooleanAttributes: true, //是否简写boolean格式的属性如：disabled="disabled" 简写为disabled
            collapseWhitespace: true         //是否去除空格
        },
        chunks:['app', 'vendor1','vendor2','vendor3'],
        inject:false,
        favicon:'./src/img/logo.png',
        template:'./src/index.html',
        filename:'./index.html' //结合output.path
    }),
    new HappyPack({
        id: 'babel',
        loaders: ['babel-loader']
    }),
    new HappyPack({
        id: 'less',
        loaders: ['style-loader', 'css-loader?minimize', {
            loader:'less-loader',
            options:{
                javascriptEnabled:true,
                modifyVars:theme
            }
        }]
    }),
    new HappyPack({
        id: 'css',
        loaders: ['style-loader', 'css-loader?minimize']
    }),
    new CopyWebpackPlugin([
        {from:resolve('src/vendor'), ignore:['fonts/*']},
        {from:'src/*.html', to:'[name].html'}
    ]),
    new webpack.ProvidePlugin({
        React:'react',
        Img:'components/Img',
        'APP_LOGO_EN':'img/favicon_en.png',
        'APP_LOGO_ZH':'img/favicon_zh.png'
    }),
    new webpack.DefinePlugin({
        'APP_NAME': JSON.stringify(APP_NAME),
        'APP_EDITION': JSON.stringify('default')
    }),
    // new ExtractTextPlugin({
    //     filename: '[name].css' //路径以及命名
    // })
];

module.exports = {
    context: path.resolve(__dirname, '../'),
    entry: {
        login: './src/js/login',
        app: './src/js/index',
        _dashboard: './src/js/_dashboard',
        _streamView: './src/js/_streamView',
        _conversions: './src/js/_conversions',
        _dashboard2: './src/js/_dashboard2',
        _dashboard3: './src/js/_dashboard3',
        _dashboard4: './src/js/_dashboard4',
        vendor1:[
            'react',
            'react-dom',
            'react-redux',
            "redux",
            "redux-thunk",
        ],
        vendor2:[
            'antd'
        ],
        vendor3:[
            "cropperjs",
            "intl",
            "nprogress",
            "react-intl"
        ]
    },
    output: {
        //给require.ensure用；webpack-dev-server的网站名
        publicPath:isProd ? './' : '/',
        // publicPath:isProd?'http://d2svindzvhonk3.cloudfront.net/teye-web/':'/',
        //js的发布路径,是相对于package.json文件而言
        path: resolve('./dist'),
        //对应与entry中要打包出来分文件
        filename: isProd ? '[name].[chunkhash:8].js' : '[name].js',
        //对应于非entry中但仍需要打包出来的文件，比如按需加载require,ensure
        chunkFilename:isProd ? '[name].chunk.[chunkhash:8].js' : '[name].chunk.js'
    },
    externals: {
        echarts: 'echarts',
        moment:'moment',
        bmap:'bmap'
    },
    resolve: {
        extensions: ['.js', '.less'],
        alias:{
            react:resolve('node_modules/react'),
            'react-dom':resolve('node_modules/react-dom'),
            img:resolve('src/img'),
            json:resolve('src/json'),
            less:resolve('src/less'),
            appStore:resolve('src/js/store.js'),
            actions:resolve('src/js/actions'),
            components:resolve('src/js/components'),
            pages:resolve('src/js/pages'),
            utils:resolve('src/js/utils'),
            config:resolve('src/js/config')
        }
    },
    module: {
        loaders: [
            {test: /\.(otf|eot|svg|ttf|woff|woff2)\??.*$/, use:'url-loader?limit=100000&name=[hash:8].[ext]'},
            {test: /\.css$/, use: 'happypack/loader?id=css'},
            //{test: /\.scss$/, use: ExtractTextPlugin.extract({
            //    fallback: 'style-loader',
            //    use: ['css-loader', 'sass-loader']
            //}), include:resolve('src/sass')},
            {
                test: /\.less$/,
                use:'happypack/loader?id=less',
                // include:[resolve('src/less')]
                include:[resolve('src/less'),resolve('node_modules/antd')]
            },

            // {
            //     test: /\.less$/,
            //     use: ExtractTextPlugin.extract({
            //         fallback: 'style-loader',
            //         use: ['css-loader', {
            //             loader: 'less-loader',
            //             options:  { javascriptEnabled: true,modifyVars:theme}
            //         }]
            //     }),
            //     // include:[resolve('src/less')]
            //     include:[resolve('node_modules/antd')]
            // },
            {test: /\.js$/, use: 'happypack/loader?id=babel', include:resolve('src/js')},
            // {test: /\.(png|jpe?g|gif)$/,use: 'url-loader?limit=8192&name=[hash:8].[ext]' , include:resolve('src/img')}
            {test: /\.(png|jpe?g|gif)$/,use: 'url-loader?limit=8192&name=[name].[ext]' , include:resolve('src/img')}
        ],
        // unknownContextCritical : false
    },
    plugins: plugins,
}