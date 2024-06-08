import express from "express";
import { SemisterRegistrationController } from "./semisterRegistration.controller";
import validateRequest from "../../middelwares/validRequest";
import { SemisterRegistrationValidation } from "./semisterRegistration.validation";

const router = express.Router();

router.get("/", 
    SemisterRegistrationController.getAllSemisterRegistration)

router.get("/:id", 
    SemisterRegistrationController.getSingleSemisterRegistration
)

router.post("/create-semister-registration", 
    validateRequest(SemisterRegistrationValidation.createSemisterRegistrationValidationSchema),
    SemisterRegistrationController.createSemisterRegistration
)

router.patch("/:id",
    validateRequest(SemisterRegistrationValidation.updateSemisterRegistrationValidationSchema),
    SemisterRegistrationController.updateSingleSemisterRegistration
)

// router.delete("/:id" , 
//     SemisterRegistrationController.deleteSemisterRegistration
// )

export const SemisterRegistrationRouter = router;