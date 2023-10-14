<?php

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
        Schema::create('messages', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->default(null);
            $table->foreignId('admin_id')->nullable()->default(null);
            $table->foreignId('dialog_id');
            $table->text('message');
            $table->boolean('seen')->default(false);;
            $table->boolean('block')->default(false);;
            $table->string('pict')->nullable()->default(null);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('messages');
    }
};
