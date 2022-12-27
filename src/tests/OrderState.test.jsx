import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "../App";
import {ORDER_NUMBER} from "../mocks/handlers";

describe('App', () => {
  test('order phases for happy path', async () => {
    const user = userEvent.setup()
    render(<App />)

    const chocolateScoop = await screen.findByRole('spinbutton', { name: 'chocolate'})
    await user.clear(chocolateScoop)
    await user.type(chocolateScoop, '3')
    const createOrderBtn = screen.getByRole('button', { name: 'Create order' })
    await user.click(createOrderBtn)

    const totalPrice = screen.getByRole('heading', { name: /scoops:/i })
    expect(totalPrice).toHaveTextContent('6')
    const agreementCheckbox = screen.getByRole('checkbox', { name: /terms and conds/i })
    const sendOrderBtn = screen.getByRole('button', { name: 'send order' })
    await user.click(agreementCheckbox)
    await user.click(sendOrderBtn)

    const createNewOrderBtn = screen.getByRole('button', { name: /create new order/i })
    const orderNumber = await screen.findByText(/order number/i)
    expect(orderNumber).toBeInTheDocument()
    console.log(orderNumber.textContent)
    expect(orderNumber).toHaveTextContent(ORDER_NUMBER)

    await user.click(createNewOrderBtn)
    const chocolateScoopRerendered = await screen.findByRole('spinbutton', { name: 'chocolate'})
    expect(chocolateScoopRerendered.value).toEqual("0")
  })
})
