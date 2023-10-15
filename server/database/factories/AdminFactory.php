<?php

namespace Database\Factories;

use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\File;
use Faker\Generator as Faker;

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

        $images = ["0ae78ee4-baef-4563-8323-23f64eb6d26b.jpg", "77045517_p0.jpg", "77045517_p1.jpg", "77045517_p2.jpg", "77045517_p3.jpg", "77045517_p4.jpg", "77045517_p5.jpg", "77045517_p6.jpg", "77045517_p7.jpg", "77045517_p8.jpg", "77845097_p0.jpg", "77845097_p1.jpg", "77845097_p2.jpg", "77845097_p3.jpg", "77845097_p4.jpg", "77845097_p5.jpg", "77845097_p6.jpg", "77845097_p7.jpg", "77845097_p8.jpg", "78868937_p1.jpg", "78949689_p0.jpg", "78949689_p1.jpg", "84719630_p1.jpg", "85633671_p7.jpg", "85633671_p8.jpg", "86466834_p0.jpg", "87036407_p0.jpg", "87500297_p0.jpg", "88129567_p0.jpg", "88129567_p1.jpg", "88316563_p0.jpg", "88316563_p1.jpg", "88620583_p0.jpg", "be297bc5ly1hf4wg5tjp7j20jg0jgah2.jpg", "blank.jpg", "default.png", "list.txt", "sara.jpg"];
        // Secara acak memilih satu nama gambar dari daftar
        $randomIndex = array_rand($images);

        return [
            'username' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'password' => Hash::make('123456'),
            'role' => 1,
            // 'role' => mt_rand(0, 1),
            'phone' => fake()->unique()->phoneNumber(),
            'pict' => $images[$randomIndex],
            // 'pict' => 'default.png',
            // 'pict' =>  $randomImage->getFilename(), // Menggunakan nama file acak
        ];
    }
}
