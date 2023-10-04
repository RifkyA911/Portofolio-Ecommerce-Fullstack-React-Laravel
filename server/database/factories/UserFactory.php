<?php

namespace Database\Factories;

use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\File;


/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        // $imageDirectory = public_path('user_avatar'); // Ganti dengan lokasi direktori gambar Anda
        // $imageFiles = File::allFiles($imageDirectory);
        // $randomImage = $imageFiles[mt_rand(0, count($imageFiles) - 1)]; // Memilih file secara acak

        return [
            'email' => fake()->unique()->safeEmail(),
            'username' => fake()->name(),
            'password' => Hash::make('123456'),
            'address' => fake()->address(),
            'verified' => null,
            // 'pict' => Str::random(6).'.jpg',
            'pict' => 'default.png',
            // 'pict' =>  $randomImage->getFilename() // Menggunakan nama file acak

        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
