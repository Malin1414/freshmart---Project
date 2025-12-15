const products = [
  { id: 1, title: 'Sample Product 1', price: 9.99, category: 'groceries' },
  { id: 2, title: 'Sample Product 2', price: 19.99, category: 'home' }
];

const categories = [
  { id: 'groceries', name: 'Groceries' },
  { id: 'home', name: 'Home' }
];

const users = [];
const newsletter = [];

let _nextId = 3;
function nextId() { return _nextId++; }

module.exports = { products, categories, users, newsletter, nextId };
