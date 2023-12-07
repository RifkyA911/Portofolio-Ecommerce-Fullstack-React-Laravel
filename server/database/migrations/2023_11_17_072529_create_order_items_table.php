<?php

use App\Models\Order;
use App\Models\Product;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('order_items', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Order::class)->nullable()->default(null); //order_id
            $table->foreignIdFor(Product::class);   //product_id
            $table->integer('quantity');    // number of bought product
            $table->integer('sum_price');   // quantity X price per unit
            $table->decimal('discount')->nullable()->default(null);
            $table->text('comment')->nullable()->default(null);
            // $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('order_items');
    }
};
