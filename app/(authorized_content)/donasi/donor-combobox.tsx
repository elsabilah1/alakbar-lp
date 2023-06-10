"use client"

import { IValues } from "@/store/slices/donationSlice"
import { ControllerRenderProps } from "react-hook-form"

import useDataList from "@/hooks/useDataList"
import { Combobox } from "@/components/ui/combobox"

export default function DonorCombobox({
  field,
}: {
  field: ControllerRenderProps<IValues, "donor">
}) {
  const { data, loading } = useDataList("donor", "/api/donor")

  const options = data?.map((item: any) => item.name)

  return (
    <Combobox
      field={field}
      loading={loading}
      options={options}
      placeholder="Pilih Donatur..."
      inputPlaceholder="Cari Donatur..."
    />
  )
}
