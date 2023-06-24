import React from "react"
import Image from "next/image"
import { Activity } from "@/store/slices/activitySlice"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function ActivityCard({ item }: { item: Activity }) {
  return (
    <Card className="relative h-[450px]">
      <div className="absolute inset-0 hover:bg-black/20" />
      <CardHeader>
        <div className="relative h-56">
          <Image
            src={item.imageUrl}
            alt={item.title}
            className="object-cover"
            fill
          />
        </div>
      </CardHeader>
      <CardContent className="relative space-y-3">
        <div>
          <CardTitle className="mb-2 capitalize leading-relaxed">
            {item.title}
          </CardTitle>
          <CardDescription className="text-xs">
            {new Date().toLocaleDateString()} - <span>{item.createdBy}</span>
          </CardDescription>
        </div>

        <p className="line-clamp-3 text-sm">{item.description}</p>
      </CardContent>
    </Card>
  )
}
