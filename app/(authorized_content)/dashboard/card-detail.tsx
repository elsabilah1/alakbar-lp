import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import EditDetailForm from "./form-edit"

export default function CardDetail() {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between">
          <CardTitle>Detail Panti</CardTitle>
          <EditDetailForm />
        </div>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
    </Card>
  )
}
