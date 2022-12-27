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
    const loading = screen.getByText(/loading/i)
    expect(loading).toBeInTheDocument()
    const thankYou = await screen.findByRole('heading', { name: /thank you/i })
    const orderNumber = screen.getByText(/order number/i)
    const disappearedLoading = screen.queryByText(/loading/i)
    expect(thankYou).toBeInTheDocument()
    expect(orderNumber).toBeInTheDocument()
    expect(disappearedLoading).not.toBeInTheDocument()
    expect(orderNumber).toHaveTextContent(ORDER_NUMBER)

    await user.click(createNewOrderBtn)
    const chocolateScoopRerendered = await screen.findByRole('spinbutton', { name: 'chocolate'})
    expect(chocolateScoopRerendered.value).toEqual("0")
  })

  describe('toppings are not displaying in the summary', () => {
    test('toppings are not displaying in the summary if they were not ordered', async () => {
      const user = userEvent.setup()
      render(<App />)

      const chocolateScoop = await screen.findByRole('spinbutton', { name: /chocolate/i })
      const vanillaScoop = screen.getByRole('spinbutton', { name: 'vanilla'})
      const createOrderBtn = screen.getByRole('button', { name: /create order/i})

      await user.clear(chocolateScoop)
      await user.clear(vanillaScoop)
      await user.type(chocolateScoop, '3')
      await user.type(vanillaScoop, '2')
      await user.click(createOrderBtn)

      const scoopsPrice = screen.getByRole('heading', { name: /scoops/i})
      expect(scoopsPrice).toHaveTextContent('10')

      const toppingsPrice = screen.queryByRole('heading', { name: /toppings/i })
      expect(toppingsPrice).not.toBeInTheDocument()
    })

    test('toppings are not dispaying in the summary if they were first checked and then unchecked', async () => {
      const user = userEvent.setup()
      render(<App />)

      const vanillaScoop = await screen.findByRole('spinbutton', { name: 'vanilla'})
      const cherriesTopping = await screen.findByRole('checkbox', { name: /cherries/i })

      await user.clear(vanillaScoop)
      await user.type(vanillaScoop, '3')
      await user.click(cherriesTopping)

      const total = screen.getByRole('heading', { name: /grand total/i})
      expect(total).toHaveTextContent('7.50')

      const createOrderBtn = screen.getByRole('button', { name: /create order/i })
      await user.click(cherriesTopping)
      await user.click(createOrderBtn)

      const toppingsHeader = screen.queryByRole('heading', {name: /toppings/i })
      expect(toppingsHeader).not.toBeInTheDocument()
    })
  })
})
