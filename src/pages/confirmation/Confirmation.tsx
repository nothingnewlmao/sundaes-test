import React, {FC, useEffect, useState} from 'react'
import {EStatuses} from "../../contexts/AppState";
import axios from "axios";
import {Button} from "react-bootstrap";
import {BASE_URL} from "../entry/Options";
import {useOrderDetails} from "../../contexts/OrderDetails";
import {ICurrentBlock} from "../../types";

export const Confirmation: FC<ICurrentBlock> = ({ changePhase }) => {
  const { resetOrder } = useOrderDetails()

  const [number, setNumber] = useState<string>('')

  useEffect(() => {
      axios
        .post(`${BASE_URL}/order`, {
        params: {}
      })
        .then(({ data }) => {
          setNumber(data.orderId)

          resetOrder()
        })
        .catch(() => {
          //todo: errors handler
        })
  }, [resetOrder])

  return (
    <>
      {number && (
        <h1>order number: {number}</h1>
      )}
      <Button
        onClick={() => changePhase(EStatuses.inProgress)}
      >
        CREATE NEW ORDER
      </Button>
    </>
  )
}
