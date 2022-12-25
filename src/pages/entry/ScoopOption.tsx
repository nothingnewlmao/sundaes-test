import React,  {FC} from "react";
import {BASE_URL, EOptionType} from "./Options";
import {Col, Form, Row} from "react-bootstrap";
import { useOrderDetails } from "../../contexts/OrderDetails";

const ScoopOption: FC<IScoopOption> = ({ name, imageUrl }) => {
  // @ts-ignore
  const { updateItemCount } = useOrderDetails()

  const handleChange = (e) => updateItemCount(name, parseInt(e.target.value), EOptionType.scoops)

  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: 'center' }}>
      <img src={`${BASE_URL}${imageUrl}`} alt={`${name} scoop`}/>
      <Form.Group controlId={`${name}-count`} as={Row}>
      <Form.Label>{name}</Form.Label>
        <Form.Control type="number" defaultValue={0} onChange={handleChange} />
      </Form.Group>
    </Col>
  )
}

export interface IScoopOption {
  name: string,
  imageUrl: string,
}

export default ScoopOption
