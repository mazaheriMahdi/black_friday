import {OpenApiGeneratorV3, OpenAPIRegistry} from "@asteasolutions/zod-to-openapi";

import {healthCheckRegistry} from "@/api/healthCheck/healthCheckRouter";
import {userRegistry} from "@/api/user/userRouter";
import {foodRegistary} from "@/api/food/foodRouter";
import {categoryRegistry, productRegistry} from "@/api/products/productRouter";

export function generateOpenAPIDocument() {
    const registry = new OpenAPIRegistry([healthCheckRegistry, userRegistry, foodRegistary, productRegistry, categoryRegistry]);
    const generator = new OpenApiGeneratorV3(registry.definitions);

    return generator.generateDocument({
        openapi: "3.0.0",
        info: {
            version: "1.0.0",
            title: "Swagger API",
        },
        externalDocs: {
            description: "View the raw OpenAPI Specification in JSON format",
            url: "/swagger.json",
        },
    });
}
