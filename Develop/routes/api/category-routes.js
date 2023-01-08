const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {

  // find all categories
  // be sure to include its associated Products
  // will find all categories


  // console.log("LANDING PAGE TEST");


  Category.findAll ({
    include: [
      { model: Product }
    ]
  })

  .then(catData => res.json(catData))
  .catch(err => {
    console.log("Error!");
    console.log(err);
  });
});

router.get('/:id', (req, res) => {

  // find one category by its `id` value
  // be sure to include its associated Products
  // REQUIRES PARAMETERS
  // will only find one category based on cat ID
  Category.findOne ({
    where: {
      id: req.params.id
    },
    include: [
      { model: Product }
    ]
  })

  // callback functions
  .then(catData => {
    if (!catData) {
      console.log("No category found.")
      res.status(404).json({ message: 'No category found.' });
      return;
  }
    res.json(catData)
  })
  .catch(err => {
    console.log("Error!")
    console.log(err);
    res.status(500).json(err);
  });
});

router.post('/', (req, res) => {

  // create a new category

  // console.log("TESTING POST /");

  Category.create({
    category_name: req.body.category_name
  })

  .then(catData => res.json(catData))

  .catch(err => {
    console.log("Error!");
    console.log(err);
    res.status(500).json(err);
  });
});

router.put('/:id', (req, res) => {

  // update a category by its `id` value
  // can get by specific id with /:id
  Category.update( 
    {
      category_name: req.body.category_name
    },
    {
      where: {
        id: req.params.id
      }
    } 
  )

  .then(catData => {
    if (!catData) {
        res.status(404).json({ message: 'No category found' });
        return;
    }
    res.json(catData);
  })

  .catch(err => {
    console.log("Error!");
    console.log(err);
    res.status(500).json(err);
  });
});

router.delete('/:id', (req, res) => {

  // delete a category by its `id` value

  // console.log("TESTING 2");

  Category.destroy({
    where: {
      id: req.params.id
    }
  })

  .then(catData => {
    if (!catData) {
        res.status(404).json({ message: 'No category found.' });
        return;
    }
    res.json(catData);
    })

    .catch(err => {
      console.log("Error!");
      console.log(err);
      res.status(500).json(err);
  });
});


// exports via router methods/API's
module.exports = router;

// console.log("TESTING 3");