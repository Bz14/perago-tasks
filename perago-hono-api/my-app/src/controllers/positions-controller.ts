import type { Context } from "hono";
import { HTTPException } from "hono/http-exception";

import positionCommandService from "../services/positions-commands.js";
import positionQueryService from "../services/positions-queries.js";
import type { PositionControllerInterface } from "../domain/interfaces/position-interface.js";

const CreatePosition = async (c: Context): Promise<Response> => {
  try {
    const { name, description, parentId } = await c.req.json();
    const result = await positionCommandService.CreatePosition(
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
    console.log(await c.req.json());
    const result = await positionCommandService.UpdatePosition(
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
    console.log(error);
    throw new HTTPException(error.status, { message: error.message });
  }
};

const DeletePosition = async (c: Context): Promise<Response> => {
  try {
    const id = c.req.param("id");
    const position = await positionCommandService.DeletePosition(id);
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
    const position = await positionQueryService.GetPositionById(id);
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
    const children: any = await positionQueryService.GetChildrenPositions(id);
    return c.json({ data: children, message: "Children positions fetched." });
  } catch (error: Error | any) {
    throw new HTTPException(error.status, { message: error.message });
  }
};

const GetAllPositions = async (c: Context): Promise<Response> => {
  try {
    const positions = await positionQueryService.GetAllPositions();
    return c.json({ data: positions, message: "All positions fetched" });
  } catch (error: Error | any) {
    throw new HTTPException(error.status, { message: error.message });
  }
};

const GetPositionChoices = async (c: Context): Promise<Response> => {
  try {
    const positions: any = await positionQueryService.GetPositionChoices();
    if (positions.length == 0) {
      return c.json({ data: null, message: "No positions found" });
    }
    return c.json({ data: positions, message: "Position choices fetched" });
  } catch (error: Error | any) {
    return c.json({ error: error.message }, 500);
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
};

export default positionController;
