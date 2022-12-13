<?php

namespace App\Http\Controllers;
use App\User;
use App\Product;
use App\Order;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    //
    public function showList(){
        $users = DB::table('users')->get();
        return view('users.list', ['users'=>$users]);
    }

    public function showProfile($id){
        //$user = DB::table('users')->where('id', $id)->first(); //Solo devuelve una fila
        $user_instance = User::find($id); //Devuelve una instancia de User. Find el id
        $orders = Order::where('user', $user_instance->name)->get();
        return view('users.profile', ['user'=>$user_instance], ['orders'=>$orders]);
    }

    public function showForm(){
        //Mostrar el formulario
        return view('users.formulario');
    }

    public function postForm(Request $request){ //Inyección de dependencias
        //Guardar datos del formulario

        $nombre = $request->input('nombre');

        return view('users.profile', ['name' => $nombre]);
    }
}
