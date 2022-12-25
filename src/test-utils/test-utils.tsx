import React, { ReactNode } from "react";
import { render } from '@testing-library/react'
import {OrderDetailsProvider} from "../contexts/OrderDetails";
import {AppStateProvider} from "../contexts/AppState";

const AllProviders = ({ children }: { children: ReactNode }) => (
  <AppStateProvider>
    <OrderDetailsProvider>
      {children}
    </OrderDetailsProvider>
  </AppStateProvider>
)

const renderWithContext = (ui, options) => render(ui, {
  wrapper: AllProviders,
  ...options
})

export * from '@testing-library/react'
export {renderWithContext as render}
