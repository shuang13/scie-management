var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ROOT_PATH = path.resolve(__dirname);
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');
module.exports = {
  entry: {   
    index: './pages/cate/index/page.js',  
    create_doc: './pages/cate/create_doc/page.js',
    create_link: './pages/cate/create_link/page.js',
    create_page: './pages/cate/create_page/page.js',
    edit_doc: './pages/cate/edit_doc/page.js',
    edit_link: './pages/cate/edit_link/page.js',
    edit_page: './pages/cate/edit_page/page.js',
    commons: [
      './public-resource/components/header/header.js'
    ]
  },   
  output: {  
    path: BUILD_PATH,   
    filename: '[name]/entry.[chunkhash].js',
    chunkFilename: '[id].[chunkhash].bundle.js' 
  },
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass'],
      },
      { 
        test: /\.ejs$/, 
        loader: 'ejs-loader'
      }
    ]
  },
  //添加我们的插件 会自动生成一个html文件
  plugins: [
    // new webpack.optimize.CommonsChunkPlugin({
    //         name: 'commons/commons',
    //         filename: '[name]/bundle.[chunkhash].js',
    //     }),
    new HtmlWebpackPlugin({
      title: 'Hello World app',
      filename: 'index/page.html',
      template: path.resolve(ROOT_PATH, './pages/cate/index/html.js'),
      chunks: ['commons', 'index']
    }),
    new HtmlWebpackPlugin({
      title: 'Hello World app',
      filename: 'create_doc/page.html',
      template: path.resolve(ROOT_PATH, './pages/cate/create_doc/html.js'),
      chunks: ['commons', 'create_doc']
    }),
    new HtmlWebpackPlugin({
      title: 'Hello World app',
      filename: 'create_link/page.html',
      template: path.resolve(ROOT_PATH, './pages/cate/create_link/html.js'),
      chunks: ['commons', 'create_link']
    }),
    new HtmlWebpackPlugin({
      title: 'Hello World app',
      filename: 'create_page/page.html',
      template: path.resolve(ROOT_PATH, './pages/cate/create_page/html.js'),
      chunks: ['commons', 'create_page']
    }),
    new HtmlWebpackPlugin({
      title: 'Hello World app',
      filename: 'edit_doc/page.html',
      template: path.resolve(ROOT_PATH, './pages/cate/edit_doc/html.js'),
      chunks: ['commons', 'edit_doc']
    }),
    new HtmlWebpackPlugin({
      title: 'Hello World app',
      filename: 'edit_link/page.html',
      template: path.resolve(ROOT_PATH, './pages/cate/edit_link/html.js'),
      chunks: ['commons', 'edit_link']
    }),
    new HtmlWebpackPlugin({
      title: 'Hello World app',
      filename: 'edit_page/page.html',
      template: path.resolve(ROOT_PATH, './pages/cate/edit_page/html.js'),
      chunks: ['commons', 'edit_page']
    })
    
  ]
  
};