var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ROOT_PATH = path.resolve(__dirname);
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');
module.exports = {
  entry: {   
    'cate/index': './pages/cate/index/page.js',  
    'cate/create_doc': './pages/cate/create_doc/page.js',
    'cate/create_link': './pages/cate/create_link/page.js',
    'cate/create_page': './pages/cate/create_page/page.js',
    'cate/edit_doc': './pages/cate/edit_doc/page.js',
    'cate/edit_link': './pages/cate/edit_link/page.js',
    'cate/edit_page': './pages/cate/edit_page/page.js',
    'copyfrom/index': './pages/copyfrom/index/page.js',  
    'copyfrom/copyfrom_create': './pages/copyfrom/copyfrom_create/page.js',
    'copyfrom/copyfrom_edit': './pages/copyfrom/copyfrom_edit/page.js',
    'user/index': './pages/user/index/page.js',  
    'user/user_create': './pages/user/user_create/page.js',
    'user/user_edit': './pages/user/user_edit/page.js',
    'link/index': './pages/link/index/page.js',  
    'link/link_create': './pages/link/link_create/page.js',
    'link/link_edit': './pages/link/link_edit/page.js',
    'docManage/index': './pages/docManage/index/page.js',  
    'docManage/doc_create': './pages/docManage/doc_create/page.js',
    'docManage/doc_edit': './pages/docManage/doc_edit/page.js',
    'configManage/index': './pages/configManage/index/page.js',  
    'configManage/config_create': './pages/configManage/config_create/page.js',
    'configManage/config_edit': './pages/configManage/config_edit/page.js',    
    'configSetting/index': './pages/configSetting/index/page.js', 
    'home/index': './pages/home/index/page.js',  
    'home/password': './pages/home/password/page.js', 
  },   
  output: {  
    path: BUILD_PATH,   
    filename: '[name]/entry.js',
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
      },
      {
　　　　test: /\.(png|jpg)$/,
　　　　loader: 'url-loader?limit=8192&name=../../images/[name].[ext]'
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
      filename: 'cate/index/page.html',
      template: path.resolve(ROOT_PATH, './pages/cate/index/html.js'),
      chunks: ['cate/index']
    }),
    new HtmlWebpackPlugin({
      title: 'Hello World app',
      filename: 'cate/create_doc/page.html',
      template: path.resolve(ROOT_PATH, './pages/cate/create_doc/html.js'),
      chunks: ['cate/create_doc']
    }),
    new HtmlWebpackPlugin({
      title: 'Hello World app',
      filename: 'cate/create_link/page.html',
      template: path.resolve(ROOT_PATH, './pages/cate/create_link/html.js'),
      chunks: ['cate/create_link']
    }),
    new HtmlWebpackPlugin({
      title: 'Hello World app',
      filename: 'cate/create_page/page.html',
      template: path.resolve(ROOT_PATH, './pages/cate/create_page/html.js'),
      chunks: ['cate/create_page']
    }),
    new HtmlWebpackPlugin({
      title: 'Hello World app',
      filename: 'cate/edit_doc/page.html',
      template: path.resolve(ROOT_PATH, './pages/cate/edit_doc/html.js'),
      chunks: ['cate/edit_doc']
    }),
    new HtmlWebpackPlugin({
      title: 'Hello World app',
      filename: 'cate/edit_link/page.html',
      template: path.resolve(ROOT_PATH, './pages/cate/edit_link/html.js'),
      chunks: ['cate/edit_link']
    }),
    new HtmlWebpackPlugin({
      title: 'Hello World app',
      filename: 'cate/edit_page/page.html',
      template: path.resolve(ROOT_PATH, './pages/cate/edit_page/html.js'),
      chunks: ['cate/edit_page']
    }),
    new HtmlWebpackPlugin({
      title: 'Hello World app',
      filename: 'copyfrom/index/page.html',
      template: path.resolve(ROOT_PATH, './pages/copyfrom/index/html.js'),
      chunks: ['copyfrom/index']
    }),
    new HtmlWebpackPlugin({
      title: 'Hello World app',
      filename: 'copyfrom/copyfrom_create/page.html',
      template: path.resolve(ROOT_PATH, './pages/copyfrom/copyfrom_create/html.js'),
      chunks: ['copyfrom/copyfrom_create']
    }),
    new HtmlWebpackPlugin({
      title: 'Hello World app',
      filename: 'copyfrom/copyfrom_edit/page.html',
      template: path.resolve(ROOT_PATH, './pages/copyfrom/copyfrom_edit/html.js'),
      chunks: ['copyfrom/copyfrom_edit']
    }),
    new HtmlWebpackPlugin({
      title: 'Hello World app',
      filename: 'user/index/page.html',
      template: path.resolve(ROOT_PATH, './pages/user/index/html.js'),
      chunks: ['user/index']
    }),
    new HtmlWebpackPlugin({
      title: 'Hello World app',
      filename: 'user/user_create/page.html',
      template: path.resolve(ROOT_PATH, './pages/user/user_create/html.js'),
      chunks: ['user/user_create']
    }),
    new HtmlWebpackPlugin({
      title: 'Hello World app',
      filename: 'user/user_edit/page.html',
      template: path.resolve(ROOT_PATH, './pages/user/user_edit/html.js'),
      chunks: ['user/user_edit']
    }),
    new HtmlWebpackPlugin({
      title: 'Hello World app',
      filename: 'link/index/page.html',
      template: path.resolve(ROOT_PATH, './pages/link/index/html.js'),
      chunks: ['link/index']
    }),
    new HtmlWebpackPlugin({
      title: 'Hello World app',
      filename: 'link/link_create/page.html',
      template: path.resolve(ROOT_PATH, './pages/link/link_create/html.js'),
      chunks: ['link/link_create']
    }),
    new HtmlWebpackPlugin({
      title: 'Hello World app',
      filename: 'link/link_edit/page.html',
      template: path.resolve(ROOT_PATH, './pages/link/link_edit/html.js'),
      chunks: ['link/link_edit']
    }),
    new HtmlWebpackPlugin({
      title: 'Hello World app',
      filename: 'docManage/index/page.html',
      template: path.resolve(ROOT_PATH, './pages/docManage/index/html.js'),
      chunks: ['docManage/index']
    }),
    new HtmlWebpackPlugin({
      title: 'Hello World app',
      filename: 'docManage/doc_create/page.html',
      template: path.resolve(ROOT_PATH, './pages/docManage/doc_create/html.js'),
      chunks: ['docManage/doc_create']
    }),
    new HtmlWebpackPlugin({
      title: 'Hello World app',
      filename: 'docManage/doc_edit/page.html',
      template: path.resolve(ROOT_PATH, './pages/docManage/doc_edit/html.js'),
      chunks: ['docManage/doc_edit']
    }),
    new HtmlWebpackPlugin({
      title: 'Hello World app',
      filename: 'configManage/index/page.html',
      template: path.resolve(ROOT_PATH, './pages/configManage/index/html.js'),
      chunks: ['configManage/index']
    }),
    new HtmlWebpackPlugin({
      title: 'Hello World app',
      filename: 'configManage/config_create/page.html',
      template: path.resolve(ROOT_PATH, './pages/configManage/config_create/html.js'),
      chunks: ['configManage/config_create']
    }),
    new HtmlWebpackPlugin({
      title: 'Hello World app',
      filename: 'configManage/config_edit/page.html',
      template: path.resolve(ROOT_PATH, './pages/configManage/config_edit/html.js'),
      chunks: ['configManage/config_edit']
    }),
    new HtmlWebpackPlugin({
      title: 'Hello World app',
      filename: 'configSetting/index/page.html',
      template: path.resolve(ROOT_PATH, './pages/configSetting/index/html.js'),
      chunks: ['configSetting/index']
    }),
    new HtmlWebpackPlugin({
      title: 'Hello World app',
      filename: 'home/index/page.html',
      template: path.resolve(ROOT_PATH, './pages/home/index/html.js'),
      chunks: ['home/index']
    }),
    new HtmlWebpackPlugin({
      title: 'Hello World app',
      filename: 'home/password/page.html',
      template: path.resolve(ROOT_PATH, './pages/home/password/html.js'),
      chunks: ['home/password']
    })
    
    
  ]
  
};