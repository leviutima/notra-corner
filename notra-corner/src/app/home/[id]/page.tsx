"use client";

import { Columns } from "@/components/column/__columns";
import { CreateColumn } from "@/components/column/__modal-create-column";

export default function Home() {
  return (
    <div className="p-10">
      <div className="flex items-start gap-5">
        <Columns />
        <CreateColumn />
      </div>
    </div>
  );
}
