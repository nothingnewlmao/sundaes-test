import {EStatuses} from "./contexts/AppState";

export interface ICurrentBlock {
  changePhase: (status: EStatuses) => void
}

