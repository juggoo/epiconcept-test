"use client";
import { NotesList } from "@/components/NotesList";
import { setTenantHeader } from "@/lib/api";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    setTenantHeader("tenant1");
  }, []);
  return <NotesList tenantId="tenant1" />;
}
