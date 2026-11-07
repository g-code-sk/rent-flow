import { useApiHealth } from '@/hooks/useApiHealth'

function isLocalHost() {
   const host = window.location.hostname
   return host === 'localhost' || host === '127.0.0.1' || host === '[::1]' || host === '::1'
}

export function AppApiStatus() {
   const isLocal = isLocalHost()
   const apiStatus = useApiHealth(isLocal)

   if (!isLocal) return null

   return (
      <div className="flex items-center gap-2 rounded-full border border-stone-300/80 bg-white/60 px-3 py-1.5 text-xs text-stone-600" aria-live="polite">
         <span
            className={`h-1.5 w-1.5 shrink-0 rounded-full ${
               apiStatus === 'loading' ? 'animate-pulse bg-stone-400' : apiStatus === 'ok' ? 'bg-emerald-600' : 'bg-amber-500'
            }`}
         />
         <span className="hidden sm:inline">
            {apiStatus === 'loading' && 'Pripájam API…'}
            {apiStatus === 'ok' && 'Systém pripravený'}
            {apiStatus === 'error' && 'API offline'}
         </span>
      </div>
   )
}
