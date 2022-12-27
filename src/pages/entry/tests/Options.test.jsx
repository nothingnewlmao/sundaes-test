import { render, screen } from "../../../test-utils/test-utils";
import Options, { EOptionType } from "../Options";
import userEvent from "@testing-library/user-event";

describe('Options', () => {
  test('displays image for each scoop option from the server', async () => {
    render(<Options optionType={EOptionType.scoops} />)

    const images = await screen.findAllByRole('img', { name: /scoop$/i })
    expect(images).toHaveLength(2)

    const altTexts = images.map(({ alt }) => alt)
    expect(altTexts).toEqual(['chocolate scoop', 'vanilla scoop'])
  })

  test('displays images for each topping option from the server', async () => {
    render (<Options optionType={EOptionType.toppings} />)

    const images = await screen.findAllByRole('img', { name: /topping$/i })
    expect(images).toHaveLength(3)

    const altTexts = images.map(({ alt }) => alt)
    expect(altTexts).toEqual(['cherries topping', 'm&m topping', 'hot fudge topping'])
  })

  test.only('no scoops subtotal update for invalid scoop count', async() => {
    const user = userEvent.setup()
    render(<Options optionType={EOptionType.scoops} />)

    const scoopsTotal = screen.getByText(/scoops total:/i)
    const vanillaScoop = await screen.findByRole('spinbutton', { name: /vanilla/i })
    expect(scoopsTotal).toHaveTextContent('$0.00')

    await user.clear(vanillaScoop)
    await user.type(vanillaScoop, '-3')

    expect(scoopsTotal).toHaveTextContent('$0.00')
  })
})
