<?php

namespace App\Http\Middleware;

use App\Support\ApiResponse;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RejectHoneypotMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        $website = $request->input('website');

        if (is_string($website) && $website !== '') {
            return ApiResponse::ok(null, 201);
        }

        return $next($request);
    }
}
