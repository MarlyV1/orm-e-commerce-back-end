const router = require('express').Router();
const { where } = require('sequelize');
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  try {
    const allTags = await Tag.findAll({
      include: [{ model: Product }]
    })
    res.status(200).json(allTags);
  } catch (error) {
    res.status(400).json(error)
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  try {
    const findOneTag = await Tag.findOne({
      where: { id: req.params.id},
      include: [{ model: Product }]
    })
    res.status(200).json(findOneTag);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const newTag = await Tag.create(req.body)
    res.status(200).json(newTag);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updateTag = await Tag.update(req.body, {
      where: {id: req.params.id}
    })
    res.status(200).json(updateTag);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deletedTag = await Tag.destroy({
      where: {id: req.params.id}
    })
    res.status(200).json(deletedTag);

    if(!deletedTag) {
      res.status(400).json('No tag is found with that id');
    }
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
