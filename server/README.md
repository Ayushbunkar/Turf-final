# Turf Time Server

Express + Mongoose backend.

## Structure
src/
  models/        # Mongoose schemas
  routes/        # Route modules
  controllers/   # Request handlers
  middleware/    # Auth / role / error
  payment/       # Razorpay integration
  utils/         # Helpers

## Env Vars
See `.env.example` for full list.

## Run
```
npm install
npm run dev
```

## Error Handling
Add errors with `return next(err)` or throw. A global error handler middleware will format responses.

