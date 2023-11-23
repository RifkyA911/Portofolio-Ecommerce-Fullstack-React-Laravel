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
        Schema::create('notifications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained();
            $table->foreignId('admin_id')->constrained();
            // $table->foreign('user_id')->references('id')->on('users')->onDelete('set null');
            // $table->foreign('admin_id')->references('id')->on('admins')->onDelete('set null');
            /*
            ------------------- kolom 'type' value states -------------------
            1. Chat: Pesanan belum diproses atau menunggu konfirmasi.
            2. Order: Pesanan sedang diproses oleh penjual atau sistem.
            3. Invoice: Pesanan telah dikirim atau telah diambil oleh pihak pengiriman.
            4. Review: Pesanan telah berhasil diantarkan kepada pelanggan.
            5. Add: Seluruh proses pesanan selesai, termasuk pengiriman dan penerimaan.
            6. Update: Pesanan dibatalkan oleh pelanggan atau penjual, dan mungkin ada pengembalian dana.
            7. Delete: Pesanan ditunda atau ditahan sementara.
            8. Info: Produk dikembalikan oleh pelanggan.
            */
            $table->enum('type', ['Chat', 'Order', 'Invoice', 'Review', 'Add', 'Update', 'Delete', 'Info'])->nullable()->default('Info');
            $table->text('message');
            $table->boolean('is_seen')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('notifications');
    }
};
