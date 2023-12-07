<?php

namespace Database\Factories;

use App\Models\Order;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Order>
 */
class OrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $randomDay = rand(1, 31); // get substraction number to varies te date
        $currentDate = now()->subDays($randomDay); // Mendapatkan tanggal dan waktu dikurangi $randomDay
        $deadlinePayment_date = now()->subDays($randomDay - 1); // tanggal deadline payment sehari setelah

        // random user_id
        $userID = rand(1, 10);
        // $idOrder = Order::max('id') + 1;

        return [
            'user_id' => $userID,
            'admin_id' => function () {
                // return random user_id, atau sesuaikan dengan kebutuhan aplikasi Anda
                return rand(1, 10);
            },
            'shipment_id' => function () {
                // return random user_id, atau sesuaikan dengan kebutuhan aplikasi Anda
                return rand(1, 10);
            },
            'payment_id' => function () {
                // return random user_id, atau sesuaikan dengan kebutuhan aplikasi Anda
                return rand(1, 10);
            },
            'no_invoice' => 'INV/' . explode("-", $currentDate)[0] . explode("-", $currentDate)[1] . "/$userID",
            'total_price' => $this->faker->randomNumber(4),
            'status' => $this->faker->randomElement(['Pending', 'Awaiting Payment', 'Processing', 'Shipped', 'Delivered', 'Completed', 'Cancelled', 'On Hold', 'Returned', 'Partially Shipped', 'Backordered', 'Failed']),
            'deadline_payment' => $deadlinePayment_date,
            'updated_at' => $currentDate, // Menambahkan updated_at
        ];
    }
    public function configure(): static
    {
        return $this->afterCreating(function (Order $order){
            $order->timestamps = false;
            $order->no_invoice = $order->no_invoice . "/$order->id";
            $order->update();
            $order->timestamps = true;
        });
    }
}
