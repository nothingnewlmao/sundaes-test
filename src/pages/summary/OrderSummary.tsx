import React from "react";
import SummaryForm from "./SummaryForm";
import {EOptionType} from "../entry/Options";
import { formatCurrency} from "../../utilities";
import {useOrderDetails} from "../../contexts/OrderDetails";
import {EStatuses, useAppStateCtx} from "../../contexts/AppState";

const OrderSummary = () => {
  // @ts-ignore
  const { totals, optionCounts } = useOrderDetails()
  const {state} = useAppStateCtx()

  // @ts-ignore
  const scoops = Object.entries(optionCounts[EOptionType.scoops])
    .map(([key, value ]: [key: string, value: number]) => (
      <li key={key}>
        {value} {key}
      </li>
  ))

  const toppings = Object.keys(optionCounts[EOptionType.toppings])
    .map((key) => <li key={key}>{key}</li>)

  return (state !== EStatuses.review) ? null : (
    <>
      <h1>order summary</h1>
      <h2>Scoops: {formatCurrency(totals[EOptionType.scoops])}</h2>
      <ul>
        {scoops}
      </ul>
      <h2>Toppings: {formatCurrency(totals[EOptionType.toppings])}</h2>
      <ul>
        {toppings}
      </ul>
      <SummaryForm />
    </>
  )
}

export default OrderSummary
