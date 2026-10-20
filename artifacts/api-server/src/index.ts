import app from "./app";
import { logger } from "./lib/logger";
import { initializeMigrationDemoStore } from "./lib/migrationDemoStore";

const rawPort = process.env["PORT"];

if (!rawPort) {
  throw new Error(
    "PORT environment variable is required but was not provided.",
  );
}

const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

const startServer = async () => {
  await initializeMigrationDemoStore();
  app.listen(port, (err) => {
    if (err) {
      logger.error({ err }, "Error listening on port");
      process.exit(1);
    }

    logger.info({ port }, "Server listening");
  });
};

void startServer().catch((error) => {
  logger.error({ errorName: error instanceof Error ? error.name : "UnknownError" }, "Server initialization failed");
  process.exit(1);
});
