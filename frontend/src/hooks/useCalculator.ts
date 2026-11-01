import { calculatorReducer, createInitialCalculatorState } from '@/lib/calculatorReducer'
import { clearCalculatorDraft, saveCalculatorDraft } from '@/lib/calculatorDraft'
import { expenses } from '@/lib/expenses'
import { useEffect, useReducer, useRef } from 'react'

const DRAFT_SAVE_DELAY_MS = 3000

export function useCalculator() {
   const [state, dispatch] = useReducer(calculatorReducer, expenses, createInitialCalculatorState)
   const { formValues, formYearlyCounts, activeExpenseIds, taxDetailsOpen } = state

   const hasStarted = formValues.rentMonthly > 0 || activeExpenseIds.length > 0

   const saveTimeoutRef = useRef<number | null>(null)
   const latestStateRef = useRef({
      formValues,
      formYearlyCounts,
      activeExpenseIds,
      taxDetailsOpen,
      hasStarted,
   })
   latestStateRef.current = { formValues, formYearlyCounts, activeExpenseIds, taxDetailsOpen, hasStarted }

   function setFormStateValue(id: string, value: number) {
      dispatch({ type: 'setValue', id, value })
   }

   function setFormYearlyCount(id: string, value: number) {
      dispatch({ type: 'setYearlyCount', id, value })
   }

   function addExpense(id: string) {
      dispatch({ type: 'addExpense', id })
   }

   function removeExpense(id: string) {
      dispatch({ type: 'removeExpense', id })
   }

   function loadDemo() {
      dispatch({ type: 'loadDemo' })
   }

   function resetCalculator() {
      if (saveTimeoutRef.current != null) {
         window.clearTimeout(saveTimeoutRef.current)
         saveTimeoutRef.current = null
      }
      clearCalculatorDraft()
      dispatch({ type: 'reset' })
   }

   function setTaxDetailsOpen(open: boolean) {
      dispatch({ type: 'setTaxDetailsOpen', open })
   }

   function flushDraftSave() {
      if (saveTimeoutRef.current != null) {
         window.clearTimeout(saveTimeoutRef.current)
         saveTimeoutRef.current = null
      }

      const current = latestStateRef.current
      if (current.hasStarted) {
         saveCalculatorDraft({
            formValues: current.formValues,
            formYearlyCounts: current.formYearlyCounts,
            activeExpenseIds: current.activeExpenseIds,
            taxDetailsOpen: current.taxDetailsOpen,
         })
         return
      }

      clearCalculatorDraft()
   }

   useEffect(() => {
      if (!hasStarted) {
         if (saveTimeoutRef.current != null) {
            window.clearTimeout(saveTimeoutRef.current)
            saveTimeoutRef.current = null
         }
         clearCalculatorDraft()
         return
      }

      saveTimeoutRef.current = window.setTimeout(() => {
         saveCalculatorDraft({
            formValues,
            formYearlyCounts,
            activeExpenseIds,
            taxDetailsOpen,
         })
         saveTimeoutRef.current = null
      }, DRAFT_SAVE_DELAY_MS)

      return () => {
         if (saveTimeoutRef.current != null) {
            window.clearTimeout(saveTimeoutRef.current)
            saveTimeoutRef.current = null
         }
      }
   }, [formValues, formYearlyCounts, activeExpenseIds, taxDetailsOpen, hasStarted])

   useEffect(() => {
      function onVisibilityChange() {
         if (document.visibilityState === 'hidden') {
            flushDraftSave()
         }
      }

      document.addEventListener('visibilitychange', onVisibilityChange)
      window.addEventListener('pagehide', flushDraftSave)

      return () => {
         document.removeEventListener('visibilitychange', onVisibilityChange)
         window.removeEventListener('pagehide', flushDraftSave)
         flushDraftSave()
      }
   }, [])

   const activeExpenses = activeExpenseIds
      .map(id => expenses.find(expense => expense.id === id))
      .filter((expense): expense is (typeof expenses)[number] => Boolean(expense))
   const catalogExpenses = expenses.filter(expense => !activeExpenseIds.includes(expense.id))

   return {
      formValues,
      formYearlyCounts,
      activeExpenseIds,
      taxDetailsOpen,
      hasStarted,
      activeExpenses,
      catalogExpenses,
      setFormStateValue,
      setFormYearlyCount,
      addExpense,
      removeExpense,
      loadDemo,
      resetCalculator,
      setTaxDetailsOpen,
   }
}
