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

export default function CardActivity() {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between">
          <CardTitle>Card Title</CardTitle>
          <div className="flex gap-1">
            <EditActivityForm id={"1"} />
            <DeleteActivityForm id={"1"} />
          </div>
        </div>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  )
}
