// tracing.ts

import { diag, DiagConsoleLogger, DiagLogLevel } from '@opentelemetry/api';
import { NodeSDK } from '@opentelemetry/sdk-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';
import { PrismaInstrumentation } from '@prisma/instrumentation'
import { ExpressInstrumentation } from '@opentelemetry/instrumentation-express';
import {env} from "@/common/utils/envConfig";

// Enable maximum logging for troubleshooting
diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.ALL);

// Configure the OTLP trace exporter to send traces to the Jaeger/OTel collector
const traceExporter = new OTLPTraceExporter({
    url: 'http://host.docker.internal:4318/v1/traces', // Ensure this matches your collector endpoint
});

// Define the resource (service name, etc.)
const resource = new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: 'my-express-service', // Name your service
});

// Initialize the OpenTelemetry SDK with instrumentations
const sdk = new NodeSDK({
    resource: resource,
    traceExporter: traceExporter,
    instrumentations: [
        getNodeAutoInstrumentations(),
        new HttpInstrumentation(),
        new ExpressInstrumentation(),
        new PrismaInstrumentation()
    ],
});

// Start the SDK
sdk.start();

// Ensure to shut down the SDK on process exit
process.on('SIGTERM', () => {
    sdk.shutdown()
        .then(() => console.log('OpenTelemetry SDK shut down successfully'))
        .catch((err) => console.log('Error shutting down OpenTelemetry SDK', err))
        .finally(() => process.exit(0));
});
