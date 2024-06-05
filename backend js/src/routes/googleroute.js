import { Router } from "express";
import { callback, initiate } from "../controllers/google.js";


const googleroute = Router();

googleroute.get("/initiate", initiate);
googleroute.get("/callback", callback);


export default googleroute;