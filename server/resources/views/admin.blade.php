@extends('layouts.main')
@section('content')
<img src="/img/altera_dance.gif" alt="{{ $admin->username }}" width="200px" class="img-thumbnail rounded-circle">
    <h2>Nama : {{ ucwords($admin->username) }}</h2>
    <h5>Email : {{ $admin->email }}</h5>
    {{-- <h5>Password : {{ $admin->pw }}</h5> --}}
    <h5>Role : {{ $admin->role }}</h5>
    <h5>Picture : {{ $admin->pict }}</h5>
@endsection
