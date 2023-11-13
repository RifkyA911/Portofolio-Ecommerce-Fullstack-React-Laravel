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
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id');
            $table->foreignId('admin_id')->nullable();
            $table->text('products_id');
            $table->integer('total_price');
            $table->string('address');
            $table->text('no_invoice');     // format penomoran INV/tahunBulan/user_id/id_transaksi
            $table->text('payment')->nullable()->default(null);     // isi bukti pembayaran
            $table->timestamp('checked_out')->nullable()->default(null);
            $table->timestamp('sent')->nullable()->default(null);
            $table->timestamp('done')->nullable()->default(null);
            $table->text('comment')->nullable()->default(null);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
