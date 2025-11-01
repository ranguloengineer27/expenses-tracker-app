import { useQuery } from "@tanstack/react-query";
import { fetchCategories } from "../../../../api/adapters";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../utility-components/Select";
import { cn } from "../../utility-components/helpers/utils";

type CategoriesSelectProps = {
    projectId: string;
    categoryId: string;
    setCategoryId: (category: string) => void;
    placeholder?: string;
    className?: string;
};

export const CategoriesSelect = ({
    projectId,
    categoryId,
    setCategoryId,
    placeholder,
    className
}: CategoriesSelectProps) => {
    const { data: categoriesData } = useQuery({
        queryKey: ["categories", projectId],
        queryFn: () => fetchCategories(projectId),
        enabled: !!projectId,
        staleTime: 1000 * 60 * 1
    });

    if (!categoriesData?.length) return null;

    return (
        <Select
            aria-placeholder="Select Category"
            value={categoryId}
            onValueChange={(value) => setCategoryId(value)}
            required
        >
            <SelectTrigger className={cn("min-w-[10rem] cursor-pointer", className)}>
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                {categoriesData?.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                        {category.name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};
