import React from "react";
import {Container} from "react-bootstrap";
import {AppStateProvider} from "./contexts/AppState";
import {OrderDetailsProvider} from "./contexts/OrderDetails";
import OrderEntry from "./pages/entry/OrderEntry";
import OrderSummary from "./pages/summary/OrderSummary";
import {Confirmation} from "./pages/confirmation/Confirmation";

const App = () => (
  <Container>
    <AppStateProvider>
      <OrderDetailsProvider>
        <OrderEntry />
        <OrderSummary />
      </OrderDetailsProvider>
      <Confirmation />
    </AppStateProvider>
  </Container>
)

export default App;
