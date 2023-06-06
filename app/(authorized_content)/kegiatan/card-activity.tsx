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
    <Card>
      <CardHeader>
        <div className="flex justify-between">
          <CardTitle>{data.title}</CardTitle>
          <div className="flex gap-1">
            <EditActivityForm data={data} />
            <DeleteActivityForm id={data._id} />
          </div>
        </div>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>{data.description}</CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  )
}
