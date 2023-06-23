import React from "react"
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

export default function ActivityCard({ item }: { item: Activity }) {
  return (
    <Card className="relative h-[500px]">
      <CardHeader>
        <div className="relative h-56">
          <Image
            src="/test.jpg"
            alt={item.title}
            className="object-cover"
            fill
          />
        </div>
      </CardHeader>
      <CardContent className="relative space-y-3">
        <div>
          <CardTitle className="mb-2 capitalize">{item.title}</CardTitle>
          <CardDescription className="text-xs">
            {new Date().toLocaleDateString()} - <span>{item.createdBy}</span>
          </CardDescription>
        </div>

        <p className="text-sm">{item.description}</p>
      </CardContent>
    </Card>
  )
}
