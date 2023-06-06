import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface IProps {
  title: string
  value: number
}

export default function CardReport(props: IProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{props.title}</CardTitle>
      </CardHeader>
      <CardContent>{props.value}</CardContent>
    </Card>
  )
}
