@extends('layouts.main')
@section('content')
    @foreach ($admins as $row)
        <h2>Nama : <a href="/admins/{{ $row->id }}">{{ ucwords($row->username) }}</a></h2>
        <h5>Email : {{ $row->email }}</h5>
        {{-- <h5>Password : {{ $row->pw }}</h5> --}}
        <h5>Role : {{ $row->role }}</h5>
        <h5>Picture : {{ $row->pict }}</h5>
        <hr>
    @endforeach
    <h3>halaman percobaa, hapus stelah selesai</h3>
@endsection
