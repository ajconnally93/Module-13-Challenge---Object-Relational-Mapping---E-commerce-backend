const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {

  // console.log("FIND ALL TEST");

  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    include: [
      {
        model: Product,
        through: ProductTag,
        as: 'productTag_product'
      }
    ]
  })

  .then(data => res.json(data))

  .catch(err => {
    console.log("Error!");
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/:id', (req, res) => {

  // find a single tag by its `id`
  // be sure to include its associated Product data

  // console.log("/:ID TEST - FIND ONE");

  Tag.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Product,
        through: ProductTag,
        as: 'productTag_product'
      }
    ]
  })

  .then(data => {
    if (!data) {
      res.status(404).json({ message: 'No Tag found.' });
      return;
    }
    res.json(data);
  })

  .catch(err => {
    console.log("Error!");
    console.log(err);
    res.status(500).json(err);
  });
});

router.post('/', (req, res) => {

  // console.log("TEST POST /");

  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name
  })

  .then(data => res.json(data))

  .catch(err => {
    console.log("Error!");
    console.log(err);
    res.status(500).json(err);
  });
});

router.put('/:id', (req, res) => {

  // update a tag's name by its `id` value
  Tag.update(
    {
      tag_name: req.body.tag_name
    },
    {
      where: {
        id: req.params.id
      }
    }
  )

  .then(data => {
    if (!data) {
        console.log("No tag data found.");
        res.status(404).json({ message: 'No tag found.' });
        return;
    }
    res.json(data);
  })

  .catch(err => {
    console.log("Error!");
    console.log(err);
    res.status(500).json(err);
  });
});

router.delete('/:id', (req, res) => {
  
  // console.log("TEST DELETE");

  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })

  .then(data => {
    if (!data) {
        res.status(404).json({ message: 'No tag found.' });
        return;
    }
    res.json(data);
    })

    .catch(err => {
      console.log("Error!");
      console.log(err);
      res.status(500).json(err);
  });
});

module.exports = router;
