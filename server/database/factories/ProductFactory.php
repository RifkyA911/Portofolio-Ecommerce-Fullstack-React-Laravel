<?php

namespace Database\Factories;

use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->unique()->word,
            'category' => $this->faker->word,
            'price' => $this->faker->randomNumber(4), // Angka 2 adalah jumlah digit desimal
            'stock' => $this->faker->randomNumber(3),
            'discount' => null,
            // 'pict' => Str::random(6) . '.jpg',
            'pict' => 'default.jpg',
            'description' => null,
        ];
    }
}
