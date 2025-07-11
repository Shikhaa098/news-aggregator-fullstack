<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
   public function up()
{
    Schema::table('articles', function (Blueprint $table) {
        $table->string('source')->nullable();
        $table->string('category')->nullable();
        $table->timestamp('published_at')->nullable();
    });
}

    /**
     * Reverse the migrations.
     */
   public function down()
{
    Schema::table('articles', function (Blueprint $table) {
        $table->dropColumn(['source', 'category', 'published_at']);
    });
}
};
