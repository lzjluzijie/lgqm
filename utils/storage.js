import { useState, useEffect } from "react"

export default function useStorage(storageKey, defaultData) {
  const [state, setState] = useState(defaultData)
  useEffect(() => {
    if (!window.localStorage.getItem(storageKey)) {
      window.localStorage.setItem(storageKey, JSON.stringify(defaultData))
    }
    try {
      setState(JSON.parse(window.localStorage.getItem(storageKey)))
    } catch (e) {
      console.error(e)
      setState(defaultData)
    }
  }, [])
  const setStorage = (data) => {
    setState(data)
    window.localStorage.setItem(storageKey, JSON.stringify(data))
  }
  return [state, setStorage]
}
