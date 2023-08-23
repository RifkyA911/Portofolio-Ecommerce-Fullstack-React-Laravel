@extends('layouts.main')
@section('content')
{{-- @dd($product) --}}
    <img src="/img/altera_dance.gif" alt="{{ $product['nama'] }}" width="200px" class="img-thumbnail">
    <h2>{{ ucwords($product['nama']) }}</h2>
    <h5>Harga : Rp{{ number_format($product['harga'], 0, ',', '.') }},-</h5>
    <h3>halaman percobaa, hapus stelah selesai</h3>
@endsection
