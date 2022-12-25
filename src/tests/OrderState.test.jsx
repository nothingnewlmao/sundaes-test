import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { render } from '../test-utils/test-utils'
import { screen as screenDebug } from '@testing-library/react'

import App from "../App";

describe('App', () => {
  test('order phases for happy path', async () => {
    const user = userEvent.setup()
    render(<App />)

    const chocolateScoop = await screen.findByRole('spinbutton', { name: 'chocolate'})
    await user.clear(chocolateScoop)
    await user.type(chocolateScoop, '3')
    const createOrderBtn = screen.getByRole('button', { name: 'Create order' })
    await user.click(createOrderBtn)

    const agreementCheckbox = screen.getByRole('checkbox', { name: /terms and conds/i })
    const sendOrderBtn = screen.getByRole('button', { name: 'send order' })
    await user.click(agreementCheckbox)
    await user.click(sendOrderBtn)

    const createNewOrderBtn = screen.getByRole('button', { name: /create new order/i })
    const orderNumber = await screen.findByText(/order number/i)
    expect(orderNumber).toBeInTheDocument()

    await user.click(createNewOrderBtn)
    const h1DesignSundae = screen.getByRole('heading', { name: /design sundae/i })
    expect(h1DesignSundae).toBeInTheDocument()
  })
})
