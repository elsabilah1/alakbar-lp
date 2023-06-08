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
    <Card className="md:h-64">
      <CardHeader>
        <div className="flex justify-between">
          <CardTitle>{data.title}</CardTitle>
          <div className="flex gap-1">
            <EditActivityForm data={data} />
            <DeleteActivityForm id={data._id} />
          </div>
        </div>
        <CardDescription>{new Date().toLocaleDateString()}</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-2">
        <div className="relative h-32">
          <Image
            src={data.imageUrl}
            alt={data.title}
            className="object-contain"
            fill
          />
        </div>
        <p className="line-clamp-2 text-sm">{data.description}</p>
      </CardContent>
    </Card>
  )
}
