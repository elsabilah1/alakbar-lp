import Image from "next/image"
import { Activity } from "@/store/slices/activitySlice"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import DeleteActivityForm from "./form-delete"
import EditActivityForm from "./form-edit"

export default function CardActivity({ data }: { data: Activity }) {
  return (
    <Card className="relative h-[400px]">
      <CardHeader>
        <div className="relative h-40">
          <Image
            src="/test.jpg"
            alt={data.title}
            className="object-cover"
            fill
          />
        </div>
      </CardHeader>
      <CardContent className="relative space-y-3">
        <div>
          <CardTitle className="capitalize">{data.title}</CardTitle>
          <CardDescription className="text-end text-xs">
            {new Date().toLocaleDateString()}
          </CardDescription>
        </div>

        <p className="line-clamp-3 text-sm">{data.description}</p>
      </CardContent>

      <CardFooter className="absolute bottom-0 grid w-full grid-cols-2 gap-2">
        <EditActivityForm data={data} />
        <DeleteActivityForm id={data._id} />
      </CardFooter>
    </Card>
  )
}
