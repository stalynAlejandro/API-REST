<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Movie App</title>

        <link rel="stylesheet" href="/css/main.css">
        
    </head>

    <body class="font-sans bg-gray-900 text-white">

        <nav class="border-b border-gray-800">
            <div class="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between px-4 py-6">
                <ul class="flex flex-col md:flex-row items-center">
                    <li>
                        <a href="{{route('movies.index')}}">
                            <!-- AQUÍ FALTA EL svg del logo -->
                            <svg class="w-10" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                    viewBox="0 0 19.132 19.132" style="enable-background:new 0 0 19.132 19.132;" xml:space="preserve">
                                <g>
                                    <g>
                                        <path style="fill:#030104;" d="M9.172,9.179V0.146H0v9.033H9.172z"/>
                                        <path style="fill:#030104;" d="M19.132,9.179V0.146H9.959v9.033H19.132z"/>
                                        <path style="fill:#030104;" d="M19.132,18.986V9.955H9.959v9.032H19.132z"/>
                                        <path style="fill:#030104;" d="M9.172,18.986V9.955H0v9.032H9.172z"/>
                                    </g>
                                </g>
                            </svg>
                        </a>
                    </li>
                    <li class="md:ml-16 mt-3 md:mt-0">
                        <a href="{{route('movies.index')}}" class="hover:text-gray-300">Movies</a>
                    </li>
                    <li class="md:ml-6 mt-3 md:mt-0">
                        <a href="#" class="hover:text-gray-300">TV Shows</a>
                    </li>
                    <li class="md:ml-6 mt-3 md:mt-0">
                        <a href="#" class="hover:text-gray-300">Actors</a>
                    </li>

                </ul>

                <div class="flex items-center">
                    <div class="relative mt-3 md:mt-0">
                        <input type="text" class="bg-gray-800 rounded-full w-64 px-4 pl-8 py-1 focus:shadow-outline" placeholder="Search">
                    </div>
                </div>
            </div>
        </nav>
        @yield('content')
    </body>
</html>

