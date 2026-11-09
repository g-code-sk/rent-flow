<?php

namespace App\Http\Controllers;

use Symfony\Component\HttpFoundation\BinaryFileResponse;

class SpaController extends Controller
{
    public function __invoke(): BinaryFileResponse
    {
        $index = public_path('index.html');

        abort_unless(is_file($index), 404);

        return response()->file($index);
    }
}
