import { useState, useEffect } from "react"

export default function useStorage(storageKey, defaultData) {
  const [state, setState] = useState(defaultData)
  useEffect(() => {
    let s = window.localStorage.getItem(storageKey)
    if (!s) {
      window.localStorage.setItem(storageKey, JSON.stringify(defaultData))
      s = window.localStorage.getItem(storageKey)
    }
    try {
      setState(JSON.parse(s))
    } catch (e) {
      console.error(e)
      console.log(s)
      setState(defaultData)
    }
  }, [])
  const setStorage = (data) => {
    setState(data)
    window.localStorage.setItem(storageKey, JSON.stringify(data))
  }
  return [state, setStorage]
}
