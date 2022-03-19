import express from 'express';
const router = express.Router();
import homeController from '../controllers/homeController.js';
import { aboutController } from '../controllers/aboutController.js';

router.get('/', homeController.getAllDoc);
router.post('/', homeController.createDoc);
router.get('/login', homeController.loginUser);
router.post('/login', homeController.verifiyUser);
router.get('/edit/:id', homeController.editDoc);
router.post('/update/:id', homeController.updateDocById);
router.get('/delete/:id', homeController.deleteDocById);
router.get('/about', aboutController);


export default router;



