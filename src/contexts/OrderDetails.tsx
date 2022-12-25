import React, {createContext, useContext, useState} from "react";
import {EOptionType} from "../pages/entry/Options";
import {pricePerItem} from "../constants";

// @ts-ignore
const OrderDetails = createContext()

export const useOrderDetails = () => {
  const ctxValue = useContext(OrderDetails)

  if(!ctxValue) {
    throw new Error('useOrderDetails must to be called from within an OrderDetailsProvider')
  }

  return ctxValue
}

export const OrderDetailsProvider = (props) => {
  const [optionCounts, setOptionsCounts] = useState({
    scoops: {},
    toppings: {}
  })

  const updateItemCount = (itemName: string, newItemCount: number, optionType: EOptionType) => {
    const newOptionCounts = { ...optionCounts }

    newOptionCounts[optionType][itemName] = newItemCount
    setOptionsCounts(newOptionCounts)
  }

  const resetOrder = () => setOptionsCounts({ scoops: {}, toppings: {} })

  const calculateTotal = (optionType: EOptionType) => {
    // @ts-ignore
    const items: number[] = Object.values(optionCounts[optionType])

    const totalCount: number = items.reduce((total: number, current: number) => current + total, 0)

    return totalCount * pricePerItem[optionType]
  }

  const totals = {
    [EOptionType.scoops]: calculateTotal(EOptionType.scoops),
    [EOptionType.toppings]: calculateTotal(EOptionType.toppings)
  }

  const initValue = {optionCounts, totals, updateItemCount, resetOrder}

  return <OrderDetails.Provider value={initValue} {...props} />
}
