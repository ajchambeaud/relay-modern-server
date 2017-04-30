const api = require('./api');

exports.getAll = () => api.fetchCategories();

exports.getById = id => api.fetchCategories().then(categories => categories.find(category => category.id == id));
