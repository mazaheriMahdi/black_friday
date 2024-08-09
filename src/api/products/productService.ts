import {StatusCodes} from "http-status-codes";
import {ServiceResponse} from "@/common/models/serviceResponse";
import {logger} from "@/server";
import {ProductModel} from "@/api/products/productModel";
import {ProductRepository} from "@/api/products/productRepository";

export class ProductService {
    private productRepository: ProductRepository;

    constructor(repository: ProductRepository = new ProductRepository()) {
        this.productRepository = repository;
    }

    async findByIdAsync(asin: string): Promise<ServiceResponse<ProductModel | string | null>> {
        try {
            const product = await this.productRepository.findByIdAsync(asin);
            if (!product) {
                return ServiceResponse.failure('Item not found', StatusCodes.NOT_FOUND);
            }
            return ServiceResponse.success<ProductModel>(product);
        } catch (ex) {
            const errorMessage = `Error finding product with id ${asin}:, ${(ex as Error).message}`;
            logger.error(errorMessage);
            return ServiceResponse.failure("Internal server error", StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }

    async getCategories(): Promise<ServiceResponse<string[] | string | null>> {
        try {
            const categories = await this.productRepository.findCategoriesAsync() as string[];
            return ServiceResponse.success<string[]>(categories);
        } catch (ex) {
            const errorMessage = `Error while trying to find categories:, ${(ex as Error).message}`;
            logger.error(errorMessage);
            return ServiceResponse.failure("Internal server error", StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }

    async getCategoryItems(categoryName: string): Promise<ServiceResponse<ProductModel[] | string | null>> {
        try {
            const products = await this.productRepository.filterByCategoryAsync(categoryName) as ProductModel[];
            return ServiceResponse.success<ProductModel[]>(products);
        } catch (ex) {
            const errorMessage = `Error while trying to find categories:, ${(ex as Error).message}`;
            logger.error(errorMessage);
            return ServiceResponse.failure("Internal server error", StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }

}

export const productService = new ProductService();
