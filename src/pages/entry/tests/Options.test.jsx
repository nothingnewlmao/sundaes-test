import { render, screen } from "@testing-library/react";
import Options, { EOptionType } from "../Options";

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
    expect(altTexts).toEqual(['cherries', 'm&m', 'hot fudge'])
  })
})
