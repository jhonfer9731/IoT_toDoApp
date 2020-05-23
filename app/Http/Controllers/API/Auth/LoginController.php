<?php

namespace App\Http\Controllers\API\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

// controlador de autenticacion de la API

class LoginController extends Controller
{

    public function __construct()
    {
        $this->middleware('jwt', ['except' => ['login']]); // permite solo acceder a usuarios registrados a los metodos del controlador
    }
    
    public function login()
    {
        $creds =request(['email','password']); // se obtiene los datos ingresados al iniciar sesion, desde la peticion de getTK.js

        if(!$token = auth('api')->attempt($creds)){ // se intentea autenticar por medio del guard jwt
            return response()->json(['error'=>'Incorrect Email/Password'], 401); // si falla al auth, retorna excepcion
        }
        $respose = response()->json(["token" => $token]); // le entrega al usuario el token API si pasa la autenticacion
        //$respose = new Response("hello");
        $respose->withCookie(cookie('token', $token,30)); // genera una cookie encriptada que permite que el token API se utilize durante la sesion
        return $respose;
    }

    public function logout()
    {
        auth('api')->logout(); // cierra la sesion API e invalida el token entregado al usuario en login, tiene que loguearse de nuevo
        return response()->json(['message' => 'Successfully logged out']);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken(auth('api')->refresh()); // permite generar un nuevo token al usuario, para cambiar el actual
    }
    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        return response()->json(auth('api')->user()); // permite obtener toda la fila del usuario registrado correspondiente a ese token
    }


    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth('api')->factory()->getTTL() * 60
        ]);
    }
}
