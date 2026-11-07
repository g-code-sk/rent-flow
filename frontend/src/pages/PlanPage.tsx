import { FeedbackCard } from '@/components/engagement/FeedbackCard'
import { CheckIcon } from '@/components/ui/icons/CheckIcon'
import { Card } from '@/components/ui/Card'
import { roadmapPhases } from '@/lib/roadmap'

export function PlanPage() {
   return (
      <div className="w-full">
         <div className="mx-auto max-w-3xl text-center lg:mx-0 lg:max-w-none lg:text-left">
            <p className="inline-flex items-center rounded-full border border-teal-900/15 bg-teal-900/5 px-3 py-1 text-xs font-medium tracking-wide text-teal-900">
               Verejný plán
            </p>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">Čo pripravujeme</h1>
            <p className="mt-3 max-w-2xl text-stone-600 lg:mx-0">
               Ostane z nájmu rastie po malých krokoch. Toto je to, na čom pracujeme - nie sľub termínov a nie interný backlog.
            </p>
         </div>

         <div className="mt-4 lg:mt-6">
            <FeedbackCard />
         </div>

         <div className="mt-10 grid gap-4 lg:gap-6">
            {roadmapPhases.map(phase => (
               <Card key={phase.id} className="!p-5 sm:!p-6">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                     <h2 className="text-[11px] font-medium uppercase tracking-wider text-stone-500">{phase.label}</h2>
                     <p
                        className={
                           phase.status === 'in-progress'
                              ? 'inline-flex items-center rounded-full border border-teal-900/15 bg-teal-900/5 px-2.5 py-0.5 text-[11px] font-medium tracking-wide text-teal-900'
                              : 'inline-flex items-center rounded-full border border-stone-300/80 bg-stone-100 px-2.5 py-0.5 text-[11px] font-medium tracking-wide text-stone-500'
                        }
                     >
                        {phase.statusLabel}
                     </p>
                  </div>
                  <ul className="mt-4 grid gap-x-10 lg:grid-cols-2">
                     {phase.items.map(item => (
                        <li key={item.title} className="flex gap-2.5 border-b border-stone-200/80 py-3.5">
                           {item.done ? (
                              <span className="mt-0.5">
                                 <span className="sr-only">Hotové. </span>
                                 <CheckIcon />
                              </span>
                           ) : (
                              <span className="mt-1 h-4 w-4 shrink-0 rounded-full border border-stone-300" aria-hidden />
                           )}
                           <div>
                              <p className="text-sm font-medium text-stone-900">{item.title}</p>
                              <p className="mt-1 text-sm leading-relaxed text-stone-600">{item.detail}</p>
                           </div>
                        </li>
                     ))}
                  </ul>
               </Card>
            ))}
         </div>
      </div>
   )
}
