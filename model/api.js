const readJSON = require('read-json');
const path = require('path');

const booksFile = path.resolve(__dirname, '../data/books.json');
const categoriesFile = path.resolve(__dirname, '../data/categories.json');

exports.fetchBooks = () => {
  return new Promise((resolve, reject) => readJSON(booksFile, (error, books) => {
    if (error) {
      return reject(error);
    }

    resolve(books);
  }));
};

exports.fetchCategories = () => {
  return new Promise((resolve, reject) => readJSON(categoriesFile, (error, categories) => {
    if (error) {
      return reject(error);
    }

    resolve(categories);
  }));
};
