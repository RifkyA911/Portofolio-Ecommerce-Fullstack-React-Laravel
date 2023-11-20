<?php

namespace Database\Factories;

use App\Models\Notification;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Notification>
 */
class NotificationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = Notification::class;

    public function definition()
    {
        return [
            'user_id' => function () {
                // return random user_id, atau sesuaikan dengan kebutuhan aplikasi Anda
                return rand(1, 10);
            },
            'admin_id' => function () {
                // return random admin_id, atau sesuaikan dengan kebutuhan aplikasi Anda
                return rand(1, 5);
            },
            'difficulty' => $this->faker->randomElement(['Chat', 'Order', 'Invoice', 'Review', 'Add', 'Update', 'Delete', 'Info']),
            'message' => $this->faker->text,
            'created_at' => $this->faker->dateTimeBetween('-1 year', 'now'),
            'updated_at' => $this->faker->dateTimeBetween('-1 year', 'now'),
        ];
    }
}
