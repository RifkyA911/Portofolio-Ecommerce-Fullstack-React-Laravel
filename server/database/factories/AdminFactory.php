<?php

namespace Database\Factories;

use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\File;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Admin>
 */
class AdminFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        // $imageDirectory = public_path('admin_avatar'); // Ganti dengan lokasi direktori gambar Anda
        // $imageFiles = File::allFiles($imageDirectory);
        // $randomImage = $imageFiles[mt_rand(0, count($imageFiles) - 1)]; // Memilih file secara acak

        return [
            'username' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'password' => Hash::make('123456'),
            'role' => 1,
            // 'role' => mt_rand(0, 1),
            'pict' => 'default.png',
            // 'pict' =>  $randomImage->getFilename() // Menggunakan nama file acak
        ];
    }
}
