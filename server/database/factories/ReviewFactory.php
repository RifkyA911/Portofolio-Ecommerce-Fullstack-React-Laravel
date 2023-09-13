<?php

namespace Database\Factories;

use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Review>
 */
class ReviewFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'product_id' => rand(1,3),
            'user_id' => rand(1,5),
            'rating' => rand(1,5),
            'review' => fake()->sentences(rand(7,10), true),
            'pict' => Str::random(6).'.jpg'
        ];
    }
}
