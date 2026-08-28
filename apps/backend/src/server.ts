import path from "node:path";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { env, isProduction } from "./config/env";
import routes from "./routes";
import { errorHandler, notFoundHandler } from "./middleware/error.middleware";

const app = express();

const allowedOrigins = [...env.clientUrls, ...env.adminUrls];

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

// Uploaded portfolio images: served same-origin-safe (helmet sets
// Cross-Origin-Resource-Policy: same-origin globally, which would block the
// admin app's plain <img> tags and next/image on the client from loading
// these cross-origin — relax it for this path only.
app.use(
  "/uploads",
  (_req, res, next) => {
    res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
    next();
  },
  express.static(path.join(process.cwd(), "uploads"))
);

app.use("/api", routes);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(env.port, () => {
  console.log(`A Print API listening on http://localhost:${env.port} (${isProduction ? "production" : "development"})`);
});
