<?php

namespace App\Http\Middleware;

use App\Support\ApiResponse;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Symfony\Component\HttpFoundation\Response;

class LimitEngagementRequestsMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        $key = 'engagement:'.$request->ip();

        if (RateLimiter::tooManyAttempts($key, 3)) {
            return ApiResponse::error(429, 'rate_limited', 'Príliš veľa pokusov. Skúste neskôr.');
        }

        RateLimiter::hit($key, 15 * 60);

        return $next($request);
    }
}
