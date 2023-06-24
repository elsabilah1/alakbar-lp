"use client"

import React, { useState } from "react"
import Image from "next/image"
import { Activity } from "@/store/slices/activitySlice"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Icons } from "@/components/icons"

export default function ActivityCard({ item }: { item: Activity }) {
  const [showDetails, setShowDetails] = useState(false)

  return (
    <Card className="relative">
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

        <p className={cn("text-sm", !showDetails && "line-clamp-3")}>
          {item.description}
        </p>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button
          variant="link"
          size="sm"
          onClick={() => setShowDetails(!showDetails)}
        >
          {showDetails ? (
            <>
              <span className="text-sm">sembunyikan</span>
              <Icons.chevronUp className="ml-3 w-4" />
            </>
          ) : (
            <>
              <span className="text-sm">lihat detail</span>
              <Icons.chevronDown className="ml-3 w-4" />
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
