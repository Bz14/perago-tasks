import type { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import positionCommandService from "../services/positions-commands.js";
import positionQueryService from "../services/positions-queries.js";
import type { PositionControllerInterface } from "../domain/interfaces/position-interface.js";

const CreatePosition = async (c: Context): Promise<Response> => {
  try {
    const { name, description, parentId } = await c.req.json();
    const user = c.req.user;
    const result = await positionCommandService.CreatePosition(
      user.id,
      name,
      description,
      parentId
    );

    return c.json(
      {
        data: result,
        message: "Position created successfully.",
      },
      201
    );
  } catch (error: Error | any) {
    throw new HTTPException(error.status, { message: error.message });
  }
};

const UpdatePosition = async (c: Context): Promise<Response> => {
  try {
    const id = c.req.param("id");
    const { name, description, parentId } = await c.req.json();
    const userId = c.req.user.id;
    const result = await positionCommandService.UpdatePosition(
      userId,
      id,
      name,
      description,
      parentId
    );

    return c.json({
      data: result,
      message: "Position updated successfully.",
    });
  } catch (error: Error | any) {
    throw new HTTPException(error.status, { message: error.message });
  }
};

const DeletePosition = async (c: Context): Promise<Response> => {
  try {
    const id = c.req.param("id");
    const userId = c.req.user.id;
    const position = await positionCommandService.DeletePosition(id, userId);
    return c.json({
      data: position,
      message: "Position deleted successfully",
    });
  } catch (error: Error | any) {
    throw new HTTPException(error.status, { message: error.message });
  }
};

const GetPositionById = async (c: Context): Promise<Response> => {
  try {
    const id = c.req.param("id");
    const userId = c.req.user.id;
    const position = await positionQueryService.GetPositionById(id, userId);
    if (!position) {
      return c.json({ data: null, message: "Position not found" });
    }
    return c.json({ data: position, message: "Position detail fetched" });
  } catch (error: Error | any) {
    throw new HTTPException(error.status, { message: error.message });
  }
};

const GetPositionChildren = async (c: Context): Promise<Response> => {
  try {
    const id = c.req.param("id");
    const userId = c.req.user.id;
    const children: any = await positionQueryService.GetChildrenPositions(
      id,
      userId
    );
    return c.json({ data: children, message: "Children positions fetched." });
  } catch (error: Error | any) {
    throw new HTTPException(error.status, { message: error.message });
  }
};

const GetAllPositions = async (c: Context): Promise<Response> => {
  try {
    const userId = c.req.user.id;
    const positions = await positionQueryService.GetAllPositions(userId);
    return c.json({ data: positions, message: "All positions fetched" });
  } catch (error: Error | any) {
    throw new HTTPException(error.status, { message: error.message });
  }
};

const GetPositionChoices = async (c: Context): Promise<Response> => {
  try {
    const userId = c.req.user.id;
    const positions = await positionQueryService.GetPositionChoices(userId);
    if (positions.length == 0) {
      return c.json({ data: null, message: "No positions found" });
    }
    return c.json({ data: positions, message: "Position choices fetched" });
  } catch (error: Error | any) {
    throw new HTTPException(error.status, { message: error.message });
  }
};

const GetPositionsList = async (c: Context): Promise<Response> => {
  try {
    const userId = c.req.user.id;
    const page = c.req.query("page") || "1";
    const limit = c.req.query("limit") || "4";
    const positions = await positionQueryService.GetPositionsList(
      userId,
      page,
      limit
    );
    return c.json({
      data: positions,
      message: "Positions list fetched",
    });
  } catch (error: Error | any) {
    throw new HTTPException(error.status, { message: error.message });
  }
};

const positionController: PositionControllerInterface = {
  CreatePosition,
  UpdatePosition,
  DeletePosition,
  GetPositionById,
  GetPositionChildren,
  GetAllPositions,
  GetPositionChoices,
  GetPositionsList,
};

export default positionController;
