"use client";

import { Columns } from "@/components/column/__columns";
import { CreateColumn } from "@/components/column/modal-create-column";
import { DragScrollWrapper } from "@/components/drag-scroll/drag-scroll-wrapper";

export default function Home() {
  return (
    <div className="h-screen p-10">
      <DragScrollWrapper>
        <div className="flex items-start gap-5 w-max h-full">
          <Columns />
          <CreateColumn />
        </div>
      </DragScrollWrapper>
    </div>
  );
}

