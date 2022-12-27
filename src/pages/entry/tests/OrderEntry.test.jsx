import { screen, waitFor, render } from "../../../test-utils/test-utils";
import OrderEntry from "../OrderEntry";
import {rest} from "msw";
import {server} from "../../../mocks/server";
import {BASE_URL, ERR_TEXT} from '../Options'
import userEvent from "@testing-library/user-event";

describe('OrderEntry', () => {
  test.skip('handles errors for scoops and toppings', async() => {
    server.resetHandlers(
      rest.get(`${BASE_URL}/toppings`, (req, res, ctx) => res(
        ctx.status(500)
      )),
      rest.get(`${BASE_URL}/scoops`, (req, res, ctx) => res(ctx.status(500)))
    )

    render(<OrderEntry changePhase={jest.fn()} />)

    await waitFor(async() => {
      const alertBanners = await screen.findAllByRole('alert')
      expect(alertBanners).toHaveLength(2)
    })
  })

  test('disable order button if no scoops', async () => {
    const user = userEvent.setup()
    render(<OrderEntry changePhase={jest.fn()} />)

    const vanillaInput = await screen.findByRole('spinbutton', { name: /vanilla/i })
    const cherriesScoop = await screen.findByRole('checkbox', { name: /cherries/i })
    const createOrderBtn = screen.getByRole('button', { name: /create order/i })

    expect(createOrderBtn).toBeDisabled()

    await user.clear(vanillaInput)
    await user.type(vanillaInput, '3')
    expect(createOrderBtn).toBeEnabled()

    await user.click(cherriesScoop)
    expect(createOrderBtn).toBeEnabled()

    await user.clear(vanillaInput)
    await user.type(vanillaInput, '0')
    expect(createOrderBtn).toBeDisabled()
  })
})
