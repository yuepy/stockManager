const path = require('path');
const ManifestPlugin = require('webpack-manifest-plugin');
const uglify = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');  //为less css单独打包插件
module.exports = {
    //devtool:'eval-source-map',
    //要压缩文件入口
    entry:[
        'react-hot-loader/patch',
        path.join(__dirname,'src/index.js'),
    ],
    //文件压缩出口
    output:{
        path:path.join(__dirname,'./dist'),
        filename:'bundle.js',
        chunkFilename: '[name].js'
    },
    /*src文件夹下面的以.js结尾的文件，要使用babel解析*/
    /*cacheDirectory是用来缓存编译结果，下次编译加速*/
    //loader: ['style-loader', 'css-loader','postcss-loader']
    module:{
        rules: [
            {
                test: /\.js$/,
                loader: ['babel-loader?cacheDirectory=true'],
                include: path.join(__dirname, 'src')
            },
            {
                test: /\.css$/,
                
                loader:ExtractTextPlugin.extract({
                    fallback:"style-loader",
                    use:"css-loader"
                })
            },
            {
                test: /\.less$/,
                loader:ExtractTextPlugin.extract({
                    fallback:"style-loader",
                    use:[{
                        loader:"css-loader"
                    },{
                        loader:"less-loader"
                    }]
                })
            },
            {
                test: /\.(png|gif|jpg|jpeg|bmp|svg)/,
                loader:[{
                    loader: "url-loader",
                    options: {
                        limit: 8192,
                        name: path.posix.join('/src', './images/[hash:8].[name].[ext]')
                    }
                }]
            }
    ]
    },
    devServer:{
        contentBase:path.join(__dirname,'/'),
        historyApiFallback:true,
        host:'0.0.0.0',
        proxy: {
            '/api': {
              target: 'http://106.12.194.98',
              changeOrigin: true,     // target是域名的话，需要这个参数，
              secure: false,          // 设置支持https协议的代理
            },
        }
    },
    plugins:[
        new ManifestPlugin(),
        new ExtractTextPlugin('css/index.css'),
        
    ],
    //new uglify()  正式环境 打包压缩
    resolve: {
        alias: {
            //配置文件别名, 优化文件引用路径
            pages: path.join(__dirname, 'src/pages'),
            component: path.join(__dirname, 'src/component'),
            router: path.join(__dirname, 'src/router'),
            pageStyle:path.join(__dirname,'src/css/'),
            commonStyle:path.join(__dirname,'src/css/common'),
            image:path.join(__dirname,'src/images/'),
            build:path.join(__dirname,'/dist')
        }
    }
    //--color 控制台输出彩色信息 --progress 编译进度输出 --hot 模块热替换只更新自己修改部分  
    //--hot需要在输入文件内添加监听  module.hot.accept  监听文件变化 . 不刷新页面进行修改
    //"react-hot-loader/babel"  在.babelrc里面配置 pulgins[ "react-hot-loader/babel" ] 针对jsx特性的热更新
}
