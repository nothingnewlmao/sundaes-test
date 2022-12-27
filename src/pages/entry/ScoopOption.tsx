import React, {FC, useState} from "react";
import {BASE_URL, EOptionType} from "./Options";
import {Col, Form, Row} from "react-bootstrap";
import { useOrderDetails } from "../../contexts/OrderDetails";

const ScoopOption: FC<IScoopOption> = ({ name, imageUrl }) => {
  // @ts-ignore
  const { updateItemCount } = useOrderDetails()

  const [isInvalid, setInvalid] = useState<boolean>(false)


  const handleChange = (e) => {
    if (e.target.value === '') {
      return
    }
    const isNumberInvalid = (num: number): boolean => num < 0 || num > 5

    const count = parseInt(e.target.value)

    setInvalid(isNumberInvalid(count))

    if(isNumberInvalid(count)) {
      e.preventDefault()
      return
    } else {
      updateItemCount(name, count, EOptionType.scoops)
    }
  }

  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: 'center' }}>
      <img src={`${BASE_URL}${imageUrl}`} alt={`${name} scoop`}/>
      <Form.Group controlId={`${name}-count`} as={Row}>
      <Form.Label>{name}</Form.Label>
        <Form.Control
          type="number"
          defaultValue={0}
          isInvalid={isInvalid}
          onChange={handleChange} />
      </Form.Group>
    </Col>
  )
}

export interface IScoopOption {
  name: string,
  imageUrl: string,
}

export default ScoopOption
