@extends('layouts.main')
@section('content')
{{-- @dd($product) --}}
    <img src="/img/altera_dance.gif" alt="{{ $product['name'] }}" width="200px" class="img-thumbnail">
    <h2>{{ ucwords($product['name']) }}</h2>
    <h6><b>Kategori :</b> {{ $product['category'] }} &ensp; <b>Sisa :</b> {{ $product['stock'] }}</h6>
    <h5>Harga : Rp{{ number_format($product['price'], 0, ',', '.') }},-</h5>
    <h3>halaman percobaa, hapus stelah selesai</h3>
@endsection
