import { Category } from './Category'

export type Product = {
	id?: string
	product_name?: string
	product_desc?: string
	product_weight?: number
	product_price?: number
	product_image?: string
	sale_count?: number
	category?: Category
	category_name?: string
}
