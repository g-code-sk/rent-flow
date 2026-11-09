<?php

namespace App\Http\Requests;

class WaitlistRequest extends EngagementRequest
{
    protected function prepareForValidation(): void
    {
        $email = $this->input('email');

        $this->merge([
            'email' => is_string($email) ? trim($email) : $email,
        ]);
    }

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'email' => ['required', 'string', 'email'],
            'consent' => ['required', function (string $attribute, mixed $value, \Closure $fail): void {
                if ($value !== true) {
                    $fail('Potvrďte súhlas so zasielaním e-mailov');
                }
            }],
            'website' => ['nullable', 'string', 'max:200'],
        ];
    }

    /**
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'email.required' => 'Neplatný e-mail',
            'email.email' => 'Neplatný e-mail',
        ];
    }
}
