import { Hono } from "hono";
import PositionController from "../controllers/positions-controller.js";
import PositionRepositories from "../repositories/positions-repositories.js";
import PositionCommandService from "../services/positions-commands.js";
import PositionQueryService from "../services/positions-queries.js";

const positionRepositories = new PositionRepositories();
const positionCommandService = new PositionCommandService(positionRepositories);
const positionQueryService = new PositionQueryService(positionRepositories);
const positionsController = new PositionController(
  positionCommandService,
  positionQueryService
);

const positionsRoute = new Hono({ strict: false });

positionsRoute.post("/positions", positionsController.CreatePosition);
positionsRoute.get("/position/:id", positionsController.GetPositionById);
positionsRoute.get(
  "/position/children/:id",
  positionsController.GetPositionChildren
);

export default positionsRoute;
