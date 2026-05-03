import React from 'react';
import connectToDatabase from '@/lib/mongodb';
import Order from '@/models/Order';
import { Badge } from '@/components/ui/badge';

export const revalidate = 0;

export default async function AdminOrdersPage() {
  await connectToDatabase();
  const orders = await Order.find().sort({ createdAt: -1 }).lean();

  return (
    <div>
      <h1 className="text-3xl font-bold font-heading text-charcoal mb-8">WhatsApp Inquiries</h1>
      
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-700">
            <tr>
              <th className="px-6 py-4 font-medium">Customer</th>
              <th className="px-6 py-4 font-medium">Products</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium text-right">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {orders.map((order: any) => (
              <tr key={order._id.toString()} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-900">{order.customerName}</div>
                  <div className="text-gray-500 text-xs">{order.customerPhone}</div>
                </td>
                <td className="px-6 py-4 text-gray-500">
                  {order.items?.map((item: any, i: number) => (
                    <div key={i}>{item.title} × {item.qty}</div>
                  ))}
                  {(!order.items || order.items.length === 0) && order.message && (
                    <span className="italic text-xs truncate block max-w-xs">{order.message}</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <Badge variant={order.status === 'new' ? 'secondary' : order.status === 'resolved' ? 'default' : 'outline'}>
                    {order.status || 'new'}
                  </Badge>
                </td>
                <td className="px-6 py-4 text-right">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-8 text-gray-500">No inquiries yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
