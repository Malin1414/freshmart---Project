require('dotenv').config();
const { connect } = require('../db/mongo');
const Product = require('../models/Product');
const Category = require('../models/Category');

async function seed() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('MONGODB_URI not set in env');
    process.exit(1);
  }
  await connect(uri);
  console.log('Connected to MongoDB for seeding');

  await Product.deleteMany({});
  await Category.deleteMany({});

  const categories = [
    { slug: 'groceries', name: 'Groceries' },
    { slug: 'home', name: 'Home' }
  ];
  await Category.insertMany(categories);

  const products = [
    { title: 'Sample Product 1', price: 9.99, category: 'groceries' },
    { title: 'Sample Product 2', price: 19.99, category: 'home' }
  ];
  await Product.insertMany(products);

  console.log('Seeding complete');
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
