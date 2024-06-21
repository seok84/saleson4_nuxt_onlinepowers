import Api from "@/modules/api/Api";

export default class CategoryApi extends Api {
    constructor(context) {
        super(context);
    }

    /**
     * 전체 카테고리 조회
     * @param params
     * @returns {*}
     */
    getAllCategories() {
        return this.get("/api/category");
    }


    /**
     * 카테고리 정보 조회 데이터를 가공함.
     * @param categoryData
     * @param categoryCode
     * @returns {{}|{categoryName3: string, categoryName1: string, categoryName2: string, categories: *[], title: string}}
     */
    getCategoryInfo(categoryData, categoryCode) {

        if (categoryData.list == null
            || categoryData.list.length === 0
            || categoryData.list[0].childCategories == null
            || categoryData.list[0].childCategories.length === 0) {
            return {

            }
        }

        console.log("categoryData.list[0].childCategories : ");
        console.log(categoryData.list[0].childCategories);

        let allCategories = categoryData.list;
        let title = '';
        let categoryName1 = '';
        let categoryName2 = '';
        let categoryName3 = '';
        let categories = [];
        let selectedCategoryDepth = 0;

        for (const category1 of allCategories) {
            category1.active = false;
            if (category1.url === categoryCode) {
                title = category1.name;
                categoryName1 = category1.name;
                category1.active = true;

                categories.push(allCategories);
                categories.push(category1.childCategories);
                selectedCategoryDepth = 0;
            }

            for (const category2 of category1.childCategories) {
                category2.active = false;
                if (category2.url === categoryCode) {
                    title = category2.name;
                    categoryName1 = category1.name;
                    categoryName2 = category2.name;

                    category1.active = true;
                    category2.active = true;

                    categories.push(allCategories);
                    categories.push(category1.childCategories);
                    categories.push(category2.childCategories);
                    selectedCategoryDepth = 1;
                }

                for (const category3 of category2.childCategories) {
                    category3.active = false;
                    if (category3.url === categoryCode) {
                        title = category3.name;
                        categoryName1 = category1.name;
                        categoryName2 = category2.name;
                        categoryName3 = category3.name;

                        category1.active = true;
                        category2.active = true;
                        category3.active = true;

                        categories.push(allCategories);
                        categories.push(category1.childCategories);
                        categories.push(category2.childCategories);
                        selectedCategoryDepth = 2;
                    }
                }
            }
        }
        return {
            title: title,
            categoryName1: categoryName1,
            categoryName2: categoryName2,
            categoryName3: categoryName3,
            selectedCategoryDepth: selectedCategoryDepth,
            categories: categories
        };
    }

}
