import express from "express";
import { getRecommendations } from "../controllers/recomandation.controller.js";

const router = express.Router();

router.get("/:postId", getRecommendations);

export default router;
