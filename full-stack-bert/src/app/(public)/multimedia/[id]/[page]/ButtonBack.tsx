"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function ButtonBack() {
  const router = useRouter();
  const handleClick = () => router.back();
  return <Button onClick={handleClick}>Back to home</Button>;
}
