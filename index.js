const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const rateLimit = require('express-rate-limit')
const helmet  = require('helmet')
const path = require('path')
const logger = require('./logger');
dotenv.config({ path: './config.env' });
const app = express();
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 1000, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  ipv6Subnet: 56, // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive

})
// 2. Middleware
app.use(
  helmet({
    crossOriginResourcePolicy: false, // អនុញ្ញាតឱ្យទាញយករូបភាពឆ្លង Domain
  })
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(limiter)
// app.use(cors({
//     origin: 'http://localhost:5173', // Must match your Vite URL exactly
//     credentials: true,               // Allows cookies to be sent
// }));
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));

app.use(morgan("dev"))
const db = require('./config/db');
const AdminRouter = require('./routes/login.route');
const PackageRouter = require('./routes/package.route');
const ServiceRouter = require('./routes/services.route');
const BookingRouter = require('./routes/booking.route');
const CategoryRouter = require('./routes/category.route');
const BannerRouter = require('./routes/banner.route');
const { authGuard } = require('./guard/authGuard.guard');

// 4. Connect to Database
db();
app.use(
  morgan("combined", {
    stream: {
      write: (message) => logger.info(message.trim()),
    },
  })
);
// 5. Mount Routes
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/api/admin', AdminRouter);
app.use('/api/package', PackageRouter)
app.use('/api/services', ServiceRouter)
app.use('/api/booking', BookingRouter)
app.use('/api/category', CategoryRouter)
app.use('/api/services' , ServiceRouter)
app.use('/api/banner', BannerRouter)

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server run on port ${port}`);
});