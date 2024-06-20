import Layout from "@/components/layout";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Orders() {
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        axios.get('/api/orders').then((response) => {
            setOrders(response.data);
        });
    }, [])
    return (
        <Layout>
            <h1>
                Orders
            </h1>
            <table className="basic">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Paid</th>
                        <th>Recipient</th>
                        <th>Products</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.length > 0 && orders.map((order, index) => (
                        <tr key={index}>
                            <td>
                                {(new Date(order.createdAt)).toLocaleString()}
                            </td>
                            <td>
                                {order.paid ? 'YES' : 'NO'}
                            </td>
                            <td>
                                {order.name} {order.email} <br />
                                {order.address} {order.city}  <br />
                                {order.country} {order.postalCode}
                            </td>
                            <td>
                                {order.line_items.map(l => (
                                    <>
                                        {l.price_data?.product_data?.name} x{l.quantity} <br />
                                    </>
                                ))}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Layout>
    )
}