import express from "express";
import cors from "cors";
import helmet from "helmet";
import { env, isProduction } from "./config/env";
import routes from "./routes";
import { errorHandler, notFoundHandler } from "./middleware/error.middleware";

const app = express();

const allowedOrigins = [env.clientUrl, env.adminUrl];

app.use(helmet());
app.use(
  cors({
    origin(origin, callback) {
      // Allow non-browser tools (curl, server-to-server, no Origin header) and
      // any explicitly configured client/admin origin. Never a wildcard.
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }
      callback(new Error(`Origin not allowed: ${origin}`));
    },
    credentials: true,
  })
);
app.use(express.json());

app.use("/api", routes);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(env.port, () => {
  console.log(`A Print API listening on http://localhost:${env.port} (${isProduction ? "production" : "development"})`);
});
