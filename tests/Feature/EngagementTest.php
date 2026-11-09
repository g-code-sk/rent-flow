<?php

namespace Tests\Feature;

use App\Models\Feedback;
use App\Models\WaitlistEmail;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Cache;
use Tests\TestCase;

class EngagementTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        Cache::flush();
    }

    public function test_health(): void
    {
        $this->getJson('/api/health')
            ->assertOk()
            ->assertExactJson([
                'ok' => true,
                'data' => ['status' => 'ok'],
            ]);
    }

    public function test_waitlist_stores_a_lowercased_email_once(): void
    {
        $this->postJson('/api/waitlist', [
            'email' => ' You@Example.com ',
            'consent' => true,
        ])->assertCreated()
            ->assertExactJson(['ok' => true, 'data' => null]);

        $this->postJson('/api/waitlist', [
            'email' => 'you@example.com',
            'consent' => true,
        ])->assertCreated();

        $this->assertSame(1, WaitlistEmail::query()->count());
        $this->assertSame('you@example.com', WaitlistEmail::query()->value('email'));
        $this->assertNotNull(WaitlistEmail::query()->value('consented_at'));
    }

    public function test_honeypot_skips_the_write_and_validation(): void
    {
        $this->postJson('/api/waitlist', [
            'email' => 'not-an-email',
            'website' => 'spam',
        ])->assertCreated()
            ->assertExactJson(['ok' => true, 'data' => null]);

        $this->assertSame(0, WaitlistEmail::query()->count());
    }

    public function test_invalid_waitlist_returns_field_errors(): void
    {
        $this->postJson('/api/waitlist', [
            'email' => 'nope',
            'consent' => false,
        ])->assertStatus(400)
            ->assertJsonPath('ok', false)
            ->assertJsonPath('error.code', 'invalid_request')
            ->assertJsonPath('error.details.fieldErrors.email.0', 'Neplatný e-mail');
    }

    public function test_feedback_allows_a_missing_email(): void
    {
        $this->postJson('/api/feedback', [
            'body' => 'Chcem PDF',
            'email' => '',
        ])->assertCreated();

        $feedback = Feedback::query()->first();
        $this->assertSame('Chcem PDF', $feedback->body);
        $this->assertNull($feedback->email);
    }

    public function test_opt_out_removes_the_waitlist_row_and_clears_feedback_email(): void
    {
        WaitlistEmail::query()->create([
            'email' => 'you@example.com',
            'consented_at' => now(),
        ]);
        Feedback::query()->create([
            'body' => 'Nápad',
            'email' => 'you@example.com',
        ]);

        $this->postJson('/api/opt-out', [
            'email' => 'You@Example.com',
        ])->assertOk()
            ->assertExactJson(['ok' => true, 'data' => null]);

        $this->assertSame(0, WaitlistEmail::query()->count());
        $this->assertNull(Feedback::query()->value('email'));
        $this->assertSame('Nápad', Feedback::query()->value('body'));
    }

    public function test_rate_limit_blocks_the_fourth_request(): void
    {
        for ($attempt = 0; $attempt < 3; $attempt++) {
            $this->postJson('/api/opt-out', [
                'email' => 'you@example.com',
            ])->assertOk();
        }

        $this->postJson('/api/opt-out', [
            'email' => 'you@example.com',
        ])->assertStatus(429)
            ->assertJsonPath('error.code', 'rate_limited')
            ->assertJsonPath('error.message', 'Príliš veľa pokusov. Skúste neskôr.');
    }
}
