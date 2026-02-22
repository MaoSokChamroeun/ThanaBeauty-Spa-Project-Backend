const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const rateLimit = require('express-rate-limit')
const helmet  = require('helmet')
const path = require('path')
const axios = require('axios');
const logger = require('./logger');
dotenv.config({ path: './config.env' });
const app = express();
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  limit: 1000,
  standardHeaders: 'draft-8', 
  legacyHeaders: false, 
  ipv6Subnet: 56, 

})
// 2. Middleware
app.use(
  helmet({
    crossOriginResourcePolicy: false, 
    crossOriginEmbedderPolicy: false,
  })
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(limiter)
app.use(cors({
  origin: true, 
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(morgan("dev"))
const db = require('./config/db');
const AdminRouter = require('./routes/login.route');
const PackageRouter = require('./routes/package.route');
const ServiceRouter = require('./routes/services.route');
const BookingRouter = require('./routes/booking.route');
const CategoryRouter = require('./routes/category.route');
const BannerRouter = require('./routes/banner.route');
const postRouter = require('./routes/post.route')
const { authGuard } = require('./guard/authGuard.guard');
const galleryRouter = require('./routes/gallery.route');
const videoRouter = require('./routes/video.route');

// 4. Connect to Database
db();
app.use(
  morgan("combined", {
    stream: {
      write: (message) => logger.info(message.trim()),
    },
  })
);

if (process.env.NODE_ENV === 'production') {
  setInterval(() => {
    axios.get('https://thanabeauty-spa-project-backend-1.onrender.com/ping')
      .then(() => console.log('Keep-alive ping sent!' , Date.now()))
      .catch((err) => console.log('Ping failed:', err.message));
  }, 300000);
}
app.get('/ping', (req, res) => {
  res.status(200).send('Server is awake! 🚀');
});
// 5. Mount Routes
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/api/admin', AdminRouter);
app.use('/api/package', PackageRouter)
app.use('/api/services', ServiceRouter)
app.use('/api/booking', BookingRouter)
app.use('/api/category', CategoryRouter)
app.use('/api/banner', BannerRouter)
app.use('/api/posts' , postRouter)
app.use('/api/gallery' , galleryRouter)
app.use('/api/video' , videoRouter)
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server run on port ${port}`);
});