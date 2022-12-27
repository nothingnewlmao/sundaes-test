import { render, screen } from '../../../test-utils/test-utils'
import userEvent from "@testing-library/user-event";
import ScoopOption from "../ScoopOption";

describe('ScoopOption', () => {
  test('scoop inputs turns red when there is typed a negative number', async () => {
    const user = userEvent.setup()
    render(<ScoopOption name="vanilla" imageUrl="/" />)
    const vanillaInput = screen.getByRole('spinbutton')
    await user.clear(vanillaInput)
    await user.type(vanillaInput, '-3')

    expect(vanillaInput).toHaveClass('is-invalid')
  })

  test('scoop inputs turns red when there is typed a decimal number', async () => {
    const user = userEvent.setup()
    render(<ScoopOption name="vanilla" imageUrl="/" />)

    const vanillaInput = screen.getByRole('spinbutton')
    await user.clear(vanillaInput)
    await user.type(vanillaInput, '2.5')

    expect(vanillaInput).toHaveClass('is-invalid')
  })

  test('scoop inputs turns red when there is typed a too high number', async() => {
    const user = userEvent.setup()
    render(<ScoopOption name="vanilla" imageUrl="/" />)

    const vanillaInput = screen.getByRole('spinbutton')
    await user.clear(vanillaInput)
    await user.type(vanillaInput, '11')

    expect(vanillaInput).toHaveClass('is-invalid')
  })
})
