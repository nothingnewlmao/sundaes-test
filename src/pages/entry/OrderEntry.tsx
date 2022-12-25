import React, {FC} from "react";
import Options, {EOptionType} from "./Options";
import {formatCurrency} from "../../utilities";
import {useOrderDetails} from "../../contexts/OrderDetails";
import {Button} from "react-bootstrap";
import {EStatuses, useAppStateCtx} from "../../contexts/AppState";

const OrderEntry: FC = () => {
  // @ts-ignore
  const { totals } = useOrderDetails()
  const grandTotal = totals[EOptionType.scoops] + totals[EOptionType.toppings]

  const { state, updateState } = useAppStateCtx()

  return (state !== EStatuses.inProgress) ? null : (
    <>
      <h1>DesIgn SunDaes</h1>
      <h2>Grand total: {formatCurrency(grandTotal)}</h2>
      <Options optionType={EOptionType.scoops}/>
      <Options optionType={EOptionType.toppings}/>
      <Button onClick={() => updateState(EStatuses.review)}>Create order</Button>
    </>
  )
}

export default OrderEntry
