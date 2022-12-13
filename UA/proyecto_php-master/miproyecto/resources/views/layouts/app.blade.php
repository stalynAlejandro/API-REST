<html>
    <head>
        <title> App Name - @yield('title')</title>

        <meta charset = "utf-8">
        <meta name = "viewport" content="width=device-width, initial-scale=1">

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Baloo+Chettan+2" rel="stylesheet">
    
        <style>
            html, body{
                background-color: #5B2C61;
                color: #FFFF;
                font-family: 'Baloo Chettan 2';
                font-weight: 600;
                height: 100vh;
                margin: 0;
            }

            .full-height{
                height: 100vh;
            }

            .flex-center{
                align-items: center;
                display: flex;
                justify-content: center;
            }

            .position-ref{
                position: relative;
            }

            .top-right{
                position: absolute;
                right: 10px;
                top: 18px;
            }

            .content{
                text-align: center;
            }

            .title{
                font-size: 10px;
            }

            .m-b {
                margin-top:30px;
                margin-bottom: 30px;
                font-size: 50px;
            }
        </style>

    </head>

    <body>
        @section('sidebar')
            This is the master sidebar.
        @show

        <div class="container">
            @yield('content', View::make('mypage', ['id'=>'1']))
        </div>
    </body>
</html>