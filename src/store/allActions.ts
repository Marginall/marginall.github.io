import { citiesActions } from "../slices/citiesSlice";
import { cityActions } from "../slices/citySlice";
import { themeActions } from "../slices/themeSlice";

export const allActions = {
  ...citiesActions,
  ...themeActions,
  ...cityActions,
};
