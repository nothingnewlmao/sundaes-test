import React, {createContext, useContext, useState} from "react";

export enum EStatuses {
  inProgress = 'inProgress',
  review = 'review',
  complete = 'complete'
}

// @ts-ignore
const AppStateContext = createContext<IAppStateCtx>({
  state: EStatuses.inProgress,
  updateState: () => {}
})

export const useAppStateCtx = () => {
  const ctxVal = useContext(AppStateContext)

  if(!ctxVal) {
    throw new Error('only inside AppStateContext Provider!')
  }

  return ctxVal
}

export const AppStateProvider = (props) => {
  const [state, setState] = useState<EStatuses>(EStatuses.inProgress)

  const value: IAppStateCtx = {
    state,
    updateState: setState,
  }

  return (
    <AppStateContext.Provider value={value} {...props} />
  )
}

export interface IAppStateCtx {
  state: EStatuses,
  updateState: (EStatuses) => void
}
