import express from "express";
import packingentryController from "./packing.controller.js";
import propect from "../../middlewares/auth.middleware.js";
import authorizaRoles from "../../middlewares/role.middleware.js";

const router = express.Router();

// Confirmer: create entry
router.post(
  "/create-packing-entries",
  propect,
  authorizaRoles("confirmer"),
  packingentryController.createPackingEntry,
);

// Confirmer: get own entries
router.get(
  "/get-packing-entries",
  propect,
  authorizaRoles("confirmer"),
  packingentryController.getPackingEntries,
);

// Confirmer: update own entry
router.patch(
  "/update-packing-entries/:id",
  propect,
  authorizaRoles("confirmer"),
  packingentryController.updatePackingEntries,
);

// Confirmer: delete own entry
router.delete(
  "/delete-packing-entries/:id",
  propect,
  authorizaRoles("confirmer"),
  packingentryController.deletePackingEnteris,
);

// Businessman: get entries assigned to them
router.get(
  "/get-businessman-entries",
  propect,
  authorizaRoles("businessman"),
  packingentryController.getPackingEntriesInBusinessman,
);

// Businessman: update entry assigned to them
router.patch(
  "/update-businessman-entries/:id",
  propect,
  authorizaRoles("businessman"),
  packingentryController.updatePackingEntriesInBusiness,
);

// Businessman: delete entry assigned to them
router.delete(
  "/delete-businessman-entries/:id",
  propect,
  authorizaRoles("businessman"),
  packingentryController.deletePackingEnterisInBusiness,
);

// Admin: get ALL entries
router.get(
  "/get-all-entries",
  propect,
  authorizaRoles("admin"),
  packingentryController.getAllEnteries,
);

// Shared: get dashboard stats
router.get(
  "/dashboard-stats",
  propect,
  packingentryController.getDashboardStats,
);

export default router;
