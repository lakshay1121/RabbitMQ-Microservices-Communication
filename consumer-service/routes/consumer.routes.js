import { Router } from "express";
import { GetMessage } from "../controller/consumer.controller.js";

const router = Router();

router.route('/getMessage').get(GetMessage);


export default router;
