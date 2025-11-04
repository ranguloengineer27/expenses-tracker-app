import type { CategoryExpense } from "../../../../api/types";

export type CategoryGroup = {
    parent: CategoryExpense;
    children: CategoryExpense[];
};

export const mapCategories = (categories: CategoryExpense[]): CategoryGroup[] => {
    const topLevelCategories = categories.filter(
        (category) => !category.parent_id
    );

    const childrenByParent = Object.groupBy(
        categories,
        (category) => category.parent_id ?? "none"
    );

    return topLevelCategories.map((parent) => ({
        parent,
        children: childrenByParent[parent.id] ?? [],
    }));
};

