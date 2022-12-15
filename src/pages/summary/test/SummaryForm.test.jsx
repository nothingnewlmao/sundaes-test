import SummaryForm from "../SummaryForm";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe('SummaryForm', () => {
  describe('Agreement', () => {
    describe('Checkbox and button', () => {
      test('Checkbox isn\'t checked', () => {
        render(<SummaryForm />)

        const chkbx = screen.getByRole('checkbox', { name: 'acceptance terms and conds' })
        const btn = screen.getByRole('button', { name: 'send order'})

        expect(chkbx).not.toBeChecked()
        expect(btn).toBeDisabled()
      })

      test('checking checkbox enabling button', async () => {
        const userEvents = userEvent.setup()

        render(<SummaryForm />)

        const chkbx = screen.getByRole('checkbox', { name: 'acceptance terms and conds' })
        const btn = screen.getByRole('button', { name: 'send order'})

        await userEvents.click(chkbx)

        expect(btn).toBeEnabled()
      })

      test('unchecking checkbox disabling button', async () => {
        const userEvents = userEvent.setup()
        render(<SummaryForm />)

        const chkbx = screen.getByRole('checkbox', { name: 'acceptance terms and conds' })
        const btn = screen.getByRole('button', { name: 'send order' })

        await userEvents.click(chkbx)
        await userEvents.click(chkbx)

        expect(btn).toBeDisabled()
      })
    })

    describe('popover', () => {
      test('popover starts out hidden', () => {
        render(<SummaryForm />)

        const hiddenPopover = screen.queryByText(/no ice cream/i)

        expect(hiddenPopover).not.toBeInTheDocument()
      })

      test('popover appears on mouseover of chkbx label', async () => {
        render(<SummaryForm />)

        const chkbxLabel = screen.getByText('terms and conds')

        await userEvent.hover(chkbxLabel)
        const popover = screen.getByText('no ice cream')

        expect(popover).toBeInTheDocument()
      })

      test('popover disappears when mouse out of chkbx label',  async () => {
        const userEvents = userEvent.setup()
        render(<SummaryForm />)

        const chkbxLabel = screen.getByText('terms and conds')

        await userEvents.hover(chkbxLabel)
        const popover = screen.getByText('no ice cream')
        expect(popover).toBeInTheDocument()
        await userEvents.unhover(chkbxLabel)

        expect(popover).not.toBeInTheDocument()
      })
    })
  })
})
