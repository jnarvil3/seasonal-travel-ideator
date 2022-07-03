const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: path.join(__dirname, "src",'index.js'),
    output: {
        path: path.resolve(__dirname, "dist")
    },
    mode: 'development',
    devServer: {
        host: 'localhost',
        port: 8080,
        // enable HMR on the devServer
        hot: true,
        // fallback to root for other urls
        historyApiFallback: true,
    
        static: {
          // match the output path
          directory: path.resolve(__dirname, 'dist'),
          // match the output 'publicPath'
          publicPath: '/',
        },
    
        headers: { 'Access-Control-Allow-Origin': '*' },
        /**
         * proxy is required in order to make api calls to
         * express server while using hot-reload webpack server
         * routes api fetch requests from localhost:8080/api/* (webpack dev server)
         * to localhost:3000/api/* (where our Express server is running)
         */
        proxy: {
          '/itinerary/**': {
            target: 'http://localhost:3000/',
            secure: false,
          }
          ,
          '/assets/**': {
            target: 'http://localhost:3000/',
            secure: false,
          },
        },
      },
    module: {
        rules: [
            {
                test: /.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader",
                  options: {
                      presets: ['@babel/preset-env', '@babel/preset-react']
                  }
                }  
            }, {
                test: /\.s[ac]ss$/i,
                use: [
                  // Creates `style` nodes from JS strings
                  "style-loader",
                  // Translates CSS into CommonJS
                  "css-loader",
                  // Compiles Sass to CSS
                  "sass-loader",
                ],
              }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "src", "index.html")
        })
    ],
    resolve: {
        // Enable importing JS / JSX files without specifying their extension
        extensions: ['.js', '.jsx'],
      }
}