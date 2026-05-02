import mongoose, { Schema, Document } from 'mongoose';

export interface IOrder extends Document {
  customerName: string;
  customerPhone: string;
  items: { productId: mongoose.Types.ObjectId; title: string; qty: number }[];
  message: string;
  status: 'new' | 'seen' | 'resolved';
  createdAt: Date;
}

const OrderSchema: Schema = new Schema({
  customerName: { type: String, required: true },
  customerPhone: { type: String, required: true },
  items: [{
    productId: { type: Schema.Types.ObjectId, ref: 'Product' },
    title: { type: String },
    qty: { type: Number }
  }],
  message: { type: String },
  status: { type: String, enum: ['new', 'seen', 'resolved'], default: 'new' },
}, { timestamps: true });

export default mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);
