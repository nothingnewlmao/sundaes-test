import { FC, useState } from 'react'
import { Form, Button } from "react-bootstrap";

const SummaryForm: FC = () => {
  const [tcChecked, setTcChecked] = useState(false)

  const checkboxLabel = <span>acceptance</span>

  return (
    <Form>
      <Form.Group controlId="acceptance">
        <Form.Check
          type="checkbox"
          label={checkboxLabel}
          checked={tcChecked}
          onChange={(e) => setTcChecked(e.target.checked)}
        />
      </Form.Group>
      <Button variant="primary" type="submit" disabled={!tcChecked}>send order</Button>
    </Form>
  )
}

export default SummaryForm
