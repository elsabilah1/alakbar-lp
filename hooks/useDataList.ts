import axios from "axios"
import useSwr from "swr"

export default function useDataList(name: string, endpoint: string) {
  async function getData() {
    const { data } = await axios.get(endpoint)
    return data.data
  }

  const { data, isLoading, error, mutate } = useSwr(name, getData)

  return {
    data,
    loading: isLoading,
    error,
    mutate,
  }
}
