const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try {
    const allCategories = await Category.findAll({
      include: [{ model: Product }]
    })
  } catch (error) {
    res.status(400).json(error.message)
    console.error(error.message);
  }
  
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try {
    const findOneCategory = await Category.findOne({
      where: {category: req.body.category},
      include: [{ model: Product }]
    })
    res.status(200).json(findOneCategory);
  } catch (error) {
    res.status(400).json(error);
    console.error(error.message);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create({
    category_name: req.body
    })
    res.status(200).json(newCategory);
  } catch (error) {
    res.status(400).json(error);
    console.error(error.message);
  }  
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value

});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
