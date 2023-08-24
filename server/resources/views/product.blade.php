@extends('layouts.main')
@section('content')
    @foreach ($product as $item)
        <h2><a href="/product/{{ $item['id'] }}">{{ ucwords($item['name']) }}</a></h2>
        <h4>Harga : Rp{{ number_format($item['price'], 0, ',', '.') }},-</h4>
        <hr>
    @endforeach
    <h3>halaman percobaa, hapus stelah selesai</h3>
@endsection
