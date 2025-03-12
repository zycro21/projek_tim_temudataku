import cors from "cors";

// Ambil origins dari environment variable jika ada
const allowedOriginsEnv = process.env.CORS_ORIGINS;
const allowedOrigins = allowedOriginsEnv 
  ? allowedOriginsEnv.split(",") 
  : [
      'http://localhost:3000',  // Frontend development
      'http://localhost:5173',  // Vite default
    ];

const corsOptions: cors.CorsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl, Postman)
    if (!origin) {
      return callback(null, true);
    }

    if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV === 'development') {
      callback(null, true);
    } else {
      callback(new Error(`CORS policy: Origin ${origin} not allowed`));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  credentials: true, // for cookie/token
  optionsSuccessStatus: 204, // some legacy browsers (IE11) choke on 204
  maxAge: 86400, // Cache preflight response for 24 hours
};

export default cors(corsOptions);