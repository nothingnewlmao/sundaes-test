import React, {FC, useEffect, useState} from 'react'
import {EStatuses} from "../../contexts/AppState";
import axios from "axios";
import {Button} from "react-bootstrap";
import {BASE_URL} from "../entry/Options";
import {useOrderDetails} from "../../contexts/OrderDetails";
import {ICurrentBlock} from "../../types";
import {p} from "msw/lib/SetupApi-b2f0e5ac";

export const Confirmation: FC<ICurrentBlock> = ({ changePhase }) => {
  const { resetOrder } = useOrderDetails()

  const [number, setNumber] = useState<string>('')
  const [isLoading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    setLoading(true)

    axios
      .post(`${BASE_URL}/order`)
      .then(({ data }) => {
        setNumber(data.orderId)

        resetOrder()
      })
      .catch(() => {
        //todo: errors handler
      })
      .finally(() => setLoading(false))
  }, [resetOrder])

  return (
    <>
      {isLoading && (<p>Loading...</p>)}
      {(!isLoading && number) && (<h1>Thank you for your order!</h1>)}
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
