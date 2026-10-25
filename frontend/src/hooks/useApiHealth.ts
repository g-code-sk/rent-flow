import { useEffect, useState } from 'react'

export type ApiStatus = 'loading' | 'ok' | 'error'

export function useApiHealth() {
   const [apiStatus, setApiStatus] = useState<ApiStatus>('loading')

   useEffect(() => {
      fetch('/api/health')
         .then(res => {
            if (!res.ok) throw new Error('unhealthy')
            return res.json()
         })
         .then(() => setApiStatus('ok'))
         .catch(() => setApiStatus('error'))
   }, [])

   return apiStatus
}
