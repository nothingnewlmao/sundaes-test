import { render, screen } from '../../../test-utils/test-utils'
import {server} from "../../../mocks/server";
import {rest} from "msw";
import {Confirmation} from "../Confirmation";
import {BASE_URL} from "../../../mocks/handlers";

describe('Confirmation component', () => {
  test('Server error on Order confirmation page', async () => {
    render(<Confirmation changePhase={jest.fn()} />)

    server.resetHandlers(rest.post(`${BASE_URL}/order`, (req, res, ctx) => res(
      ctx.status(500),
      ctx.json({ errorMessage: 'Internal Error' })
    )))

    const errorBanner = await screen.findByText(/try again later/i)
    const orderNumber = screen.queryByRole('heading', { name: /order number/i })

    expect(errorBanner).toBeInTheDocument()
    expect(orderNumber).not.toBeInTheDocument()
  })
})
