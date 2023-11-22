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
        if (!Schema::hasTable('orders')) {
            Schema::create('orders', function (Blueprint $table) {
                $table->id();
                $table->foreignId('user_id');
                $table->foreignId('admin_id')->nullable()->onDelete('set null')->default(null);
                $table->foreignId('shipment_id')->nullable()->onDelete('set null')->default(null);
                $table->foreignId('payment_id')->nullable()->default(null);     // isi bukti pembayaran
                $table->text('no_invoice');     // format penomoran INV/tahunBulan/user_id/id_order
                // $table->text('products_id');
                $table->integer('total_price');
                // $table->string('address');
                // $table->timestamp('checked_out')->nullable()->default(null);
                // $table->timestamp('sent')->nullable()->default(null);
                // $table->timestamp('done')->nullable()->default(null);
                /*
                ------------------- kolom 'status' value states -------------------
                1. Pending: Pesanan belum diproses atau menunggu konfirmasi.
                2. Processing: Pesanan sedang diproses oleh penjual atau sistem.
                3. Shipped/Dispatched: Pesanan telah dikirim atau telah diambil oleh pihak pengiriman.
                4. Delivered: Pesanan telah berhasil diantarkan kepada pelanggan.
                5. Completed: Seluruh proses pesanan selesai, termasuk pengiriman dan penerimaan.
                6. Cancelled/Refunded: Pesanan dibatalkan oleh pelanggan atau penjual, dan mungkin ada pengembalian dana.
                7. On Hold: Pesanan ditunda atau ditahan sementara.
                8. Returned: Produk dikembalikan oleh pelanggan.
                9. Awaiting Payment: Menunggu pembayaran dari pelanggan.
                10. Partially Shipped: Hanya sebagian dari pesanan yang telah dikirim.
                11. Backordered: Barang atau produk dalam pesanan tidak tersedia saat ini dan akan dikirim kemudian. 
                */
                $table->text('status')->nullable()->default('Pending');
                $table->timestamp('deadline_payment')->default(now()->addDay());
                // $table->text('comment')->nullable()->default(null); // moved to table order_items
                $table->timestamps();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
