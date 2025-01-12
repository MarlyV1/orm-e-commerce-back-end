const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try {
    const allCategories = await Category.findAll({
      include: [{ model: Product }]
    })
    res.status(200).json(allCategories);
  } catch (error) {
    res.status(400).json(error.message)
    console.error(error.message);
  }
  
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try {
    const findOneCategory = await Category.findOne({
      where: {id: req.params.id},
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
    const newCategory = await Category.create(req.body)
    res.status(200).json(newCategory);
  } catch (error) {
    res.status(400).json(error);
    console.error(error.message);
  }  
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const updateCategory = await Category.update( req.body, {
      where: {
        id: req.params.id
      }
    })
    res.status(200).json(updateCategory);
  } catch (error) {
    res.status(400).json(error);
    console.error(error.message);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const deletedCategory = await Category.destroy({
      where: {
        id: req.params.id
      }
    })
    res.status(200).json(deletedCategory);

    if(!deletedCategory){
      res.status(400).json({message: "No category found with that id"});
      return;
    }

  } catch (error) {
    res.status(400).json(error);
    console.error(error.message)
  }
  
});

module.exports = router;
