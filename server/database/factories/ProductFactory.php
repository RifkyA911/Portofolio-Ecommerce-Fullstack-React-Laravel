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
            'barcode' => $this->faker->unique()->numerify('#############'),
            'name' => $this->faker->unique()->word,
            'category_id' => $this->faker->randomDigitNot(0),
            'price' => $this->faker->randomNumber(4),
            'stock' => $this->faker->randomNumber(3),
            'discount' => $this->faker->randomNumber(3),
            // 'pict' => Str::random(6) . '.jpg',
            'pict' => 'default.jpg',
            // 'description' => $this->faker->paragraphs(3, true),
            'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus luctus lacus sit amet lacus aliquam sagittis. Ut posuere mauris a lacus faucibus, eu convallis sapien varius. Phasellus tincidunt felis nec est efficitur placerat. Curabitur viverra felis magna, egestas dignissim sem mollis eu. Donec ornare eros at odio dapibus, ut aliquet orci faucibus. Phasellus mattis, nunc eu imperdiet ornare, enim sem egestas lectus, nec vehicula metus nisl sit amet diam. In nunc sem, sagittis at massa non, molestie aliquam ipsum.

            Pellentesque suscipit, enim vel elementum dictum, odio lorem tempus elit, sit amet tincidunt augue metus ut nisi. Morbi maximus nec augue a vehicula. Aliquam erat volutpat. Ut ex nulla, ultricies non facilisis ut, varius mollis erat. Sed pulvinar orci ac ex scelerisque, eget porttitor nisi luctus. Mauris gravida scelerisque scelerisque. Fusce eget laoreet mi. Aliquam sollicitudin massa ipsum, ut volutpat justo viverra eu.
            
            Mauris efficitur semper sollicitudin. Fusce vitae pulvinar ipsum. Suspendisse posuere dolor tortor, sed sagittis elit aliquam ullamcorper. Aenean at dapibus tortor, sed vulputate tellus. Donec nec rhoncus sem. Integer tincidunt neque ac nunc blandit, tempor facilisis tortor bibendum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec luctus euismod lorem. Curabitur ullamcorper purus tortor, quis scelerisque tortor vestibulum quis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed condimentum laoreet congue. Nulla facilisi. Ut eu nibh non erat dignissim convallis. Cras consectetur massa in sodales malesuada. Praesent accumsan efficitur aliquam. Proin ut orci felis.
            
            Aenean hendrerit non arcu sed consectetur. Duis purus ligula, ornare a luctus ut, pretium ac libero. Aenean pellentesque tortor ac nisl tincidunt finibus. In vel orci elementum, porta ligula rutrum, hendrerit eros. Quisque pharetra libero nec odio mollis, non consequat mauris ultrices. Maecenas eget egestas quam, at malesuada leo. Aliquam sit amet ipsum vitae tortor facilisis consectetur in sit amet sem. Curabitur sodales ullamcorper magna, sit amet venenatis elit cursus eu.
            
            Donec ullamcorper maximus eros, non viverra elit dapibus non. Suspendisse potenti. Sed orci sapien, efficitur consequat metus nec, mattis porttitor nibh. Cras ac dui eu turpis ullamcorper ultrices ut id sem. Vestibulum dignissim sagittis dolor at semper. Ut vehicula, est ac vehicula faucibus, libero augue consectetur sem, a venenatis augue diam eget sem. Phasellus sollicitudin turpis a tempus sollicitudin. Vivamus ex quam, lacinia non turpis ac, faucibus euismod purus. Proin bibendum odio ut mattis lobortis. Quisque euismod nunc id velit mattis, a gravida est scelerisque. Nulla vel aliquet metus. Sed faucibus at nulla vel dictum. Nunc in sapien tortor.',
        ];
    }
}
