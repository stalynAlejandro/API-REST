<!DOCTYPE html>
<html lang="{{app()->getLocale()}}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE-edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>e-comerce</title>

        <!-- Fonts -->
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Montserrat|Roboto:300,400,700">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" class="">

        <!-- Styles -->
        <link rel="stylesheet" href="{{asset('css/app.css')}}">
        <link rel="stylesheet" href="{{asset('css/responsive.css')}}">

    </head>
    <body>
        <header>
            <div class="top-nav container">
                <div class="logo">Ecomerce</div>
                <ul>
                    <li><a href="#">Shop</a></li>
                    <li><a href="#">About</a></li>
                    <li><a href="#">Blog</a></li>
                    <li><a href="#">Cart</a></li>
                </ul>
            </div> <!-- end top nav -->

            <div class="hero container">
                <div class="hero-copy">
                    <h1>Ecomerce</h1>
                    <p>Description about the e-comerce.</p>
                    <div class="hero-buttons">
                        <a href="" class="button button-white">Button 1</a>
                        <a href="" class="button button-white">Button 2</a>
                    </div>
                </div> <!-- end hero copy -->
                
                <div class="hero-image">
                    <img src="img/macbook-pro-laravel.png" alt="hero image">
                </div>

            </div> <!-- end hero -->
        </header>
        
        <div class="featured-section">
            <div class="container">
                <h1 class="text-center">CSS Grid Example</h1>
                <p class="section-description"> Description about the featured section</p>
                
                <div class="text-center button-container">
                    <a href="#" class="button">Featured</a>
                    <a href="#" class="button">On Sale</a>
                </div>

                <div class="products text-center"> <!-- To start it will be only 3 products in this section -->

                    @foreach($products as $product)
                        <div class="product">
                            <a href="" class=""><img src="/img/macbook-pro.png" alt="product"></a>
                            <a href="" class=""><div class="product-name">{{ $product->name }}</div></a>
                            <div class="product-price">{{ $product->presentPrice() }}</div>
                        </div>
                    @endforeach


                </div> <!-- end products -->

                <div class="text-center button-container">
                    <a href="#" class="button">View more products</a>
                
                </div>

            
            </div> <!-- end container -->

        </div> <!-- end featured section -->

        <div class="blog-section">    
            <div class="container">
            
                <h1 class="text-center">Fromo Our Blog</h1>
                <p class="section-description"> Description from our blog. </p>

                <div class="blog-posts">
                    <div class="blog-post">
                        <a href="#"><img src="img/blog1.png" alt="blog image"></a>
                        <a href="#"><h2 class="blog-title">Blog Post Title 1</h2></a>
                        <div class="blog-description">description blog post 1</div>
                    </div>

                    <div class="blog-post">
                        <a href="#"><img src="img/blog2.png" alt="blog image"></a>
                        <a href="#"><h2 class="blog-title">Blog Post Title 2</h2></a>
                        <div class="blog-description">description blog post 2</div>
                    </div>

                    <div class="blog-post">
                        <a href="#"><img src="img/blog3.png" alt="blog image"></a>
                        <a href="#"><h2 class="blog-title">Blog Post Title 3</h2></a>
                        <div class="blog-description">description blog post 3</div>
                    </div>
                </div> <!-- end blog-posts-->
            </div> <!-- end container -->
        </div> <!-- end blog section -->

        <footer>
            <div class="footer-content container">
                <div class="made-with">Made by Stalyn Alejandro</div>
                <ul>
                    <il>Follow me:</il>
                    <il><a href=""><i class="fa fa-globe"></i></a></il>
                    <il><a href=""><i class="fa fa-youtube"></i></a></il>
                    <il><a href=""><i class="fa fa-github"></i></a></il>
                    <il><a href=""><i class="fa fa-twitter"></i></a></il>
                </ul>
            </div>
        
        </footer>

    </body>
</html>


