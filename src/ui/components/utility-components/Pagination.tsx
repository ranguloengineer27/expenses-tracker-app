import { Button } from "./Button";

type PaginationProps = {
    pages: number;
    currentPage: number;
    onPageChange: (page: number) => void;
};

export const Pagination = ({
    pages,
    currentPage,
    onPageChange,
}: PaginationProps) => {
    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < pages) {
            onPageChange(currentPage + 1);
        }
    };

    return (
        <div className="mt-5 w-[75%] flex justify-center">
            <Button
                variant="ghost"
                disabled={currentPage === 1}
                onClick={handlePrevious}
                className="mr-2"
            >
                Prev
            </Button>
            {Array.from({ length: pages }, (_, i) => i + 1).map((pageNum) => (
                <Button
                    className="mr-2"
                    key={pageNum}
                    onClick={() => onPageChange(pageNum)}
                    variant={currentPage === pageNum ? undefined : "outline"}
                >
                    {pageNum}
                </Button>
            ))}
            <Button
                variant="ghost"
                onClick={handleNext}
                disabled={currentPage === pages}
            >
                Next
            </Button>
        </div>
    );
};
