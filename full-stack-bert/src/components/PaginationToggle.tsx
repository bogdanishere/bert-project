"use client";

import { useRouter } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationToggleProps {
  currentPage: number;
  totalPages: number;
}

export default function PaginationToggle({
  currentPage,
  totalPages,
}: PaginationToggleProps) {
  const router = useRouter();
  const pagesPerGroup = 5;

  const currentGroup = Math.ceil(currentPage / pagesPerGroup);
  const startPage = (currentGroup - 1) * pagesPerGroup + 1;
  const endPage = Math.min(startPage + pagesPerGroup - 1, totalPages);

  const handlePageChange = (page: number) => {
    router.push(`/${page}`);
  };

  return (
    <Pagination>
      <PaginationContent>
        {currentGroup > 1 && (
          <PaginationItem>
            <PaginationPrevious
              onClick={() =>
                handlePageChange((currentGroup - 1) * pagesPerGroup)
              }
            />
          </PaginationItem>
        )}

        {Array.from(
          { length: endPage - startPage + 1 },
          (_, index) => startPage + index
        ).map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              className="bg-[#777] dark:bg-white  dark:text-[#777] text-white "
              isActive={page === currentPage}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        {currentGroup < Math.ceil(totalPages / pagesPerGroup) && (
          <PaginationEllipsis />
        )}

        {currentGroup < Math.ceil(totalPages / pagesPerGroup) && (
          <PaginationItem>
            <PaginationNext
              onClick={() => handlePageChange(currentGroup * pagesPerGroup + 1)}
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
