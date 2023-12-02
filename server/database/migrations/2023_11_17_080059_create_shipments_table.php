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
        Schema::create('shipments', function (Blueprint $table) {
            $table->id();
            $table->text('consignee');
            $table->longText('address');
            $table->text('contact');
            $table->text('tracking_number')->default(null);
            $table->text('courier_service');
            $table->integer('cost');
            $table->text('status')->default('Pending');
            $table->timestamp('sent')->nullable()->default(null);
            $table->timestamp('done')->nullable()->default(null);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('shipments');
    }
};
