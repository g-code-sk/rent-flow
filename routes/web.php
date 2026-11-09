<?php

use App\Http\Controllers\SpaController;
use App\Support\ApiResponse;
use Illuminate\Support\Facades\Route;

Route::fallback(function () {
    if (request()->is('api/*')) {
        return ApiResponse::error(404, 'not_found', 'Nenájdené.');
    }

    if (! in_array(request()->method(), ['GET', 'HEAD'], true)) {
        abort(404);
    }

    return app(SpaController::class)();
});
