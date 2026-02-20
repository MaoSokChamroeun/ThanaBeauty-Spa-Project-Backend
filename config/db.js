const connectionDB = async () => {
    try {
        const url = process.env.DATABASE_URL || "mongodb://localhost:27017/spa-project";
        
        await mongoose.connect(url);
        console.log(`✅ MongoDB Connected to ${url.includes('mongodb+srv') ? 'Cloud' : 'Local'}`);
    } catch (error) {
        console.error('❌ Connection error:', error);
        process.exit(1);
    }
}