export interface Revenue {
    ISIN: string;
    company_name: string;
    year: number;
    rgs_product_category: string;
    company_product_category_revenue: number;
}

export interface ThemeMapping {
    rgs_product_category: string;
    [key: string]: string; // For dynamic theme keys
}

export interface DescriptionMapping {
    rgs_product_category: string;
    product_category_description: string;
}

export interface SectorMapping {
    ISIN: string;
    dom_country: string;
    economic_sector: string;
    industry: string;
}
