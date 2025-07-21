import mongoose from 'mongoose';

const marketPriceSchema = new mongoose.Schema({
  commodity: { type: String, required: true },
  price: { type: Number, required: true },
  unit: { type: String, required: true },
  market: { type: String, required: true },
  region: { type: String, required: true },
  date: { type: Date, default: Date.now },
  source: { type: String }
});

const MarketPrice = mongoose.model('MarketPrice', marketPriceSchema);
export default MarketPrice;