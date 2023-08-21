@extends('layouts.main')
@section('content')
    @foreach ($product as $item)
        <h2>{{ ucwords($item['nama']) }}</h2>
        <h5>Harga : Rp{{ number_format($item['harga'], 0, ',', '.') }},-</h5>
        <hr>
    @endforeach
    <h3>halaman percobaa, hapus stelah selesai</h3>
@endsection
