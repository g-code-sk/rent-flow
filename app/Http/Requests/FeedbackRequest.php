<?php

namespace App\Http\Requests;

class FeedbackRequest extends EngagementRequest
{
    protected function prepareForValidation(): void
    {
        $body = $this->input('body');
        $email = $this->input('email');

        $this->merge([
            'body' => is_string($body) ? trim($body) : $body,
            'email' => is_string($email) && trim($email) !== '' ? trim($email) : null,
        ]);
    }

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'body' => ['required', 'string', 'min:1', 'max:5000'],
            'email' => ['nullable', 'string', 'email'],
            'website' => ['nullable', 'string', 'max:200'],
        ];
    }

    /**
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'body.required' => 'Napíšte, čo by ste použili',
            'body.min' => 'Napíšte, čo by ste použili',
            'body.max' => 'Najviac 5000 znakov',
            'email.email' => 'Neplatný e-mail',
        ];
    }
}
