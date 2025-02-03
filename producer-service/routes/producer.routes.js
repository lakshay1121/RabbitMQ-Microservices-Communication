import { Router } from "express";
import { SendMessage, TestProducerRouter } from "../controller/producer.controller.js";

const router = Router();

router.route('/postMessage').post(SendMessage);
router.route('/getProducer').get(TestProducerRouter)

export default router;
