import React, { FC, useState } from 'react'
import { Form, Button } from "react-bootstrap";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import {EStatuses, useAppStateCtx} from "../../contexts/AppState";

const popover = (
  <Popover id="popover-basic">
    <Popover.Header as="h3">Popover right</Popover.Header>
    <Popover.Body>
      no ice cream
    </Popover.Body>
  </Popover>
);

const SummaryForm: FC = () => {
  const [tcChecked, setTcChecked] = useState(false)

  const { updateState } = useAppStateCtx()

  const checkboxLabel = (
      <div>
        acceptance
        <OverlayTrigger
          trigger="hover"
          placement="right"
          overlay={popover}>
            <span>terms and conds</span>
        </OverlayTrigger>
      </div>
  )

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
      <Button
        variant="primary"
        type="submit"
        disabled={!tcChecked}
        onClick={() => updateState(EStatuses.complete)}
      >
        send order
      </Button>
    </Form>
  )
}

export default SummaryForm
