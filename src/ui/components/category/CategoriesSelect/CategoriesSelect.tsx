import { useQuery } from "@tanstack/react-query";
import { fetchCategories } from "../../../../api/adapters";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../utility-components/Select";
import { cn } from "../../utility-components/helpers/utils";
import { mapCategories } from "./utils";

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
    className,
}: CategoriesSelectProps) => {
    const { data: categoriesData } = useQuery({
        queryKey: ["categories", projectId],
        queryFn: () => fetchCategories(projectId),
        enabled: !!projectId,
        staleTime: 1000 * 60 * 1,
    });

    if (!categoriesData?.length) return null;

    const categoryGroups = mapCategories(categoriesData);

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
                {categoryGroups.map((group) => (
                    <SelectGroup key={group.parent.id}>
                        <SelectItem value={group.parent.id}>
                            {group.parent.name}
                        </SelectItem>
                        {group.children.map((child) => (
                            <SelectItem
                                key={child.id}
                                value={child.id}
                                className="pl-5"
                            >
                                {child.name}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                ))}
            </SelectContent>
        </Select>
    );
};
