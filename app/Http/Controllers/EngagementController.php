<?php

namespace App\Http\Controllers;

use App\Http\Requests\FeedbackRequest;
use App\Http\Requests\OptOutRequest;
use App\Http\Requests\WaitlistRequest;
use App\Models\Feedback;
use App\Models\WaitlistEmail;
use App\Support\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class EngagementController extends Controller
{
    public function waitlist(WaitlistRequest $request): JsonResponse
    {
        $email = strtolower($request->string('email')->toString());

        WaitlistEmail::query()->firstOrCreate(
            ['email' => $email],
            ['consented_at' => now()],
        );

        return ApiResponse::ok(null, 201);
    }

    public function feedback(FeedbackRequest $request): JsonResponse
    {
        $email = $request->input('email');

        Feedback::query()->create([
            'body' => $request->string('body')->toString(),
            'email' => is_string($email) && $email !== '' ? strtolower($email) : null,
        ]);

        return ApiResponse::ok(null, 201);
    }

    public function optOut(OptOutRequest $request): JsonResponse
    {
        $email = strtolower($request->string('email')->toString());

        DB::transaction(function () use ($email): void {
            WaitlistEmail::query()->where('email', $email)->delete();
            Feedback::query()->where('email', $email)->update(['email' => null]);
        });

        return ApiResponse::ok();
    }
}
