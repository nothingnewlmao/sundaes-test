import { render, screen, waitFor } from "@testing-library/react";
import OrderEntry from "../OrderEntry";
import {rest} from "msw";
import {server} from "../../../mocks/server";
import {BASE_URL, ERR_TEXT} from '../Options'

describe('OrderEntry', () => {
  test.only('handles errors for scoops and toppings', async() => {
    server.resetHandlers(
      rest.get(`${BASE_URL}/toppings`, (req, res, ctx) => res(
        ctx.status(500)
      )),
      rest.get(`${BASE_URL}/scoops`, (req, res, ctx) => res(ctx.status(500)))
    )

    render(<OrderEntry />)

    await waitFor(async() => {
      const alertBanners = await screen.findAllByRole('alert')
      expect(alertBanners).toHaveLength(2)
    })
  })
})
