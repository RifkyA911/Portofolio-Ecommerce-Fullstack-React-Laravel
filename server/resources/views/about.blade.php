@extends('layouts.main')
@section('content')
    <h1>about</h1>
    <h4>nama : {{ $nama }}</h4>
    <h4>Nomor hp : {{ $phone }}</h4>
    <img src="img/{{ $img }}" alt="{{ $nama }}" width="200px" class="img-thumbnail rounded-circle">
    <h3>halaman percobaa, hapus stelah selesai</h3>
@endsection