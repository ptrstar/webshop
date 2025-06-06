"use client";

import { Progress } from "@heroui/progress";
import { Spinner } from "@heroui/react";

export default function test() {
  return (
    <div>
        test text
      <Progress value={60} aria-label="Loading..." />
      <Spinner />
    </div>
  );
}