<?php

namespace App\Http\Middleware;

use Closure;
use JWTAuth;

class JWT
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if(!$cookie = $request->cookie('token')) // Revisa si hay la cookie con el token encryptado al logearse
        {
            JWTAuth::parseToken()->authenticate(); // si no la hay, revisa el token pasado por defecto segun JWT, ya sea en el header o como un request
            return $next($request);
        }
        JWTAuth::setToken($cookie)->authenticate();// autentica con el token pasado por la cookie y autentica  al usuario
        return $next($request);
        //JWTAuth::parseToken()->authenticate();
        
    }
}
