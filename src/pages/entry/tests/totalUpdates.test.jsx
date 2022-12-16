import { render, screen } from '@testing-library/react'
import userEvent from "@testing-library/user-event";
import Options, {EOptionType} from "../Options";
import { OrderDetailsProvider } from "../../../contexts/OrderDetails";

describe('Total', () => {
  test('update subtotal when scoops change', async () => {
    render(<Options optionType={EOptionType.scoops} />, { wrapper: OrderDetailsProvider })

    const scoopSubtotal = screen.getByText('Scoops total:', { exact: false })
    expect(scoopSubtotal).toHaveTextContent('$0.00')

    const vanillaScoop = await screen.findByRole('spinbutton', { name: 'vanilla' })
    const userEvents = userEvent.setup()
    await userEvents.clear(vanillaScoop)
    await userEvents.type(vanillaScoop, '1')
    expect(scoopSubtotal).toHaveTextContent('$2.00')

    const chocolateInput = await screen.findByRole('spinbutton', { name: 'chocolate' })
    await userEvents.clear(chocolateInput)
    await userEvents.type(chocolateInput, '2')
    expect(scoopSubtotal).toHaveTextContent('$6.00')
  })
})
