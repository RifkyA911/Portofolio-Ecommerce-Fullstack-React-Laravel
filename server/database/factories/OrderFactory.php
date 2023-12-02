<?php

namespace Database\Factories;

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
        $currentDate = now(); // Mendapatkan tanggal dan waktu sekarang

        // Mengurangkan 1 hari dari tanggal sekarang
        $updatedDate = $currentDate->subDay();

        function randomAngka()
        {
            // return random user_id, atau sesuaikan dengan kebutuhan aplikasi Anda
            return rand(1, 10);
        }

        return [
            'user_id' => randomAngka(),
            'admin_id' => randomAngka(),
            'shipment_id' => randomAngka(),
            'payment_id' => randomAngka(),
            'no_invoice' => function () {
                // return random user_id, atau sesuaikan dengan kebutuhan aplikasi Anda
                return 'INV/202312/' . rand(1, 10) . '/' . rand(1, 100);
            },
            'total_price' => $this->faker->randomNumber(4),
            'status' => $this->faker->randomElement(['Pending', 'Awaiting Payment', 'Processing', 'Shipped', 'Delivered', 'Completed', 'Cancelled', 'On Hold', 'Returned', 'Partially Shipped', 'Backordered', 'Failed']),
            // 'deadline' => $this->faker->randomNumber(3),
            'updated_at' => $updatedDate, // Menambahkan updated_at
        ];
    }
}
