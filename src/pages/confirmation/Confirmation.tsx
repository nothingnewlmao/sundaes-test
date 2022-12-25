import React, {useEffect, useState} from 'react'
import {EStatuses, useAppStateCtx} from "../../contexts/AppState";
import axios from "axios";
import {Button} from "react-bootstrap";
import {BASE_URL} from "../entry/Options";

export const Confirmation = () => {
  const { state, updateState } = useAppStateCtx()

  const [number, setNumber] = useState<string>('')

  useEffect(() => {
    if (state === EStatuses.complete) {
      axios
        .post(`${BASE_URL}/order`, {
        params: {}
      })
        .then(({ data }) => setNumber(data.orderId))
        .catch(() => {
          //todo: errors handler
        })
    }
  }, [state])

  return state !== EStatuses.complete ? null : (
    <>
      {number && (
        <h1>order number: {number}</h1>
      )}
      <Button
        onClick={() => updateState(EStatuses.inProgress)}
      >
        CREATE NEW ORDER
      </Button>
    </>
  )
}
