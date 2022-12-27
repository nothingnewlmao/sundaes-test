import React, {useState} from "react";
import {Container} from "react-bootstrap";
import { FC } from 'react'
import {AppStateProvider, EStatuses} from "./contexts/AppState";
import {OrderDetailsProvider} from "./contexts/OrderDetails";
import OrderEntry from "./pages/entry/OrderEntry";
import OrderSummary from "./pages/summary/OrderSummary";
import {Confirmation} from "./pages/confirmation/Confirmation";
import {ICurrentBlock} from "./types";

const App = () => {
  const [phase, setPhase] = useState<EStatuses>(EStatuses.inProgress)

  let CurrentBlock: FC<ICurrentBlock>

  switch (phase) {
    case EStatuses.inProgress:
      CurrentBlock = OrderEntry
      break
    case EStatuses.review:
      CurrentBlock = OrderSummary
      break
    case EStatuses.complete:
      CurrentBlock = Confirmation
      break
    default:
      CurrentBlock = () => null
  }

  return (<Container>
    <AppStateProvider>
      <OrderDetailsProvider>
        <CurrentBlock changePhase={setPhase} />
      </OrderDetailsProvider>
    </AppStateProvider>
  </Container>)
}

export default App;
