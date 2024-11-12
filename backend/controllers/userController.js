import { accessChecker, genQr } from "../services/userServices.js";
import { ApiError } from "../errors/ApiError.js";
import * as fs from "fs";

export async function generateQr(req, res, next) {
  try {
    const url = await genQr(req.body);
    res.status(201).json({ message: "Event saved.", url: url });
  } catch (err) {
    if ((err.message = "User already exists")) {
      next(ApiError.badRequest(err.message));
    } else {
      next(ApiError.badRequest(err.message));
    }
  }
}

export async function getUrl(req, res, next) {
  try {
    const filePath = "url.json";

    fs.readFile(filePath, "utf-8", (err, data) => {
      if (err) {
        return res.status(500).json({ message: "Failed to retrieve URL" });
      }

      if (!data) {
        return res.status(200).json({ url: null }); // Send a response with a null URL
      }

      try {
        const urlData = JSON.parse(data);
        res.status(200).json(urlData);
      } catch (parseError) {
        res.status(500).json({ message: "Invalid JSON format in URL file" });
      }
    });
  } catch (err) {
    if ((err.message = "User already exists")) {
      next(ApiError.badRequest(err.message));
    } else {
      next(ApiError.badRequest(err.message));
    }
  }
}

export async function checkAccess(req, res, next) {
  try {
    const access = accessChecker(req.body, req.params);
    res.status(201).json({ message: "Event saved.", accessGranted: access });
  } catch (err) {
    if ((err.message = "User already exists")) {
      next(ApiError.badRequest(err.message));
    } else {
      next(ApiError.badRequest(err.message));
    }
  }
}