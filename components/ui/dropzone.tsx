import { useDropzone } from "react-dropzone"
import { UseFormStateReturn } from "react-hook-form"

import { Icons } from "../icons"
import { FormControl, FormItem, FormLabel, FormMessage } from "./form"

interface IProps {
  field: any
  label: string
  formState: UseFormStateReturn<any>
  placeholder: string
}

export default function Dropzone({
  field,
  label,
  formState,
  placeholder,
}: IProps) {
  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    accept: {
      "image/*": [".jpeg", ".png"],
    },
    onDrop: (acceptedFiles) => {
      field.onChange(acceptedFiles[0])
    },
  })

  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <>
          <div {...getRootProps({ className: "dropzone" })}>
            <input
              {...getInputProps()}
              name={field.name}
              disabled={formState.isSubmitting}
            />
            <div className="flex h-16 cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed md:gap-6">
              <span className="text-sm font-medium text-muted-foreground">
                {placeholder}
              </span>
            </div>
          </div>
          <div>
            {field.value && (
              <div className="my-2 flex justify-between border border-emerald-500 p-2">
                <p className="text-sm">{field.value.path}</p>
                <button onClick={() => field.onChange(undefined)} type="button">
                  <Icons.x className="w-4" />
                </button>
              </div>
            )}
          </div>
        </>
      </FormControl>
      <FormMessage />
    </FormItem>
  )
}
