import { IFileType } from "@src/services/config/types";
import { StringifyProperties } from "@src/types/global";

export type ActionOnClickActionsType = "delete" | "edit" | "details" | "mutate";
export type OnClickActionsType = (
  action: ActionOnClickActionsType,
  typeFile?: StringifyProperties<IFileType> | IFileType
) => void;
