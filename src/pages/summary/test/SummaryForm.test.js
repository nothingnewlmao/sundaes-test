import SummaryForm from "../SummaryForm";
import { render, fireEvent, screen } from "@testing-library/react";

describe('SummaryForm', () => {
  describe('Agreement', () => {
    describe('Checkbox and button', () => {
      test('Checkbox isn\'t checked', () => {
        render(<SummaryForm />)

        const chkbx = screen.getByRole('checkbox', { name: 'acceptance' })
        const btn = screen.getByRole('button', { name: 'send order'})

        expect(chkbx).not.toBeChecked()
        expect(btn).toBeDisabled()
      })

      test('checking checkbox enabling button', () => {
        render(<SummaryForm />)

        const chkbx = screen.getByRole('checkbox', { name: 'acceptance' })
        const btn = screen.getByRole('button', { name: 'send order'})

        fireEvent.click(chkbx)

        expect(btn).toBeEnabled()
      })

      test('unchecking checkbox disabling button', () => {
        render(<SummaryForm />)

        const chkbx = screen.getByRole('checkbox', { name: 'acceptance' })
        const btn = screen.getByRole('button', { name: 'send order' })

        fireEvent.click(chkbx)
        fireEvent.click(chkbx)

        expect(btn).toBeDisabled()
      })
    })
  })
})
