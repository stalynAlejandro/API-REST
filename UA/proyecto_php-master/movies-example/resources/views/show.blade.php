@extends('layouts.main')

@section('content')
    <div class="movie-info border-b border-gray-800">
        <div class="container mx-auto px-4 py-16 flex flex-col mg:flex-row lg:flex-row">
            <img src="{{'https://image.tmdb.org/t/p/w780' . $movie['poster_path']}}" alt="asamblea" class="w-64 md:w-90" style="width: 100rem">
            <div class="md:ml-20">
                <h2 class="text-4xl font-semibold">{{ $movie['title'] }}</h2>
                <div class="mt-2">
                        <div class="flex items-center text-gray-400">
                            <span>star</span>
                            <span class="ml-1">{{$movie['vote_average']}}</span>
                            <span class="mx-2">|</span>
                            <span>{{\Carbon\Carbon::parse($movie['release_date'])->format('M d, Y')}}</span>
                            <span class="mx-2">|</span>
                            <span>
                                @foreach($movie['genres'] as $genre)
                                    {{$genre['name']}}@if(!$loop->last), @endif
                                @endforeach
                            </span>
                        </div>
                    </div>
                    <p class="text-gray-100 mt-1">
                        {{$movie['overview']}}
                    </p>
                    <div class="mt-12">
                        <h4 class="text-white font-semibold">Feature Crew</h4>
                        <div class="flex mt-4">
                            @foreach($movie['credits']['crew'] as $crew)
                                @if($loop->index < 2)
                                    <div class="mr-8">
                                        <div>{{$crew['name']}}</div>
                                        <div class="text-sm text-gray-400">
                                            {{ $crew['job'] }}
                                        </div>
                                    </div>
                                @endif
                            @endforeach

                        </div>
                    </div>

                    <div class="mt-12">
                        <a href="https://youtube.com/watch?v={{$movie['videos']['results'][0]['key']}}" 
                        class="flex inline-flex items-center bg-orange-500 text-gray-900 rounded font-semibold px-5
                        py-4 hover:bg-orange-600 transition ease-in-out duration-150">
                        <span class="ml-2">Play Trailer</span>
                        </a>
                    </div>
            </div>
        </div>
    </div>
@endsection