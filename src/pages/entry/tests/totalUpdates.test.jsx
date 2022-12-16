import { render, screen } from "../../../test-utils/test-utils";
import userEvent from "@testing-library/user-event";
import Options, {EOptionType} from "../Options";
import OrderEntry from "../OrderEntry";

describe('Total', () => {
  describe('Subtotals', () => {
    test('update subtotal when scoops change', async () => {
      render(<Options optionType={EOptionType.scoops} />)

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

    test('updates subtotal when toppings updates', async() => {
      const user = userEvent.setup()
      render(<Options optionType={EOptionType.toppings} />)

      const subtotalTitle = screen.getByText('Toppings total:', { exact: false })
      expect(subtotalTitle).toHaveTextContent('$0.00')

      const cherriesChkbx = await screen.findByRole('checkbox', { name: 'cherries'})
      await user.click(cherriesChkbx)
      expect(subtotalTitle).toHaveTextContent('$1.50')

      const mmChkbx = await screen.findByRole('checkbox', { name: 'm&m'})
      await user.click(mmChkbx)
      expect(subtotalTitle).toHaveTextContent('$3.00')

      await user.click(cherriesChkbx)
      expect(subtotalTitle).toHaveTextContent('$1.50')
    })
  })

  describe('Grand total', () => {
    test('grand total updates properly if scoop is added first', async () => {
      const user = userEvent.setup()
      render(<OrderEntry />)

      const chocolateInput = await screen.findByRole('spinbutton', { name: /chocolate/i })
      const grandTotalTitle = screen.getByRole('heading', { name: /grand total/i })
      expect(grandTotalTitle).toHaveTextContent('$0.00')

      await user.clear(chocolateInput)
      await user.type(chocolateInput, '2')

      expect(grandTotalTitle).toHaveTextContent('$4.00')
    })

    test('grand total updates properly if topping is added first', async() => {
      const user = userEvent.setup()
      render(<OrderEntry />)

      const grandTotalTitle = screen.getByRole('heading', { name: /grand total/i })
      const cherriesChkbx = await screen.findByRole('checkbox', { name: 'cherries' })

      await user.click(cherriesChkbx)

      expect(grandTotalTitle).toHaveTextContent('$1.50')
    })

    test('grand total updates properly if an item is removed', async() => {
      const user = userEvent.setup()
      render(<OrderEntry />)

      const grandTotalTitle = screen.getByRole('heading', { name: /grand total/i })
      const mmChkbx = await screen.findByRole('checkbox', { name: 'm&m' })
      const vanillaInput = await screen.findByRole('spinbutton', { name: 'vanilla' })

      await user.clear(vanillaInput)
      await user.click(mmChkbx)
      await user.type(vanillaInput, '4')
      expect(grandTotalTitle).toHaveTextContent('$9.50')

      await user.click(mmChkbx)
      expect(grandTotalTitle).toHaveTextContent('$8.00')

      await user.clear(vanillaInput)
      await user.type(vanillaInput, '0')
      expect(grandTotalTitle).toHaveTextContent('$0.00')
    })
  })
})
