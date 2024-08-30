import {StatusCodes} from "http-status-codes";
import {ServiceResponse} from "@/common/models/serviceResponse";
import {logger} from "@/server";
import {BasketRepository} from "@/api/basket/basketRepository";
import {AddItemToBasketRequestDto} from "@/api/basket/dto/addItemToBasketDto";
import {ProductRepository} from "@/api/products/productRepository";
import {CheckoutBasketDto} from "./dto/checkoutBasketDto";
import {InvoicesRepository} from "./invoicesRepository";

export class BasketService {
    private basketRepository: BasketRepository;
    private productRepository: ProductRepository;
    private invoicesRepository: InvoicesRepository;

    constructor(
        basketRepository: BasketRepository = new BasketRepository(),
        invoicesRepository: InvoicesRepository = new InvoicesRepository(),
        productRepository: ProductRepository = new ProductRepository()
    ) {
        this.basketRepository = basketRepository;
        this.productRepository = productRepository;
        this.invoicesRepository = invoicesRepository;
    }

    async checkoutBasket(checkoutBasketDto: CheckoutBasketDto): Promise<ServiceResponse<string>> {
        try {
            const items = await this.basketRepository.getBasketItems(
                checkoutBasketDto["basket-id"],
                checkoutBasketDto["user-id"]
            );
            if (items?.length === 0) {
                return ServiceResponse.failure("basket not found", StatusCodes.NOT_FOUND);
            }
            for (const basketItem of items) {
                const count = await this.productRepository.getProductCount(basketItem.ProductId);
                if (count == 0) {
                    return ServiceResponse.failure("not enough items", StatusCodes.PRECONDITION_FAILED);
                }
            }
            await this.basketRepository.checkoutBasket(checkoutBasketDto["basket-id"], checkoutBasketDto["user-id"]);

            this.invoicesRepository.createInvoices(
                checkoutBasketDto["basket-id"],
                checkoutBasketDto["user-id"],
                JSON.stringify(items.map((x) => x.ProductId))
            );

            return ServiceResponse.success<string>("done");
        } catch (ex) {
            const errorMessage = `Error while trying to find categories:, ${(ex as Error).message}`;
            logger.error(errorMessage);
            return ServiceResponse.failure("Internal server error", StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }

    async addItemToBasket(addToBasketDto: AddItemToBasketRequestDto): Promise<ServiceResponse<string | null>> {
        try {
            const product = await this.productRepository.findByIdAsync(addToBasketDto["product-id"]);
            if (!product) {
                return ServiceResponse.failure(
                    `Item With Id ${addToBasketDto["basket-id"]} Not found!`,
                    StatusCodes.BAD_REQUEST
                );
            }

            const basket = await this.basketRepository.getBasket(
                addToBasketDto["basket-id"],
                addToBasketDto["user-id"],
                addToBasketDto["product-id"]
            );

            if (!!basket) {
                return ServiceResponse.failure("Basket With Given Product Already Exists", StatusCodes.BAD_REQUEST);
            }

            const productCount = await this.productRepository.getProductCount(addToBasketDto["product-id"]);
            if (productCount == 0) {
                return ServiceResponse.failure("not enough items", StatusCodes.PRECONDITION_FAILED);
            }

            await this.basketRepository.newBasket(addToBasketDto);

            return ServiceResponse.success<string>("done");
        } catch (ex) {
            const errorMessage = `Error while trying to find categories:, ${(ex as Error).message}`;
            logger.error(errorMessage);
            return ServiceResponse.failure("Internal server error", StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }
}

export const basketService = new BasketService();
