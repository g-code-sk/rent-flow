<?php

use App\Http\Controllers\EngagementController;
use App\Http\Controllers\HealthController;
use App\Http\Middleware\LimitEngagementRequestsMiddleware;
use App\Http\Middleware\RejectHoneypotMiddleware;
use Illuminate\Support\Facades\Route;

Route::get('/health', HealthController::class);

Route::middleware([
    LimitEngagementRequestsMiddleware::class,
    RejectHoneypotMiddleware::class,
])->group(function () {
    Route::post('/waitlist', [EngagementController::class, 'waitlist']);
    Route::post('/feedback', [EngagementController::class, 'feedback']);
    Route::post('/opt-out', [EngagementController::class, 'optOut']);
});
