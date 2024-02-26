const path = require('path');
const fs = require('fs');
const CopyPlugin = require("copy-webpack-plugin");

const walk_directory = (dir) =>{
   return files = fs.readdirSync(dir).flatMap(file => {
       const absolute = path.join(dir, file);
       if (fs.statSync(absolute).isDirectory()) return walk_directory(absolute);
       else return absolute;
   });
};

const paths = {
   ts: path.resolve(__dirname, "..", "src", "listeners.ts"),
   css_directories: path.resolve(__dirname, "..", "src/styles")
};

const intermediate_files = walk_directory(paths.css_directories).concat(paths.ts);

module.exports = {
    mode: 'development',
    entry: intermediate_files,
    output: {
        path: path.join(__dirname, '../dist'), 
        filename: 'js/app.min.js',
    },
    module: {
        rules: [
         {
            test: /\.ts?$/,
            loader: "ts-loader",
            exclude: /node_modules/,
         },
         {
            test: /\.scss$/,
            exclude: /node_modules/,
            use: [{
               loader: 'file-loader',
               options: { outputPath: 'css/', name: '[name].min.css'}
            },
               'sass-loader'
            ]
         }
        ]
    },
    plugins: [
      new CopyPlugin({
         patterns: [
          {from: ".", to: ".", context: "assets"},
          {from: "src/index.html", to: "."},
          {from: "dist/css/*.css", to: "bundled-css/styles.css",
          transformAll(assets) {
            const result = assets.reduce((accumulator, asset) => {
               if(!asset.sourceFilename.endsWith("reset.min.css")){
                  const content = asset.data;
                  accumulator = `${accumulator}${content}\n`;
               }
               return accumulator;
            }, "");
            return result;
          },
			},
         {from: "dist/css/reset.min.css", to: "bundled-css/reset.css"},
        ]
      })
   ],
   watchOptions: {
      aggregateTimeout: 600,
      ignored: '**/node_modules'
  }
};