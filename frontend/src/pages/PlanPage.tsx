import { FeedbackCard } from '@/components/engagement/FeedbackCard'
import { Card } from '@/components/ui/Card'
import { roadmapColumns } from '@/lib/roadmap'

export function PlanPage() {
   return (
      <div className="w-full">
         <div className="mx-auto max-w-3xl text-center lg:mx-0 lg:max-w-none lg:text-left">
            <p className="inline-flex items-center rounded-full border border-teal-900/15 bg-teal-900/5 px-3 py-1 text-xs font-medium tracking-wide text-teal-900">
               Verejný plán
            </p>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">Čo pripravujeme</h1>
            <p className="mt-3 max-w-2xl text-stone-600 lg:mx-0">
               RentFlow rastie po malých krokoch. Toto je to, na čom pracujeme - nie sľub termínov a nie interný backlog.
            </p>
         </div>

         <div className="mt-10 grid gap-4 lg:grid-cols-3 lg:gap-6">
            {roadmapColumns.map(column => (
               <Card key={column.id} className="h-full !p-5 sm:!p-6">
                  <h2 className="text-[11px] font-medium uppercase tracking-wider text-stone-500">{column.label}</h2>
                  <ul className="mt-4 divide-y divide-stone-200/80">
                     {column.items.map(item => (
                        <li key={item.title} className="py-3 first:pt-0 last:pb-0">
                           <p className="text-sm font-medium text-stone-900">{item.title}</p>
                           <p className="mt-1 text-sm leading-relaxed text-stone-600">{item.detail}</p>
                        </li>
                     ))}
                  </ul>
               </Card>
            ))}
         </div>

         <div className="mt-4 lg:mt-6">
            <FeedbackCard />
         </div>
      </div>
   )
}
