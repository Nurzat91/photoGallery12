import path from 'path';

const rootPath = __dirname;

const config = {
  rootPath,
  publicPath: path.join(rootPath, 'public'),
  mongoose: {
    // db: 'mongodb://localhost/post',
    db: "mongodb://127.0.0.1:27017/post",
  }
};

export default config;