<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('waitlist_emails', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('email')->unique();
            $table->timestamp('consented_at');
            $table->timestamp('created_at')->useCurrent();
        });

        Schema::create('feedback', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->text('body');
            $table->string('email')->nullable();
            $table->timestamp('created_at')->useCurrent();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('feedback');
        Schema::dropIfExists('waitlist_emails');
    }
};
