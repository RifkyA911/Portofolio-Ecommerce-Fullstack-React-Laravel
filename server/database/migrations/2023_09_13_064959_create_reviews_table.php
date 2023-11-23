<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('reviews', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->nullable()->constrained()->onDelete('set null')->default(null);
            $table->foreignId('user_id')->nullable()->constrained()->onDelete('set null')->default(null);
            $table->integer('rating');      // 1-5 stars
            $table->string('review')->nullable();       // the message or comment on product
            $table->string('pict')->nullable();
            // $table->string('helpful_count');
            // $table->string('not_helpful_count');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reviews');
    }
};
