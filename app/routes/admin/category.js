const { CategoryController } = require("../../http/controllers/admin/catrgory.controller");

const router = require("express").Router();

router.post('/create',CategoryController.addCategory);

router.get('/parents',CategoryController.getAllParents);
router.get('/childern/:parent',CategoryController.getChildParent);

router.get('/all',CategoryController.getAllCategory);


router.get('/list-of-all',CategoryController.getAllCategoryWithoutPopulate);

router.get('/:id',CategoryController.getCategorybyId);

router.patch('/update/:id',CategoryController.editCategory);

router.delete('/remove/:id',CategoryController.removeCategory);

module.exports = {
  AdminApiCategoryRouter: router,
};
